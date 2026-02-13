import { auth } from "@/lib/auth/auth-config";
import { initTRPC, TRPCError } from "@trpc/server";
import { cache } from "react";
import { prisma } from "@/lib/db/prisma";
import superjson from "superjson";

export const createTRPCContext = cache(async (opts: { headers: Headers }) => {
  const session = await auth.api.getSession({
    headers: opts.headers,
  });

  return {
    prisma,
    session,
  };
});

type Context = Awaited<ReturnType<typeof createTRPCContext>>;

const t = initTRPC.context<Context>().create({
  transformer: superjson,
});

const isAuthenticated = t.middleware(({ ctx, next }) => {
  if (!ctx.session?.user) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return next({
    ctx: {
      ...ctx,
      session: { ...ctx.session, user: ctx.session.user },
    },
  });
});

const isModerator = t.middleware(async ({ ctx, next }) => {
  if (!ctx.session?.user?.id) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  const data = await auth.api.userHasPermission({
    body: {
      userId: ctx.session.user.id,
      role: "admin",
      permissions: {
        user: ["create", "update", "delete", "get"],
      },
    },
  });

  if (!data) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
    });
  }

  return next({
    ctx: {
      ...ctx,
      session: ctx.session,
    },
  });
});

export const createRouter = t.router;
export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(isAuthenticated);
export const moderatorProcedure = t.procedure.use(isModerator);
export const createCallerFactory = t.createCallerFactory;

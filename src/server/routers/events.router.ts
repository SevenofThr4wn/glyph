import {
  createEventSchema,
  eventIdSchema,
  updateEventSchema,
} from "@/lib/schemas";
import { createRouter, protectedProcedure, publicProcedure } from "../trpc";

export const eventsRouter = createRouter({
  createEvent: protectedProcedure
    .input(createEventSchema)
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.event.create({
        data: {
          ...input,
          userId: ctx.session.user.id,
        },
      });
    }),
  update: protectedProcedure
    .input(updateEventSchema)
    .mutation(async ({ ctx, input }) => {
      const { id, ...data } = input;

      return ctx.prisma.event.update({
        where: { id: input.id, userId: ctx.session.user.id },
        data,
      });
    }),
  delete: protectedProcedure
    .input(eventIdSchema)
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.event.delete({
        where: { id: input.id, userId: ctx.session.user.id },
      });
    }),
  getById: protectedProcedure.input(eventIdSchema).query(({ ctx, input }) => {
    return ctx.prisma.event.findUnique({
      where: { id: input.id },
      include: { user: true },
    });
  }),
  list: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.event.findMany({
      where: { published: true },
      orderBy: { startAt: "asc" },
    });
  }),
  myEvents: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.event.findMany({
      where: { userId: ctx.session.user.id },
      orderBy: { createdAt: "desc" },
    });
  }),
});

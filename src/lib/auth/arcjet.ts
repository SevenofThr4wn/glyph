"use server";

import arcjet, {
  ArcjetDecision,
  BotOptions,
  detectBot,
  EmailOptions,
  fixedWindow,
  protectSignup,
  ProtectSignupOptions,
  sensitiveInfo,
  shield,
  slidingWindow,
  SlidingWindowRateLimitOptions,
} from "@arcjet/next";
import { serverEnv } from "../env";
import { NextRequest } from "next/server";
import { auth } from "./auth-config";
import { findIp } from "@arcjet/ip";
import { toNextJsHandler } from "better-auth/next-js";

export {
  detectBot,
  fixedWindow,
  protectSignup,
  sensitiveInfo,
  shield,
  slidingWindow,
};
const aj = arcjet({
  key: serverEnv.ARCJET_KEY,
  characteristics: ["userId"],
  rules: [
    shield({
      mode: "LIVE",
    }),
  ],
});

const emailOptions = {
  mode: "LIVE",

  deny: ["DISPOSABLE", "INVALID", "NO_MX_RECORDS"],
} satisfies EmailOptions;

const botOptions = {
  mode: "LIVE",

  allow: [],
} satisfies BotOptions;

const restrictiveRateLimitSettings = {
  mode: "LIVE",
  max: 5,
  interval: "10m",
} satisfies SlidingWindowRateLimitOptions<[]>;

const laxRateLimitSettings = {
  mode: "LIVE",
  max: 60,
  interval: "1m",
} satisfies SlidingWindowRateLimitOptions<[]>;

const signupOptions = {
  email: emailOptions,

  bots: botOptions,

  rateLimit: restrictiveRateLimitSettings,
} satisfies ProtectSignupOptions<[]>;

async function protect(req: NextRequest): Promise<ArcjetDecision> {
  const session = await auth.api.getSession({
    headers: req.headers,
  });

  let userId: string;
  if (session?.user.id) {
    userId = session.user.id;
  } else {
    userId = findIp(req) || "127.0.0.1";
  }

  if (
    req.nextUrl.pathname.startsWith("/api/auth/sign-up") ||
    req.nextUrl.pathname.startsWith("/api/auth/request-password-reset")
  ) {
    const body = await req.clone().json();

    if (typeof body.email === "string") {
      return aj
        .withRule(protectSignup(signupOptions))
        .protect(req, { email: body.email, userId });
    } else {
      return aj
        .withRule(detectBot(botOptions))
        .withRule(slidingWindow(restrictiveRateLimitSettings))
        .protect(req, { userId });
    }
  } else {
    return aj
      .withRule(detectBot(botOptions))
      .withRule(slidingWindow(laxRateLimitSettings))
      .protect(req, { userId });
  }
}

const authHandlers = toNextJsHandler(auth.handler);

export const { GET } = authHandlers;

export const POST = async (req: NextRequest) => {
  const decision = await protect(req);

  if (decision.isDenied()) {
    if (decision.reason.isRateLimit()) {
      return Response.json(
        { message: "Too many request. Please try again later" },
        { status: 429 },
      );
    } else if (decision.reason.isEmail()) {
      let message: string;

      if (decision.reason.emailTypes.includes("INVALID")) {
        message = "Email address format is invalid. Check if there's a typo";
      } else if (decision.reason.emailTypes.includes("DISPOSABLE")) {
        message = "We do not allow disposable email addresses.";
      } else if (decision.reason.emailTypes.includes("NO_MX_RECORDS")) {
        message =
          "Your email domain does not have an MX record. Check if there's a typo";
      } else {
        message = "Invalid email. Please try another one";
      }

      return Response.json({ message }, { status: 400 });
    } else {
      return Response.json(null, { status: 403 });
    }
  }

  return authHandlers.POST(req);
};

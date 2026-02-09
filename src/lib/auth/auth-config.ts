import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import { prisma } from "../db/prisma";
import {
  admin,
  anonymous,
  apiKey,
  emailOTP,
  lastLoginMethod,
} from "better-auth/plugins";
import { OTPEmail, PasswordReset } from "@/components/emails";
import { resend } from "../email/resend";
import { clientEnv, serverEnv } from "../env";

export const auth = betterAuth({
  appName: clientEnv.NEXT_PUBLIC_APP_URL,
  secret: serverEnv.BETTER_AUTH_SECRET,
  baseURL: serverEnv.BETTER_AUTH_URL,
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 12,
    requireEmailVerification: true,
    autoSignIn: false,
    resetPasswordTokenExpiresIn: 900,
  },
  emailVerification: {
    sendOnSignUp: true,
    sendOnSignIn: true,
    autoSignInAfterVerification: true,
  },
  user: {
    deleteUser: {
      enabled: true,
    },
  },
  rateLimit: {
    enabled: true,
    window: 10,
    max: 100,
  },
  socialProviders: {
    discord: {
      clientId: serverEnv.DISCORD_CLIENT_ID,
      clientSecret: serverEnv.DISCORD_CLIENT_SECRET,
      redirectURI: `${clientEnv.NEXT_PUBLIC_APP_URL}/api/auth/callback/discord`,
    },
    github: {
      clientId: serverEnv.GITHUB_CLIENT_ID,
      clientSecret: serverEnv.GITHUB_CLIENT_SECRET,
      redirectURI: `${clientEnv.NEXT_PUBLIC_APP_URL}/api/auth/callback/github`,
    },
    google: {
      clientId: serverEnv.GOOGLE_CLIENT_ID,
      clientSecret: serverEnv.GOOGLE_CLIENT_SECRET,
      redirectURI: `${clientEnv.NEXT_PUBLIC_APP_URL}/api/auth/callback/google`,
    },
    figma: {
      clientId: serverEnv.FIGMA_CLIENT_ID,
      clientSecret: serverEnv.FIGMA_CLIENT_SECRET,
      redirectURI: `${clientEnv.NEXT_PUBLIC_APP_URL}/api/auth/callback/figma`,
    },
    huggingface: {
      clientId: serverEnv.HUGGINGFACE_CLIENT_ID,
      clientSecret: serverEnv.HUGGINGFACE_CLIENT_SECRET,
      redirectURI: `${clientEnv.NEXT_PUBLIC_APP_URL}/api/auth/callback/huggingface`,
    },
  },
  session: {
    expiresIn: 60 * 60 * 24 * 30,
  },
  plugins: [
    nextCookies(),
    anonymous({
      generateRandomEmail: () => {
        const id = crypto.randomUUID();
        return `glyph-${id}@example.com`;
      },
    }),
    lastLoginMethod({
      storeInDatabase: true,
    }),
    emailOTP({
      async sendVerificationOTP({ email, otp, type }) {
        const encodedEmail = encodeURIComponent(email);
        let encodedOTPType = encodeURIComponent("");

        if (type === "sign-in") {
          console.log("Yet to be implemented (Sign in)");
        } else if (type === "email-verification") {
          encodedOTPType = encodeURIComponent("email-verification");
          await resend.emails.send({
            from: serverEnv.RESEND_EMAIL,
            to: email,
            subject: "Email Verification OTP Code",
            react: OTPEmail({
              username: email.split("@")[0],
              otp: otp,
              verifyUrl: `${clientEnv.NEXT_PUBLIC_APP_URL}/verify?email=${encodedEmail}&otp-type=${encodedOTPType}`,
            }),
          });
        } else {
          encodedOTPType = encodeURIComponent("reset-password");
          await resend.emails.send({
            from: serverEnv.RESEND_EMAIL,
            to: email,
            subject: "Password Reset OTP Code",
            react: PasswordReset({
              resetUrl: `${clientEnv.NEXT_PUBLIC_APP_URL}/reset-password?email=${encodedEmail}&otp-type=${encodedOTPType}`,
            }),
          });
        }
      },
    }),
    apiKey(),
    admin(),
  ],
  account: {
    encryptOAuthTokens: true,
    storeAccountCookie: true,
    accountLinking: {
      enabled: true,
      trustedProviders: ["google", "github", "discord", "figma", "huggingface"],
      allowDifferentEmails: false,
    },
  },
});

export type ErrorCode = keyof typeof auth.$ERROR_CODES | "UNKNOWN";

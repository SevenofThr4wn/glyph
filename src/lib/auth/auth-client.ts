import { createAuthClient } from "better-auth/react";
import {
  anonymousClient,
  lastLoginMethodClient,
  emailOTPClient,
  apiKeyClient,
  adminClient,
} from "better-auth/client/plugins";
import { clientEnv } from "../env";

const baseURL = clientEnv.NEXT_PUBLIC_BETTER_AUTH_URL;

if (!baseURL && typeof window !== "undefined") {
  console.warn(
    "NEXT_PUBLIC_BETTER_AUTH_URL is not defined. Please add to environment variables.",
  );
}

export const authClient = createAuthClient({
  baseURL: baseURL || "/api/auth",
  plugins: [
    lastLoginMethodClient(),
    anonymousClient(),
    emailOTPClient(),
    apiKeyClient(),
    adminClient(),
  ],
});

export const { useSession, getSession } = authClient;

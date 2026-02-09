import z from "zod";
import { createEnv } from "@t3-oss/env-nextjs";

const url = z.string().url();
const nonEmpty = z.string().min(1);
const email = z.string().email();
const secret = z.string().min(16);
const boolString = z.enum(["true", "false"]);
const threshold = z.coerce.number().min(0).max(1);

const authVariables = {
  BETTER_AUTH_SECRET: secret,
  BETTER_AUTH_URL: url,
  ARCJET_KEY: nonEmpty,
};

const oauthProviderVariables = {
  DISCORD_CLIENT_ID: nonEmpty,
  DISCORD_CLIENT_SECRET: secret,

  GITHUB_CLIENT_ID: nonEmpty,
  GITHUB_CLIENT_SECRET: secret,

  GOOGLE_CLIENT_ID: nonEmpty,
  GOOGLE_CLIENT_SECRET: secret,
  GOOGLE_API_KEY: nonEmpty,

  FIGMA_CLIENT_ID: nonEmpty,
  FIGMA_CLIENT_SECRET: secret,

  HUGGINGFACE_CLIENT_ID: nonEmpty,
  HUGGINGFACE_CLIENT_SECRET: secret,
};

const emailVariabes = {
  RESEND_API_KEY: nonEmpty,
  RESEND_EMAIL: email,
};

const s3Variables = {
  TIGRIS_PUBLIC_URL: url.optional(),
  TIGRIS_S3_BUCKET_NAME: nonEmpty,
  TIGRIS_S3_ACCESS_KEY: nonEmpty,
  TIGRIS_S3_SECRET_KEY: secret,
  TIGRIS_S3_ENDPOINT: nonEmpty,
  TIGRIS_REGION: nonEmpty,
};

const upstashVariables = {
  UPSTASH_REDIS_REST_URL: nonEmpty,
  UPSTASH_REDIS_REST_TOKEN: nonEmpty,
};

const moderationVariables = {
  MODERATION_AUTO_APPROVE_THRESHOLD: threshold.default(0.3),
  MODERATION_AUTO_REJECT_THRESHOLD: threshold.default(0.8),
  MODERATION_AUTO_QUARANTINE_THRESHOLD: threshold.default(0.9),
};

export const serverEnv = createEnv({
  server: {
    DATABASE_URL: url,
    MAINTENANCE_MODE: boolString,
    ...authVariables,
    ...oauthProviderVariables,
    ...emailVariabes,
    ...s3Variables,
    ...upstashVariables,
    ...moderationVariables,
  },
  client: {},
  runtimeEnv: process.env as unknown as Record<string, string | undefined>,
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
});

import z from "zod";
import { createEnv } from "@t3-oss/env-nextjs";

const url = z.string().url();
const nonEmpty = z.string().min(1);

export const clientEnv = createEnv({
  client: {
    NEXT_PUBLIC_APP_URL: url,
    NEXT_PUBLIC_WS_URL: url,
    NEXT_PUBLIC_APP_NAME: nonEmpty,
    NEXT_PUBLIC_BUSINESS_ADDRESS: nonEmpty,
    NEXT_PUBLIC_BETTER_AUTH_URL: url,
    NEXT_PUBLIC_S3_BUCKET_NAME: nonEmpty,
    NEXT_PUBLIC_MAPBOX_TOKEN: nonEmpty,
  },
  server: {},

  runtimeEnv: {
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    NEXT_PUBLIC_WS_URL: process.env.NEXT_PUBLIC_WS_URL,
    NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME,
    NEXT_PUBLIC_BUSINESS_ADDRESS: process.env.NEXT_PUBLIC_BUSINESS_ADDRESS,
    NEXT_PUBLIC_BETTER_AUTH_URL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL,
    NEXT_PUBLIC_S3_BUCKET_NAME: process.env.NEXT_PUBLIC_S3_BUCKET_NAME,
    NEXT_PUBLIC_MAPBOX_TOKEN: process.env.NEXT_PUBLIC_MAPBOX_TOKEN,
  },
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
});

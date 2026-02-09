import { S3Client } from "@aws-sdk/client-s3";
import { serverEnv } from "../env";

export const tigrisClient = new S3Client({
  endpoint: serverEnv.TIGRIS_S3_ENDPOINT,
  region: serverEnv.TIGRIS_REGION,
  credentials: {
    accessKeyId: serverEnv.TIGRIS_S3_ACCESS_KEY,
    secretAccessKey: serverEnv.TIGRIS_S3_SECRET_KEY,
  },
  forcePathStyle: true,
});

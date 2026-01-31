import { uuidv4 } from "zod";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { serverEnv } from "@/lib/config";
import { tigrisClient } from "@/lib/storage";

export function generateObjKey(
  uploadType: string,
  userId: string,
  filename: string,
): string {
  const timestamp = Date.now();
  const fileExtension = filename.split(".").pop()?.toLowerCase() || ".jpg";
  return `${uploadType}/${userId}/${timestamp}-${uuidv4()}.${fileExtension}`;
}

export async function generateSignedUrl(
  key: string,
  expiresIn: number,
): Promise<string> {
  const getCommand = new GetObjectCommand({
    Bucket: serverEnv.TIGRIS_S3_BUCKET_NAME,
    Key: key,
  });
  return await getSignedUrl(tigrisClient, getCommand, { expiresIn });
}

export function getExpForType(uploadType: string): number {
  const expiresIn = {
    avatar: 604800,
    banner: 604800,
    prompt_thumbnail: 2592000,
    prompt_example: 2592000,
  };
  return expiresIn[uploadType as keyof typeof expiresIn] || 3600;
}

export async function regenerateUrl(metadata: unknown): Promise<string | null> {
  try {
    if (!metadata) return null;

    const meta = typeof metadata === "string" ? JSON.parse(metadata) : metadata;
    if (!meta?.key) return null;

    return await generateSignedUrl(meta.key, 3600);
  } catch (error) {
    console.error("Failed to regenerate URL from metadata:", error);
    return null;
  }
}

export async function testUrlAccessibility(url: string): Promise<boolean> {
  try {
    const response = await fetch(url, { method: "HEAD", cache: "no-cache" });
    return response.ok;
  } catch {
    return false;
  }
}

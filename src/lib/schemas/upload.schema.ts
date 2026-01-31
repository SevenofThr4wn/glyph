import z from "zod";
import { MAX_FILE_SIZE } from "../types";

export const uploadRequestSchema = z.object({
  fileName: z.string().min(1).max(200),
  fileType: z.string(),
  fileSize: z.number().max(MAX_FILE_SIZE),
  uploadType: z.enum([
    "image",
    "document",
    "model",
    "archive",
    "profile-banner",
    "profile-avatar",
    "other",
  ]),
  metadata: z.record(z.string(), z.string()).optional(),
});

export const completeUploadSchema = z.object({
  key: z.string(),
  uploadType: z.enum([
    "image",
    "document",
    "model",
    "archive",
    "profile-banner",
    "profile-avatar",
    "other",
  ]),
  fileName: z.string(),
});

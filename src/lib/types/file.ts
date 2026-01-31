import z from "zod";

export type FileType = "image" | "document" | "model" | "archive" | "other";

export interface UploadedFile {
  file: File;
  preview: string;
  type:
    | "image"
    | "document"
    | "model"
    | "archive"
    | "profile-banner"
    | "profile-avatar"
    | "other";
  name: string;
  size: string;
  uploadProgress?: number;
  uploadError?: string;
  uploadedUrl?: string;
  s3Key?: string;
  status?: "idle" | "uploading" | "success" | "error" | "cancelled";
}

export interface FileUploadDropzoneProps {
  onFilesChange: (files: UploadedFile[]) => void;
  onUploadProgress?: (fileName: string, progress: number) => void;
  onUploadComplete?: (
    fileName: string,
    result: { url: string; key: string },
  ) => void;
  onUploadError?: (fileName: string, error: Error) => void;
  autoUpload?: boolean;
  fileType?: UploadedFile["type"];
  maxSize?: number;
  multiple?: boolean;
  accept?: Record<string, string[]>;
  disabled?: boolean;
  showProgress?: boolean;
  maxFiles?: number;
}

export const MAX_FILE_SIZE = 10 * 1024 * 1024;
export const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/gif",
  "image/webp",
  "image/svg+xml",
] as const;

export const UploadTypeEnum = z.enum([
  "image",
  "document",
  "model",
  "archive",
  "profile-banner",
  "profile-avatar",
  "other",
]);

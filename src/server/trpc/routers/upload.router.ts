import { z } from "zod";
import { TRPCError } from "@trpc/server";
import {
  PutObjectCommand,
  DeleteObjectCommand,
  HeadObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

import { tigrisClient } from "@/lib/storage/tigris";
import { completeUploadSchema, uploadRequestSchema } from "@/lib/schemas";

import {
  ALLOWED_IMAGE_TYPES,
  MAX_FILE_SIZE,
  UploadTypeEnum,
} from "@/lib/types";

import {
  generateObjKey,
  generateSignedUrl,
  getExpForType,
} from "../../server-utils";
import { serverEnv } from "@/lib/env";
import { createRouter, protectedProcedure } from "../trpc";

const safeMetadata = (metadata: Record<string, string>) => {
  const sanitized: Record<string, string> = {};
  for (const [key, value] of Object.entries(metadata)) {
    if (/^[a-zA-Z0-9-_]+$/.test(key)) {
      sanitized[key] = String(value);
    }
  }
  return sanitized;
};

export const uploadRouter = createRouter({
  generateUploadUrl: protectedProcedure
    .input(uploadRequestSchema)
    .mutation(async ({ ctx, input }) => {
      const { fileName, fileType, fileSize, uploadType, metadata } = input;
      const userId = ctx.session.user.id;

      const normalizedType = fileType.toLowerCase();
      if (
        !ALLOWED_IMAGE_TYPES.includes(
          normalizedType as (typeof ALLOWED_IMAGE_TYPES)[number],
        )
      ) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: `Invalid file type. Allowed: ${ALLOWED_IMAGE_TYPES.join(", ")}`,
        });
      }

      if (fileSize > MAX_FILE_SIZE) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: `File too large. Max: ${MAX_FILE_SIZE / 1024 / 1024}MB`,
        });
      }

      if (!UploadTypeEnum.options.includes(uploadType)) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: `Invalid upload type: ${uploadType}`,
        });
      }

      if (!/^[a-zA-Z0-9._-]+$/.test(fileName)) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Invalid file name",
        });
      }

      const key = generateObjKey(uploadType, userId, fileName);

      const putCommand = new PutObjectCommand({
        Bucket: serverEnv.TIGRIS_S3_BUCKET_NAME,
        Key: key,
        ContentType: fileType,
        Metadata: {
          userId,
          uploadType,
          originalFileName: fileName,
          uploadedAt: Date.now().toString(),
          ...safeMetadata(metadata ?? {}),
        },
      });

      const uploadUrl = await getSignedUrl(tigrisClient, putCommand, {
        expiresIn: 300,
      });

      const downloadUrl = await generateSignedUrl(key, 3600);

      return {
        success: true,
        data: {
          uploadUrl,
          downloadUrl,
          key,
          method: "PUT" as const,
          headers: { "Content-Type": fileType },
          expiresAt: new Date(Date.now() + 300_000).toISOString(),
        },
      };
    }),
  completeUpload: protectedProcedure
    .input(completeUploadSchema)
    .mutation(async ({ ctx, input }) => {
      const { key, uploadType } = input;
      const userId = ctx.session.user.id;

      try {
        await tigrisClient.send(
          new HeadObjectCommand({
            Bucket: serverEnv.TIGRIS_S3_BUCKET_NAME,
            Key: key,
          }),
        );
      } catch {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "File not found in storage",
        });
      }

      const expiresIn = getExpForType(uploadType);
      const downloadUrl = await generateSignedUrl(key, expiresIn);

      const expiresAt = new Date(Date.now() + expiresIn * 1000).toISOString();
      switch (uploadType) {
        case "profile-avatar":
          await ctx.prisma.user.update({
            where: { id: userId },
            data: {
              image: downloadUrl,
            },
          });
          break;

        case "profile-banner":
          await ctx.prisma.userProfile.upsert({
            where: { userId },
            update: {
              bannerImage: downloadUrl,
            },
            create: {
              userId,
              bannerImage: downloadUrl,
            },
          });
          break;
      }

      return {
        success: true,
        data: {
          url: downloadUrl,
          key,
          type: uploadType,
          expiresAt,
        },
      };
    }),

  getDownloadUrl: protectedProcedure
    .input(z.object({ key: z.string(), expiresIn: z.number().optional() }))
    .query(async ({ ctx, input }) => {
      const { key, expiresIn = 3600 } = input;
      const userId = ctx.session.user.id;

      if (!key.includes(`/${userId}/`)) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You can only access your own files",
        });
      }

      const url = await generateSignedUrl(key, expiresIn);

      return {
        success: true,
        data: {
          url,
          expiresAt: new Date(Date.now() + expiresIn * 1000).toISOString(),
          expiresIn,
        },
      };
    }),

  getFileInfo: protectedProcedure
    .input(z.object({ key: z.string() }))
    .query(async ({ ctx, input }) => {
      const { key } = input;
      const userId = ctx.session.user.id;

      if (!key.includes(`/${userId}/`)) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You can only access your own files",
        });
      }

      try {
        const head = await tigrisClient.send(
          new HeadObjectCommand({
            Bucket: serverEnv.TIGRIS_S3_BUCKET_NAME,
            Key: key,
          }),
        );

        return {
          success: true,
          data: {
            exists: true,
            key,
            contentType: head.ContentType,
            contentLength: head.ContentLength,
            lastModified: head.LastModified,
            metadata: head.Metadata,
          },
        };
      } catch (err: TRPCError | unknown) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: err instanceof TRPCError ? err.message : "File not found",
        });
      }
    }),

  deleteUpload: protectedProcedure
    .input(z.object({ key: z.string(), confirm: z.boolean().optional() }))
    .mutation(async ({ ctx, input }) => {
      const { key, confirm = false } = input;
      const userId = ctx.session.user.id;

      if (!confirm) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Please confirm deletion",
        });
      }

      if (!key.includes(`/${userId}/`)) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You can only delete your own files",
        });
      }

      await tigrisClient.send(
        new DeleteObjectCommand({
          Bucket: serverEnv.TIGRIS_S3_BUCKET_NAME,
          Key: key,
        }),
      );

      const uploadType = key.split("/")[0];

      if (uploadType === "profile-avatar") {
        await ctx.prisma.user.update({
          where: { id: userId },
          data: { image: null },
        });
      }

      if (uploadType === "profile-banner") {
        await ctx.prisma.userProfile.update({
          where: { userId },
          data: { bannerImage: null },
        });
      }

      return {
        success: true,
        data: { deletedKey: key },
      };
    }),

  batchDeleteUploads: protectedProcedure
    .input(z.object({ keys: z.array(z.string()), confirm: z.boolean() }))
    .mutation(async ({ ctx, input }) => {
      const { keys, confirm } = input;
      const userId = ctx.session.user.id;

      if (!confirm) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Please confirm deletion",
        });
      }

      const userKeys = keys.filter((k) => k.includes(`/${userId}/`));

      if (userKeys.length === 0) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "No files belonging to you were found",
        });
      }

      await Promise.all(
        userKeys.map((key) =>
          tigrisClient.send(
            new DeleteObjectCommand({
              Bucket: serverEnv.TIGRIS_S3_BUCKET_NAME,
              Key: key,
            }),
          ),
        ),
      );

      await ctx.prisma.user.update({
        where: { id: userId },
        data: { image: null },
      });

      await ctx.prisma.userProfile.update({
        where: { userId },
        data: { bannerImage: null },
      });

      return {
        success: true,
        data: {
          deletedKeys: userKeys,
          count: userKeys.length,
        },
      };
    }),

  refreshExpiredUrls: protectedProcedure
    .input(z.object({ types: z.array(z.string()).optional() }))
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      const { types = ["profile-avatar", "profile-banner"] } = input;

      const refreshed: string[] = [];

      if (types.includes("profile-avatar")) {
        const user = await ctx.prisma.user.findUnique({
          where: { id: userId },
          select: { image: true },
        });

        if (user?.image) {
          const metadata = JSON.parse(user.image);
          if (new Date(metadata.expiresAt) < new Date()) {
            const newUrl = await generateSignedUrl(metadata.key, 604800);
            await ctx.prisma.user.update({
              where: { id: userId },
              data: {
                image: newUrl,
              },
            });
            refreshed.push("profile-avatar");
          }
        }
      }

      return {
        success: true,
        data: {
          refreshed,
        },
      };
    }),

  getUploadConfig: protectedProcedure.query(() => ({
    success: true,
    data: {
      maxFileSize: MAX_FILE_SIZE,
      allowedTypes: ALLOWED_IMAGE_TYPES,
      provider: "tigris" as const,
      endpoint: serverEnv.TIGRIS_S3_ENDPOINT,
      bucket: serverEnv.TIGRIS_S3_BUCKET_NAME,
      supportsAnimated: true,
      maxFilesPerRequest: 10,
      defaultExpirations: {
        avatar: "7 days",
        banner: "7 days",
        prompt_thumbnail: "30 days",
        prompt_example: "30 days",
      },
    },
  })),
});

export type UploadRouter = typeof uploadRouter;

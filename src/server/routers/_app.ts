import { createRouter } from "../trpc";
import { uploadRouter } from "./upload.router";

export const appRouter = createRouter({
  upload: uploadRouter,
});

export type AppRouter = typeof appRouter;

import { createRouter } from "../trpc";
import { characterRouter } from "./character.router";
import { uploadRouter } from "./upload.router";

export const appRouter = createRouter({
  character: characterRouter,
  upload: uploadRouter,
});

export type AppRouter = typeof appRouter;

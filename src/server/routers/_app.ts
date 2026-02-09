import { createRouter } from "../trpc";
import { characterRouter } from "./character.router";
import { eventsRouter } from "./events.router";
import { uploadRouter } from "./upload.router";

export const appRouter = createRouter({
  character: characterRouter,
  events: eventsRouter,
  upload: uploadRouter,
});

export type AppRouter = typeof appRouter;

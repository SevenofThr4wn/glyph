import z from "zod";

export const messageSchema = z.object({
  id: z.string().cuid(),
  roomId: z.string().cuid(),
  sender: z.string(),
  content: z.string(),
  timestamp: z.date(),
  token: z.string().optional(),
  destroy: z.object({
    isDestroyed: z.literal(true),
  }),
});

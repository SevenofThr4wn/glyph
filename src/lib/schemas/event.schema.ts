import z from "zod";

export const eventBaseSchema = z.object({
  title: z.string().min(3).max(150),
  description: z.string().max(2000).optional(),
  location: z.string().max(255).optional(),
  startAt: z.string().transform((val) => new Date(val)),
  endAt: z.string().transform((val) => new Date(val)),
  published: z.boolean().default(false),
});

export const createEventSchema = eventBaseSchema;

export const updateEventSchema = eventBaseSchema.partial().extend({
  id: z.string().cuid(),
});

export const eventIdSchema = z.object({
  id: z.string().cuid(),
});

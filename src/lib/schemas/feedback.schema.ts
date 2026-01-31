import z from "zod";

export const submitFeedbackSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  sms: z.string().optional(),
  message: z
    .string()
    .min(1, "Message is required")
    .max(5000, "Message is too long"),
});

export const submitResponseSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  message: z.string(),
  ticketResolved: z.boolean(),
});

import * as z from "zod";

export const formSchema = z.object({
  "furry-id": z.string().min(1, "Please select an item"),
  "first-name": z.string({ error: "This field is required" }),
  "last-name": z.string({ error: "This field is required" }),
  "display-name": z.string({ error: "This field is required" }),
  "email-address": z.email({ error: "Please enter a valid email" }),
  password: z.string({ error: "This field is required" }),
  "confirm-password": z.string({ error: "This field is required" }),
  "select-gender": z.string().min(1, "Please select an item"),
  "select-orientations": z
    .array(z.string(), { error: "Please select at least one item" })
    .min(1, "Please select at least one item"),
});

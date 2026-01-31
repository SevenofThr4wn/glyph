import z from "zod";

export const formSchema = z.object({
  "fursona-name": z.string({ error: "This field is required" }).optional(),
  "select-gender": z.string().min(1, "Please select an item").optional(),
  "select-species-group": z.string().min(1, "Please select an item").optional(),
  "select-species": z.string().min(1, "Please select an item").optional(),
  "select-sexual-orientation": z
    .string()
    .min(1, "Please select an item")
    .optional(),
  "has-fursuit": z.string().min(1, "Please select an item").optional(),
  "fursona-bio": z.string({ error: "This field is required" }).optional(),
  "file-upload": z
    .union([
      z.file().mime(["image/png", "image/jpeg", "image/gif"]).max(15000000),
      z
        .array(
          z.file().mime(["image/png", "image/jpeg", "image/gif"]).max(15000000),
        )
        .nonempty({ message: "Please select a file" }),
      z.string().min(1, "Please select a file"),
      z.instanceof(FileList),
    ])
    .optional(),
  "preview-name": z.string({ error: "This field is required" }).optional(),
  "preview-gender": z.string({ error: "This field is required" }).optional(),
  "preview-species-group": z
    .string({ error: "This field is required" })
    .optional(),
  "preview-species": z.string({ error: "This field is required" }).optional(),
  "preview-sexual-orientation": z
    .string({ error: "This field is required" })
    .optional(),
  "preview-has-fursuit": z.string().min(1, "Please select an item").optional(),
  "preview-fursona-bio": z
    .string({ error: "This field is required" })
    .optional(),
});

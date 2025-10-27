import { z } from "zod";

export const StoryFormSchema = z.object({
  productName: z.string().min(2, {
    message: "Product name must be at least 2 characters.",
  }),
  locationContext: z.string().min(2, {
    message: "Location must be at least 2 characters.",
  }),
  language: z.string({
    required_error: "Please select a language.",
  }),
  image: z
    .custom<FileList>()
    .refine((files) => !!files && files.length === 1, "An image is required.")
    .refine(
      (files) => files?.[0]?.size <= 5000000,
      `Max file size is 5MB.`
    )
    .refine(
      (files) => ["image/jpeg", "image/png", "image/webp", "image/gif"].includes(files?.[0]?.type),
      "Only .jpg, .png, .webp and .gif formats are supported."
    ),
});

export type StoryFormValues = z.infer<typeof StoryFormSchema>;

export type Language = {
  value: string;
  label: string;
};

export const languages: Language[] = [
  { value: "en", label: "English" },
  { value: "es", label: "Spanish" },
  { value: "fr", label: "French" },
  { value: "de", label: "German" },
  { value: "it", label: "Italian" },
];

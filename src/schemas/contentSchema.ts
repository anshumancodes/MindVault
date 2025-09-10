import { z } from "zod";

const contentSchema = z.object({
  link: z.string().url().optional(),
  type: z.string().min(3, "Type must be at least 3 characters long"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters long")
    .optional()
    .or(z.literal("")),
  title: z.string().min(4, "Title must be at least 4 characters long"),
  tags: z.array(z.string()).optional(),
});

export default contentSchema;

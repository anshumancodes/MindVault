import { z } from "zod";

const contentSchema = z.object({
  link: z.string(),
  type: z.string().min(3, "Type must be at least 3 characters long"),
  description:z.string().min(10,"description must be atleast 10 characters long!"),
  title: z.string().min(4, "Title must be at least 4 characters long"),
  tags: z.array(z.string()),
});

export default contentSchema;
import { z } from "zod";

const tagSchema = z.object({
  name: z.string().min(1).max(20, { message: "Tag name must be between 1 and 20 characters" }),
});

export default tagSchema;
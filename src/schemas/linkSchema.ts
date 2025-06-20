import { z } from "zod";
import mongoose from "mongoose";

const linkSchema = z.object({
  hash: z.string().min(1, { message: "Hash is required" }),
  userId: z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
    message: "Invalid MongoDB ObjectId",
  }),
});

export default linkSchema;

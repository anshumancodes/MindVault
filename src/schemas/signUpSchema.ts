import {z} from "zod";

const signUpSchema = z.object({
    name: z.string(),
    username: z.string().min(4,"Username must be at least 4 characters long").max(12,"Username must be at most 12 characters long"),
    email: z.string().email("Invalid email format"),
    password: z.string().min(5,"Password must be at least 5 characters long"),
});

export default signUpSchema;
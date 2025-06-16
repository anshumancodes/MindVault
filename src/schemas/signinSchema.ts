import {z} from "zod";

const signinSchema = z.object({
    
    identifier: z.string(),
    password: z.string().min(5,"Password must be at least 5 characters long"),
});

export default signinSchema;
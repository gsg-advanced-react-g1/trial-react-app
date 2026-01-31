import { z } from "zod";

export const registerSchema = z
    .object({
        fullName: z.string().min(2, "Full name is required"),
        email: z.string().email("Invalid email"),
        password: z.string().min(8, "Password must be at least 8 characters").max(72, "Password is too long"),
        confirmPassword: z.string().min(1, "Please confirm your password"),
    })
    .refine((v) => v.password === v.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });

export type RegisterValues = z.infer<typeof registerSchema>;

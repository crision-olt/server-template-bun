import zod from "zod";

export const registerSchema = zod.object({
    email: zod.string().email(),
    password: zod.string().min(8),
    passwordConfirmation: zod.string().min(8),
}).refine(({ password, passwordConfirmation }) => password === passwordConfirmation, {
            message: "Passwords do not match",
            path: ["passwordConfirmation"],
    });

export type RegisterInput = zod.infer<typeof registerSchema>;
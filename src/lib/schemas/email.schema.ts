import z, { string } from "zod";

export const sendResetPasswordEmailSchema = z.object({
    username: string().min(1),
    email: z.string().email(),
    resetURL: z.string().url(),
});

export const sendOtpEmailSchema = z.object({
    username: string().min(1),
    email: z.string().email(),
    otpCode: string().min(1).max(6),
    verifyUrl: z.string().url(),
});

export const sendSignInOTPEmailSchema = z.object({
    username: string().min(1),
    email: z.string().email(),
    otpCode: string().min(1).max(6),
    signInUrl: z.string().url(),
});
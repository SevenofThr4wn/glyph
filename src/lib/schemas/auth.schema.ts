import z from "zod";

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(12, "Password must be at least 12 characters long"),
});

export const registerSchema = z
  .object({
    displayName: z
      .string()
      .min(3, "Display Name must be at least 3 characters long"),
    firstName: z.string().min(1, "First Name is required"),
    lastName: z.string().min(1, "Last Name is required"),
    idsAsFurry: z.enum(["Yes", "No", "I want to become one"]),
    email: z.string().email("Invalid email address"),
    password: z
      .string()
      .min(12, "Password must be at least 12 characters long"),
    confirmPassword: z
      .string()
      .min(12, "Confirm Password must be at least 12 characters long"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
  });

export const otpSchema = z.object({
  otp: z
    .string()
    .length(6, "OTP must be exactly 6 digits")
    .regex(/^\d+$/, "OTP must contain only digits"),
});

export const resetPasswordSchema = z
  .object({
    email: z.string().email("Invalid email address"),
    otp: z
      .string()
      .length(6, "OTP must be exactly 6 digits")
      .regex(/^\d+$/, "OTP must contain only digits"),
    newPassword: z
      .string()
      .min(12, "New Password must be at least 12 characters long"),
    confirmNewPassword: z
      .string()
      .min(12, "Confirm New Password must be at least 12 characters long"),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Passwords do not match",
  });

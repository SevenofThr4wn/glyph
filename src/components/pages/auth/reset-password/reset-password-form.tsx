"use client";

import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { resetPasswordSchema } from "@/lib/schemas";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { authClient } from "@/lib/auth/auth-client";

export default function ResetPasswordForm() {
  type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

  const searchParams = useSearchParams();
  const router = useRouter();
  const email = searchParams.get("email");

  const form = useForm<ResetPasswordFormValues>({
    defaultValues: {
      email: email || "",
      newPassword: "",
      confirmNewPassword: "",
    },
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = (data: ResetPasswordFormValues) => {
    try {
      authClient.emailOtp.resetPassword(
        {
          email: data.email,
          otp: data.otp,
          password: data.newPassword,
        },
        {
          onSuccess: () => {
            setTimeout(() => {
              toast.success("Password has been reset successfully.");
              router.push("/login");
            }, 2000);
          },
          onError: (err) => {
            const error = err.error;
            toast.error(`Error Code ${error.status} - ${error.statusText}`, {
              description: `${error.message}`,
            });
            router.refresh();
          },
        },
      );
    } catch (error) {
      toast.error("An error occurred while resetting the password.", {
        description: "Please try again later.",
      });
      console.error("Reset password error:", error);
    }
  };
}

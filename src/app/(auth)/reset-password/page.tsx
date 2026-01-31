"use client";

import { authClient } from "@/lib/auth/auth-client";
import { resetPasswordSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

export default function ResetPasswordPage() {
  const router = useRouter();
  type ResetPasswordValues = z.infer<typeof resetPasswordSchema>;

  const form = useForm<ResetPasswordValues>({
    defaultValues: {
      email: "",
      newPassword: "",
      confirmNewPassword: "",
    },
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = (data: ResetPasswordValues) => {
    try {
      authClient.resetPassword(
        {
          newPassword: data.newPassword,
        },
        {
          onSuccess: () => {
            toast.success("Password reset successfully.", {
              description:
                "You will now be logged out. Please re-login with your new password.",
            });
            setTimeout(() => {
              authClient.signOut();
              router.push("/login");
            }, 2000);
          },
          onError: (err) => {
            const error = err.error;
            toast.error(`Error: ${error.status} - ${error.statusText}`, {
              description: error.message,
            });
          },
        },
      );
    } catch (error) {
      console.error("Error resetting password:", error);
      toast.error("Failed to reset password. Please try again.");
    }
  };

  return (
    <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="w-full max-w-sm"></div>
    </div>
  );
}

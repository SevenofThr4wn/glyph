"use client";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { authClient } from "@/lib/auth/auth-client";
import { otpSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { GalleryVerticalEnd } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

export function OTPForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const email = searchParams.get("email");
  const otpType = searchParams.get("otp-type");

  if (!email) {
    throw new Error("Email is required for OTP verification.");
  } else if (!otpType) {
    throw new Error("OTP type is required for OTP verification.");
  }

  const resendCode = () => {
    authClient.emailOtp.sendVerificationOtp({
      email,
      type: "email-verification",
    });
  };

  type OTPFormValues = z.infer<typeof otpSchema>;
  const form = useForm<OTPFormValues>({
    defaultValues: {
      otp: "",
    },
    resolver: zodResolver(otpSchema),
  });

  const onSubmit = (data: OTPFormValues) => {
    try {
      console.log("Verifying OTP for email:", email, "with OTP:", data.otp);
      authClient.emailOtp.verifyEmail(
        {
          email,
          otp: data.otp,
        },
        {
          onSuccess: () => {
            console.log("OTP verified successfully");
            toast.success("OTP verified successfully!");
            router.push("/");
          },
          onError: (err) => {
            const error = err.error;
            toast.error(`Error Code ${error.status}`, {
              description: `${error.message}`,
              duration: 10000,
            });
          },
        },
      );
    } catch (error) {
      toast.error("OTP verification failed. Please try again.");
      console.error("Failed to verify OTP:", error);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FieldGroup>
            <div className="flex flex-col items-center gap-2 text-center">
              <a
                href="#"
                className="flex flex-col items-center gap-2 font-medium"
              >
                <div className="flex size-8 items-center justify-center rounded-md">
                  <GalleryVerticalEnd className="size-6" />
                </div>
                <span className="sr-only">Acme Inc.</span>
              </a>
              <h1 className="text-xl font-bold">Enter verification code</h1>
              <FieldDescription>
                We sent a 6-digit code to your email address
              </FieldDescription>
            </div>
            <Field>
              <FieldLabel htmlFor="otp" className="sr-only">
                Verification code
              </FieldLabel>
              <FormField
                control={form.control}
                name="otp"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <InputOTP
                        maxLength={6}
                        value={field.value}
                        onChange={field.onChange}
                        containerClassName="gap-4"
                      >
                        <InputOTPGroup className="gap-2.5 *:data-[slot=input-otp-slot]:h-16 *:data-[slot=input-otp-slot]:w-12 *:data-[slot=input-otp-slot]:rounded-md *:data-[slot=input-otp-slot]:border *:data-[slot=input-otp-slot]:text-xl">
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                        </InputOTPGroup>
                        <InputOTPSeparator />
                        <InputOTPGroup className="gap-2.5 *:data-[slot=input-otp-slot]:h-16 *:data-[slot=input-otp-slot]:w-12 *:data-[slot=input-otp-slot]:rounded-md *:data-[slot=input-otp-slot]:border *:data-[slot=input-otp-slot]:text-xl">
                          <InputOTPSlot index={3} />
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FieldDescription className="text-center">
                Didn&apos;t receive the code? <a onClick={resendCode}>Resend</a>
              </FieldDescription>
            </Field>
            <Field>
              <Button
                type="submit"
                onClick={form.handleSubmit(onSubmit)}
                className="w-full"
              >
                Verify
              </Button>
            </Field>
          </FieldGroup>
        </form>
      </Form>

      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </FieldDescription>
    </div>
  );
}

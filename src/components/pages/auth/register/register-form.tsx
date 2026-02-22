"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, UserPlus } from "lucide-react";
import { toast } from "sonner";

import { registerSchema } from "@/lib/schemas";
import { authClient } from "@/lib/auth/auth-client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";

type RegisterFormValues = z.infer<typeof registerSchema>;

export function RegisterForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      displayName: "",
      firstName: "",
      lastName: "",
      idsAsFurry: "Yes",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const questionOpts = [
    { label: "Yes", value: "Yes" },
    { label: "No", value: "No" },
    { label: "I want to become one", value: "I want to become one" },
  ] as const;

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      await authClient.signUp.email(
        {
          name: data.displayName,
          email: data.email,
          password: data.password,
        },
        {
          onSuccess: () => {
            toast.success("Registration successful!", {
              description: "Please check your email to verify your account.",
              duration: 8000,
            });

            setTimeout(() => {
              authClient.emailOtp.sendVerificationOtp({
                email: data.email,
                type: "email-verification",
              });
            }, 2000);
          },
          onError: (ctx) => {
            toast.error("Registration Failed", {
              description: ctx.error.message || "Please try again.",
              duration: 8000,
            });
          },
        },
      );
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("Failed to create account. Please try again.");
    }
  };

  const continueAnonymously = async () => {
    await authClient.signIn.anonymous();
    router.push("/");
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-xl">
        <Card className="border-none shadow-lg">
          <CardHeader className="flex flex-col items-center space-y-2 pt-6">
            <UserPlus size={48} />
            <h2 className="text-2xl font-semibold">Create an Account</h2>
            <p className="text-muted-foreground">
              Welcome! Create an account to get started.
            </p>
          </CardHeader>

          <CardContent className="space-y-6 px-8">
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {/* Furry Identity */}
              <FieldGroup>
                <Controller
                  name="idsAsFurry"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field
                      orientation="responsive"
                      data-invalid={fieldState.invalid}
                    >
                      <FieldContent>
                        <FieldLabel>Do you identify as a Furry?</FieldLabel>
                        <FieldDescription>
                          This helps personalize your experience.
                        </FieldDescription>
                        {fieldState.error && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </FieldContent>

                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="min-w-32">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectSeparator />
                          {questionOpts.map((opt) => (
                            <SelectItem key={opt.value} value={opt.value}>
                              {opt.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </Field>
                  )}
                />
              </FieldGroup>

              {/* Names */}
              <div className="grid grid-cols-2 gap-4">
                <FieldGroup>
                  <Controller
                    control={form.control}
                    name="firstName"
                    render={({ field, fieldState }) => (
                      <Field>
                        <FieldLabel>First Name</FieldLabel>
                        <Input autoComplete="given-name" {...field} />
                        <FieldError errors={[fieldState.error]} />
                      </Field>
                    )}
                  />
                </FieldGroup>
                <FieldGroup>
                  <Controller
                    control={form.control}
                    name="lastName"
                    render={({ field, fieldState }) => (
                      <Field>
                        <FieldLabel>Last Name</FieldLabel>
                        <Input autoComplete="family-name" {...field} />
                        <FieldError errors={[fieldState.error]} />
                      </Field>
                    )}
                  />
                </FieldGroup>
              </div>

              {/* Display Name */}
              <Controller
                control={form.control}
                name="displayName"
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel>Display Name</FieldLabel>
                    <Input {...field} />
                    <FieldError errors={[fieldState.error]} />
                  </Field>
                )}
              />

              {/* Email */}
              <Controller
                control={form.control}
                name="email"
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel>Email</FieldLabel>
                    <Input type="email" autoComplete="email" {...field} />
                    <FieldError errors={[fieldState.error]} />
                  </Field>
                )}
              />

              {/* Password */}
              {(["password", "confirmPassword"] as const).map((name) => (
                <Controller
                  key={name}
                  control={form.control}
                  name={name}
                  render={({ field, fieldState }) => (
                    <Field>
                      <FieldLabel>
                        {name === "password" ? "Password" : "Confirm Password"}
                      </FieldLabel>
                      <div className="relative">
                        <Input
                          {...field}
                          type={showPassword ? "text" : "password"}
                          className="pr-10"
                        />

                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute top-0 right-0 h-full"
                          onClick={() => setShowPassword((v) => !v)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                      <FieldError errors={[fieldState.error]} />
                    </Field>
                  )}
                />
              ))}

              {/* Terms */}
              <div className="flex items-center space-x-2">
                <Checkbox id="terms" />
                <Label
                  htmlFor="terms"
                  className="text-muted-foreground text-sm"
                >
                  I agree to the{" "}
                  <Link href="#" className="text-primary hover:underline">
                    Terms
                  </Link>{" "}
                  and{" "}
                  <Link href="#" className="text-primary hover:underline">
                    Conditions
                  </Link>
                </Label>
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={form.formState.isSubmitting}
              >
                Create Account
              </Button>
            </form>

            <div className="my-4 flex items-center justify-center gap-2">
              <Separator className="flex-1" />
              <span className="text-sm">OR</span>
              <Separator className="flex-1" />
            </div>
            <Button className="w-full" onClick={continueAnonymously}>
              Continue Anonymously
            </Button>
          </CardContent>

          <CardFooter className="justify-center border-t py-4">
            <p className="text-muted-foreground text-sm">
              Already have an account?{" "}
              <Link href="/login" className="text-primary hover:underline">
                Sign in
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

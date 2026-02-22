"use client";

import { z } from "zod";
import Link from "next/link";
import { authClient } from "@/lib/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { FigmaIcon, GithubIcon, Pi } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { loginSchema } from "@/lib/schemas";
import { SiHuggingface } from "react-icons/si";
import { useRouter } from "next/navigation";
import { IconBrandGoogle } from "@tabler/icons-react";
import { toast } from "sonner";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";

export function LoginForm() {
  const router = useRouter();
  type LoginFormValues = z.infer<typeof loginSchema>;
  const form = useForm<LoginFormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormValues) => {
    try {
      authClient.signIn.email(
        {
          email: data.email,
          password: data.password,
        },
        {
          onSuccess: () => {
            toast.success("Login successful. Welcome back!");
            router.push("/");
          },
          onError: (ctx) => {
            toast.error("Login Failed", {
              description: ctx.error.message || "Please try again.",
            });
          },
        },
      );
    } catch (error) {
      console.error("Login error:", error);
      toast.error("An unexpected error occurred. Please try again.", {
        description: (error as Error).message,
      });
    }
  };

  const handleSocialLogin = (
    provider: "github" | "google" | "figma" | "huggingface",
  ) => {
    authClient.signIn.social({ provider });
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="grid p-4">
        <Card className="flex w-150 flex-col items-center">
          <CardHeader className="m-auto flex w-full max-w-xs flex-col items-center">
            <Pi className="h-9 w-9" />
            <p className="mt-4 text-xl font-semibold tracking-tight">
              Welcome Back to Glyph!
            </p>

            <div className="mt-8 flex items-center gap-3">
              <Button
                className="h-10 w-10 rounded-full"
                size="icon"
                onClick={() => handleSocialLogin("github")}
              >
                <GithubIcon size={24} />
              </Button>
              <Button
                className="h-10 w-10 rounded-full"
                size="icon"
                onClick={() => handleSocialLogin("google")}
              >
                <IconBrandGoogle size={24} />
              </Button>
              <Button
                className="h-10 w-10 rounded-full"
                size="icon"
                onClick={() => handleSocialLogin("figma")}
              >
                <FigmaIcon size={24} />
              </Button>
              <Button
                className="h-10 w-10 rounded-full"
                size="icon"
                onClick={() => handleSocialLogin("huggingface")}
              >
                <SiHuggingface size={24} />
              </Button>
            </div>

            <div className="my-7 flex w-full items-center justify-center overflow-hidden">
              <Separator />
              <span className="px-2 text-sm">OR</span>
              <Separator />
            </div>
          </CardHeader>
          <CardContent className="w-full max-w-xs">
            <form
              className="w-full space-y-4"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FieldGroup>
                <Controller
                  control={form.control}
                  name="email"
                  render={({ field, fieldState }) => (
                    <Field>
                      <FieldLabel>Email</FieldLabel>
                      <Input
                        className="w-full"
                        placeholder="Email"
                        type="email"
                        {...field}
                      />
                      {fieldState.error && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </FieldGroup>
              <FieldGroup>
                <Controller
                  control={form.control}
                  name="password"
                  render={({ field, fieldState }) => (
                    <Field>
                      <FieldLabel>Password</FieldLabel>
                      <Input
                        className="w-full"
                        placeholder="Password"
                        type="password"
                        {...field}
                      />

                      {fieldState.error && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </FieldGroup>

              <Button className="mt-4 w-full" type="submit">
                Continue with Email
              </Button>
            </form>
          </CardContent>
          <CardFooter>
            <p className="mt-5 text-center text-sm">
              Don&apos;t have an account?
              <Link
                className="text-muted-foreground ml-1 underline"
                href="/register"
              >
                Sign up
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

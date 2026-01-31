"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FigmaIcon, GithubIcon, Pi } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { loginSchema } from "@/lib/schemas";
import { SiHuggingface } from "react-icons/si";
import { authClient } from "@/lib/auth/auth-client";
import { useRouter } from "next/navigation";
import { IconBrandGoogle } from "@tabler/icons-react";
import { toast } from "sonner";

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

  const lastMethod = authClient.getLastUsedLoginMethod();
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
                variant={lastMethod === "github" ? "default" : "outline"}
                onClick={() => handleSocialLogin("github")}
              >
                <GithubIcon className="h-4.5! w-4.5!" />
                {lastMethod === "github" && (
                  <Badge className="ml-2">Last Used</Badge>
                )}
              </Button>
              <Button
                className="h-10 w-10 rounded-full"
                size="icon"
                variant={lastMethod === "google" ? "default" : "outline"}
                onClick={() => handleSocialLogin("google")}
              >
                <IconBrandGoogle className="h-4.5! w-4.5!" />
                {lastMethod === "google" && (
                  <Badge className="ml-2">Last Used</Badge>
                )}
              </Button>
              <Button
                className="h-10 w-10 rounded-full"
                size="icon"
                variant={lastMethod === "figma" ? "default" : "outline"}
                onClick={() => handleSocialLogin("figma")}
              >
                <FigmaIcon className="h-4.5! w-4.5!" />
                {lastMethod === "figma" && (
                  <Badge className="ml-2">Last Used</Badge>
                )}
              </Button>
              <Button
                className="h-10 w-10 rounded-full"
                size="icon"
                variant={lastMethod === "huggingface" ? "default" : "outline"}
                onClick={() => handleSocialLogin("huggingface")}
              >
                <SiHuggingface className="h-4.5! w-4.5!" />
                {lastMethod === "huggingface" && (
                  <Badge className="ml-2">Last Used</Badge>
                )}
              </Button>
            </div>

            <div className="my-7 flex w-full items-center justify-center overflow-hidden">
              <Separator />
              <span className="px-2 text-sm">OR</span>
              <Separator />
            </div>
          </CardHeader>
          <CardContent className="w-full max-w-xs">
            <Form {...form}>
              <form
                className="w-full space-y-4"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          className="w-full"
                          placeholder="Email"
                          type="email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          className="w-full"
                          placeholder="Password"
                          type="password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button className="mt-4 w-full" type="submit">
                  Continue with Email
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter>
            <p className="mt-5 text-center text-sm">
              Don&apos;t have an account?
              <Link
                className="text-muted-foreground ml-1 underline"
                href="/reg"
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

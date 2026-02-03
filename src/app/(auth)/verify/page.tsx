"use client";

import { OTPForm } from "@/components/pages/auth/otp";
import { Suspense } from "react";

export default function OTPPage() {
  return (
    <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="w-full max-w-sm">
        <Suspense>
          <OTPForm />
        </Suspense>
      </div>
    </div>
  );
}

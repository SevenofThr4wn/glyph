"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CTASection() {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <h2 className="mb-4 text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
          Ready to Join the Pack?
        </h2>
        <p className="text-foreground/80 mb-8 text-lg md:text-xl">
          Create your account today and start connecting with the furry
          community worldwide.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Button asChild size="lg" className="min-w-40">
            <Link href="/register">Sign Up for Free</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="min-w-40">
            <Link href="/learn">Learn More</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

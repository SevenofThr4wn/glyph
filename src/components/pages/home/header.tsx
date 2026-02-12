"use client";

import { LiquidChrome } from "@/components/effects/liquid-chrome";
import { TextType } from "@/components/effects/text-type";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Header() {
  return (
    <div className="relative overflow-hidden">
      <header className="relative flex min-h-[60vh] items-center justify-center overflow-hidden md:min-h-[70vh]">
        <div className="absolute inset-0">
          <LiquidChrome
            speed={0.15}
            baseColor={[0.1, 0.1, 0.4]}
            amplitude={0.45}
          />
        </div>

        <div className="absolute inset-0 bg-linear-to-b from-purple-900/20 via-transparent to-transparent" />

        <div className="animate-gradient-x absolute inset-0 bg-linear-to-r from-purple-900/10 via-violet-900/5 to-fuchsia-900/10" />

        <div className="relative z-30 mx-auto w-full max-w-6xl px-4 text-center">
          <div className="mb-6 md:mb-8">
            <TextType
              text="Unleash Your Furry Creativity"
              typingSpeed={50}
              pauseDuration={2000}
              showCursor={true}
              loop={false}
              cursorCharacter="_"
              className="text-4xl font-bold tracking-tight text-gray-100 sm:text-5xl md:text-6xl"
            />
          </div>

          <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-300 md:mb-10 md:text-xl">
            Your all-in-one platform for managing, showcasing, and connecting
            through your digital assets with the furry community worldwide.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button asChild size="lg" className="min-w-48">
              <Link href="/register">Create Your Profile</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="min-w-48">
              <Link href="/explore-characters">Explore Characters →</Link>
            </Button>
            <Button asChild variant="ghost" size="lg" className="min-w-48">
              <Link href="#demo">Watch Demo Video ▶</Link>
            </Button>
          </div>
        </div>

        <div className="from-background absolute right-0 bottom-0 left-0 z-20 h-20 bg-linear-to-t to-transparent" />
      </header>
    </div>
  );
}

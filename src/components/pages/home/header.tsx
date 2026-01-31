"use client";

import { LiquidChrome } from "@/components/effects/liquid-chrome";
import { TextType } from "@/components/effects/text-type";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function Header() {
  return (
    <div className="relative overflow-hidden">
      <header className="relative flex h-[40vh] min-h-75 items-center justify-center overflow-hidden">
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
          <Card className="relative rounded-2xl border border-purple-500/20 bg-black/40 p-6 shadow-2xl shadow-purple-900/20 backdrop-blur-md md:p-8">
            <CardHeader>
              <CardTitle className="text-center">
                <TextType
                  text="Welcome to Glyph!"
                  typingSpeed={75}
                  pauseDuration={1500}
                  showCursor={true}
                  loop={false}
                  cursorCharacter="_"
                  className="text-5xl font-medium text-gray-300"
                />
              </CardTitle>
              <CardDescription className="text-lg">
                Your all-in-one platform for managing and showcasing your
                digital assets.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
        <div className="absolute right-0 bottom-0 left-0 z-20 h-20 bg-linear-to-t from-gray-900 to-transparent" />
      </header>
      <div className="relative h-[5vh] bg-[rgba(23,23,23,0)]">
        <div
          className={cn(
            "absolute inset-0",
            "bg-size-[80px_80px]",
            "bg-[linear-gradient(to_right,--theme(--color-purple-900/0.1)_1px,transparent_1px),linear-gradient(to_bottom,--theme(--color-purple-900/0.1)_1px,transparent_1px)]",
            "opacity-20",
            "mask-[linear-gradient(to_bottom,black_0%,black_40%,transparent_100%)]",
          )}
        />
      </div>
    </div>
  );
}

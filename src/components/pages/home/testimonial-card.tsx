"use client";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface TestimonialCardProps {
  quote: string;
  author: string;
  role: string;
  className?: string;
}

export default function TestimonialCard({
  quote,
  author,
  role,
  className,
}: TestimonialCardProps) {
  return (
    <Card
      className={cn("transition-all duration-200 hover:shadow-lg", className)}
    >
      <CardContent className="flex flex-col gap-4">
        <div className="flex items-start gap-3">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-violet-600 text-lg font-semibold text-white">
            {author.charAt(0)}
          </div>
          <div className="flex-1">
            <div className="text-foreground font-semibold">{author}</div>
            <div className="text-muted-foreground text-sm">{role}</div>
          </div>
        </div>
        <blockquote className="text-foreground/80 text-sm italic">
          "{quote}"
        </blockquote>
      </CardContent>
    </Card>
  );
}

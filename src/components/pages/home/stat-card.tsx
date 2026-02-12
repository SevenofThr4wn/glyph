"use client";

import { cn } from "@/lib/utils";

interface StatCardProps {
  value: string;
  label: string;
  className?: string;
}

export default function StatCard({ value, label, className }: StatCardProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-2 text-center",
        className,
      )}
    >
      <div className="text-foreground text-4xl font-bold tracking-tight md:text-5xl">
        {value}
      </div>
      <div className="text-muted-foreground text-sm md:text-base">{label}</div>
    </div>
  );
}

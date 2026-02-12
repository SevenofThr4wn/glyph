"use client";

import StatCard from "./stat-card";

export default function StatsSection() {
  const stats = [
    { value: "10,000+", label: "Active Members" },
    { value: "50,000+", label: "Characters Created" },
    { value: "500+", label: "Events Hosted" },
    { value: "200,000+", label: "Images Shared" },
  ];

  return (
    <section className="bg-muted/30 py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-12">
          {stats.map((stat) => (
            <StatCard key={stat.label} value={stat.value} label={stat.label} />
          ))}
        </div>
      </div>
    </section>
  );
}

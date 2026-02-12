"use client";

import TestimonialCard from "./testimonial-card";

export default function TestimonialsSection() {
  const testimonials = [
    {
      quote:
        "Glyph has completely transformed how I showcase my art and connect with the community. It's the perfect platform!",
      author: "Luna",
      role: "Digital Artist",
    },
    {
      quote:
        "The event planning features are amazing. I've hosted 3 meetups already and the turnout has been incredible.",
      author: "Max",
      role: "Event Organizer",
    },
    {
      quote:
        "Finally, a platform built specifically for us. The community features make it so easy to find like-minded friends.",
      author: "Riley",
      role: "Community Member",
    },
  ];

  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 text-center md:mb-16">
          <h2 className="mb-4 text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
            Loved by the Community
          </h2>
          <p className="text-foreground/80 text-lg md:text-xl">
            See what our members are saying
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <TestimonialCard
              key={testimonial.author}
              quote={testimonial.quote}
              author={testimonial.author}
              role={testimonial.role}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

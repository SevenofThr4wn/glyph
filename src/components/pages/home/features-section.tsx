"use client";

import { IconBuildingCommunity } from "@tabler/icons-react";
import { CalendarDays, Globe2, Moon, Share2, Unlock } from "lucide-react";

const features = [
  {
    icon: Globe2,
    title: "Connect with Furries Locally and Worldwide",
    description:
      "Connect with fellow furry enthusiasts from around the globe. Share your art, stories, and experiences while discovering new friends who share your passion.",
    url: "/explore-characters",
  },
  {
    icon: CalendarDays,
    title: "Plan, Coordinate & Host Events",
    description:
      "Bring the fandom together. Effortlessly plan meetups, conventions, and social gatherings to celebrate your community and forge lasting real-world connections with your pack.",
    url: "/learn/plan-events",
  },
  {
    icon: Share2,
    title: "Build & Share your Furry Portfolio",
    description:
      "Our platform provides easy-to-use tools to help you build a stunning portfolio that reflects your unique style.",
    url: "/learn/portfolio-builder",
  },
  {
    icon: IconBuildingCommunity,
    title: "Join Groups & Communities",
    description:
      "Connect with like-minded individuals by joining groups and communities that share your interests and passions.",
    url: "/learn/groups-and-communities",
  },
  {
    icon: Moon,
    title: "'After Dark' Profiles",
    description:
      "Explore your deeper identity with After Dark profiles. Securely share fantasies and forge intimate connections in a welcoming space designed for authentic relationship discovery.",
    url: "/learn/after-dark-profiles",
  },
  {
    icon: Unlock,
    title: "Unlock Cosmetics & Exclusive Content",
    description:
      "Unlock a treasure trove of cosmetics and exclusive content to personalize your furry experience. Access unique avatars, badges, and special features that make your profile stand out in the community.",
    url: "#cosmetics",
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 text-center md:mb-16">
          <h2 className="mb-4 text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
            Everything You Need to Thrive
          </h2>
          <p className="text-foreground/80 text-lg md:text-xl">
            Powerful features designed for the furry community
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              className="flex flex-col rounded-xl border px-5 py-6 transition-all duration-200 hover:scale-105 hover:transform hover:shadow-lg"
              key={feature.title}
            >
              <div className="bg-muted mb-4 flex h-10 w-10 items-center justify-center rounded-full">
                <feature.icon className="size-5" />
              </div>
              <span className="text-lg font-semibold">{feature.title}</span>
              <p className="text-foreground/80 mt-1 text-[15px]">
                {feature.description}
              </p>
              {feature.url && (
                <div className="mt-4 flex items-center">
                  <a
                    href={feature.url}
                    className="text-primary hover:text-primary/80 text-sm font-medium transition-colors hover:underline"
                  >
                    Learn more &rarr;
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

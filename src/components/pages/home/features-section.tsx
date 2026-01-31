"use client";

import { IconBuildingCommunity } from "@tabler/icons-react";
import { CalendarDays, Globe2, Moon, Share2, Unlock } from "lucide-react";
const features = [
  {
    icon: Globe2,
    title: "Connect with Furries Locally and Worldwide",
    description:
      "Connect with fellow furry enthusiasts from around the globe. Share your art, stories, and experiences while discovering new friends who share your passion.",
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
    url: "#",
  },
];

export default function FeaturesSection() {
  return (
    <div className="flex min-h-screen items-center justify-center py-12">
      <div>
        <h2 className="text-center font-semibold text-4xl tracking-tight sm:text-5xl">
          Unleash Your Furry Creativity
        </h2>
        <div className="mx-auto mt-10 grid max-w-(--breakpoint-lg) gap-6 px-6 sm:mt-16 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              className="flex flex-col rounded-xl border px-5 py-6 hover:transform hover:scale-105 hover:shadow-lg transition-all duration-200"
              key={feature.title}
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                <feature.icon className="size-5" />
              </div>
              <span className="font-semibold text-lg">{feature.title}</span>
              <p className="mt-1 text-[15px] text-foreground/80">
                {feature.description}
              </p>
              <div className="mt-4 flex items-center text-sm font-medium hover:underline text-blue-500">
                {feature.url && <a href={feature.url}>Learn more &rarr;</a>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

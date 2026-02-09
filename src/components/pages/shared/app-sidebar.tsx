"use client";

import { Pi } from "lucide-react";
import { IconCat, IconDog, IconFish } from "@tabler/icons-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { ComponentProps } from "react";
import { NavCharacters, NavMain, NavSecondary, NavUser } from "./nav";
import {
  BadgeAlertIcon,
  CalendarDaysIcon,
  CircleHelpIcon,
  CpuIcon,
  HourglassIcon,
  SlidersHorizontalIcon,
  TelescopeIcon,
} from "@/components/animated-icons";

const data = {
  navMain: [
    {
      title: "Explore Content",
      url: "#",
      icon: <TelescopeIcon />,
      isActive: true,
      items: [
        {
          title: "Models",
          url: "#",
        },
        {
          title: "Images",
          url: "#",
        },
        {
          title: "Posts",
          url: "#",
        },
        {
          title: "Characters",
          url: "#",
        },
      ],
    },
    {
      title: "Community Events",
      url: "#",
      icon: <CalendarDaysIcon />,
      items: [
        {
          title: "Today",
          url: "#",
        },
        {
          title: "Upcoming",
          url: "#",
        },
        {
          title: "Past",
          url: "#",
        },
      ],
    },
    {
      title: "Technical",
      url: "#",
      icon: <CpuIcon />,
      items: [
        {
          title: "API Reference",
          url: "/api-reference",
        },
        {
          title: "Tech Stack",
          url: "/tech-stack",
        },
        {
          title: "Changelog & Updates",
          url: "/changelog",
        },
        {
          title: "System Status",
          url: "/system-status",
        },
      ],
    },
    {
      title: "Site Settings",
      url: "#",
      icon: <SlidersHorizontalIcon />,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Content",
          url: "#",
        },
        {
          title: "Privacy",
          url: "#",
        },
        {
          title: "Security",
          url: "#",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Submit a Report",
      url: "/reports/submit-report",
      icon: <BadgeAlertIcon />,
    },
    {
      title: "Help & Support",
      url: "/support/submit-ticket",
      icon: <CircleHelpIcon />,
    },
    {
      title: "Feedback",
      url: "/feedback/submit-feedback",
      icon: <HourglassIcon />,
    },
  ],
  characters: [
    {
      name: "Test Character 1",
      url: "#",
      icon: <IconCat />,
    },
    {
      name: "Test Character 2",
      url: "#",
      icon: <IconDog />,
    },
    {
      name: "Test Character 3",
      url: "#",
      icon: <IconFish />,
    },
  ],
};

export function AppSidebar({ ...props }: ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar
      className="top-(--header-height) h-[calc(100svh-var(--header-height))]!"
      {...props}
    >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <Pi size={32} />
                </div>
                <div className="grid flex-1 text-left text-lg leading-tight">
                  <span className="truncate">Glyph</span>
                  <span className="truncate text-sm">v0.1.0</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavCharacters characters={data.characters} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}

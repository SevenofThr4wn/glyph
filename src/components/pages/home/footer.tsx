"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

interface FooterLinkProps {
  href: string;
  children: React.ReactNode;
}

function FooterLink({ href, children }: FooterLinkProps) {
  return (
    <Link
      href={href}
      className="text-muted-foreground hover:text-foreground text-sm transition-colors hover:underline"
    >
      {children}
    </Link>
  );
}

interface FooterColumnProps {
  title: string;
  links: { label: string; href: string }[];
  className?: string;
}

function FooterColumn({ title, links, className }: FooterColumnProps) {
  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <h4 className="text-foreground text-sm font-semibold">{title}</h4>
      <ul className="flex flex-col gap-2">
        {links.map((link) => (
          <li key={link.href}>
            <FooterLink href={link.href}>{link.label}</FooterLink>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  const footerSections = [
    {
      title: "Product",
      links: [
        { label: "Features", href: "#features" },
        { label: "Pricing", href: "#pricing" },
        { label: "Roadmap", href: "#roadmap" },
        { label: "Changelog", href: "/changelog" },
      ],
    },
    {
      title: "Community",
      links: [
        { label: "Events", href: "/event/schedule" },
        { label: "Groups", href: "/learn/groups-and-communities" },
        { label: "Forum", href: "#forum" },
        { label: "Discord", href: "#discord" },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "Documentation", href: "#docs" },
        { label: "API Reference", href: "/api-reference" },
        { label: "Support", href: "/support/submit-ticket" },
        { label: "System Status", href: "/system-status" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About", href: "#about" },
        { label: "Blog", href: "#blog" },
        { label: "Careers", href: "#careers" },
        { label: "Contact", href: "#contact" },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy Policy", href: "#privacy" },
        { label: "Terms of Service", href: "#terms" },
        { label: "Cookie Policy", href: "#cookies" },
        { label: "Guidelines", href: "#guidelines" },
      ],
    },
  ];

  return (
    <footer className="border-border bg-background border-t">
      <div className="mx-auto max-w-7xl px-6 py-12 md:py-16">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-5">
          {footerSections.map((section) => (
            <FooterColumn
              key={section.title}
              title={section.title}
              links={section.links}
            />
          ))}
        </div>

        <div className="border-border mt-12 border-t pt-8 text-center">
          <p className="text-muted-foreground text-xs md:text-sm">
            © 2026 Glyph. All rights reserved. Made with ❤️ for the furry
            community.
          </p>
          <div className="text-muted-foreground mt-4 flex items-center justify-center gap-6 text-xs">
            <Link href="#" className="hover:text-foreground">
              Twitter
            </Link>
            <Link href="#" className="hover:text-foreground">
              Discord
            </Link>
            <Link href="#" className="hover:text-foreground">
              Instagram
            </Link>
            <Link href="#" className="hover:text-foreground">
              TikTok
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

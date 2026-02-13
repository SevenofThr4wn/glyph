import type { Metadata } from "next";
import { ReactNode } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/pages/shared";
import { StreamVideoProvider, ThemeProvider } from "@/lib/providers";
import { Toaster } from "sonner";
import { TRPCProvider } from "@/server/trpc";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Glyph",
  description: "A place to share your furry creations.",
};

export const iframeHeight = "800px";

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Toaster position="top-right" richColors />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <div className="[--header-height:calc(--spacing(14))]">
            <SidebarProvider defaultOpen={false}>
              <AppSidebar />
              <SidebarInset className="flex-1">
                <TRPCProvider>
                  <StreamVideoProvider>{children}</StreamVideoProvider>
                </TRPCProvider>
              </SidebarInset>
            </SidebarProvider>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}

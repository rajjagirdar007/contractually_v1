// app/layout.tsx
import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner"; // <--- Import Sonner's Toaster

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "ContrActually - Understand Contracts Instantly",
  description: "AI-powered contract analysis. Decode legal jargon, identify risks, and save time.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        {children}
        <Toaster richColors position="top-right" /> {/* <--- Add Sonner Toaster here */}
        {/* You can customize position, richColors, theme, etc. */}
      </body>
    </html>
  );
}
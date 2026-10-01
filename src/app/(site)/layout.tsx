import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { cn } from "@/lib/utils";
import { Grainy } from "@/components/grainy";
import { Header } from "@/components/header";

import "../globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "rbpolim",
  description: "Thoughts, ideas, and brain dumps.",
};

export default function WebsiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          inter.className,
          "min-h-screen antialiased font-mono bg-white"
        )}
      >
        <Grainy />
        <Header />
        <main className="max-w-2xl mx-auto px-4 my-20">{children}</main>
      </body>
    </html>
  );
}

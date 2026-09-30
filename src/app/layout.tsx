import type { Metadata } from "next";
import { Inter, Monofett } from "next/font/google";

import { cn } from "@/lib/utils";
import { Grainy } from "@/components/grainy";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "rbpolim",
  description: "Thoughts, ideas, and brain dumps.",
};

export default function RootLayout({
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
        {children}
      </body>
    </html>
  );
}

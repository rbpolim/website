import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { Grainy } from "@/components/grainy";
import { Header } from "@/components/header";
import { Heading } from "@/components/heading";
import { Link } from "@/components/link";
import { cn } from "@/lib/utils";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "not found",
  description: "This page doesn’t exist.",
};

export default function GlobalNotFound() {
  return (
    <html lang="en">
      <body
        className={cn(
          inter.className,
          "min-h-screen antialiased font-mono bg-white",
        )}
      >
        <Grainy />
        <Header />
        <main className="max-w-2xl mx-auto px-4 my-20">
          <section className="space-y-6">
            <Heading
              title="404"
              description="This page doesn’t exist. The link may be wrong, or the page was moved."
            />
            <ul className="text-sm text-slate-600/80">
              <Link title="back home" href="/" />
            </ul>
          </section>
        </main>
      </body>
    </html>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/utils/utils";

export function Header() {
  const pathName = usePathname();

  const routes = [
    { href: "/", text: "Home" },
    { href: "/writing", text: "Writing" },
    { href: "/shooting", text: "Shooting" },
  ];

  return (
    <header className="p-4">
      <nav className="flex items-center gap-x-4">
        {routes.map((route) => (
          <Link
            key={route.text}
            href={route.href}
            className={cn(
              "text-sm leading-relaxed",
              pathName === route.href ? "underline" : ""
            )}
          >
            {route.text}
          </Link>
        ))}
      </nav>
    </header>
  );
}

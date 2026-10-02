"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";

type Props = {
  word: string;
  emoji: string;
};

export function RevealWord({ word, emoji }: Props) {
  const [revealed, setRevealed] = useState(false);

  return (
    <button
      type="button"
      onClick={() => setRevealed(true)}
      aria-pressed={revealed}
      className={cn(
        "inline-flex items-baseline align-baseline",
        revealed
          ? "cursor-text"
          : "cursor-pointer transition-colors duration-300 hover:bg-[#00ff0059]",
      )}
    >
      <span className="inline-flex overflow-hidden">
        <span
          className={cn(
            "transition-[filter] duration-500",
            revealed ? "blur-none" : "select-none blur-lg",
          )}
        >
          {word}
        </span>
      </span>
      <span
        className={cn(
          "inline-block overflow-hidden whitespace-nowrap transition-all duration-500",
          revealed ? "ml-1 max-w-8 opacity-100" : "max-w-0 opacity-0",
        )}
        aria-hidden={!revealed}
      >
        {emoji}
      </span>
    </button>
  );
}

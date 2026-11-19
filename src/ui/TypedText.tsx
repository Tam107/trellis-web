"use client";

import { useEffect, useState } from "react";
import { cn } from "./cn";

/** Typing speed, per character. Fast enough that a two-line reply finishes in about two seconds. */
const CHARACTER_MS = 24;
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

export type TypedTextProps = {
  text: string;
  /** Typing starts when this turns true, e.g. when the block scrolls into view. */
  isActive?: boolean;
  delayMs?: number;
  className?: string;
};

/**
 * Text that types itself out, with a blinking caret while it does.
 *
 * The full text is laid out invisibly underneath, so the box never grows line by line, and screen
 * readers get the whole sentence at once instead of a stream of letters.
 */
export function TypedText({ text, isActive = true, delayMs = 0, className }: TypedTextProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isActive) return;
    let interval: number | undefined;
    const start = window.setTimeout(() => {
      if (window.matchMedia(REDUCED_MOTION_QUERY).matches) {
        setCount(text.length);
        return;
      }
      interval = window.setInterval(() => {
        setCount((current) => {
          if (current >= text.length) {
            window.clearInterval(interval);
            return current;
          }
          return current + 1;
        });
      }, CHARACTER_MS);
    }, delayMs);
    return () => {
      window.clearTimeout(start);
      window.clearInterval(interval);
    };
  }, [isActive, delayMs, text]);

  const isTyping = isActive && count < text.length;
  return (
    <span className={cn("grid", className)}>
      <span className="sr-only">{text}</span>
      <span aria-hidden className="invisible col-start-1 row-start-1">
        {text}
      </span>
      <span aria-hidden className="col-start-1 row-start-1">
        {text.slice(0, count)}
        {isTyping ? (
          <span className="ml-px inline-block h-[1em] w-0.5 animate-caret bg-current align-text-bottom" />
        ) : null}
      </span>
    </span>
  );
}

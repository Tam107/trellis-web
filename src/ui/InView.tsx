"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "./cn";

/**
 * Where an `InView` block is. `undefined` (server render, no JavaScript) means "show everything":
 * content is only ever hidden after the browser has proved it can bring it back.
 */
export const IN_VIEW_STATES = { ARMED: "armed", VISIBLE: "visible" } as const;
type InViewState = (typeof IN_VIEW_STATES)[keyof typeof IN_VIEW_STATES];

/*
 * Classes for children of an `InView`. They start the time-based animations when the block first
 * scrolls into view, which `reveal` cannot do: a chat that types, bars that rise in order. Add a
 * `stagger-<n>` to sequence siblings.
 */
export const IN_VIEW_RISE =
  "group-data-[state=armed]/view:opacity-0 group-data-[state=visible]/view:animate-rise";
export const IN_VIEW_GROW_Y =
  "origin-bottom group-data-[state=armed]/view:scale-y-0 group-data-[state=visible]/view:animate-grow-y";
export const IN_VIEW_GROW_X =
  "origin-left group-data-[state=armed]/view:scale-x-0 group-data-[state=visible]/view:animate-grow-x";

/** The threshold that counts as "seen": a third of the block on screen. */
const DEFAULT_THRESHOLD = 0.3;

export type InViewProps = {
  children: ReactNode | ((isVisible: boolean) => ReactNode);
  className?: string;
  threshold?: number;
};

/** Marks a block `armed` once mounted and `visible` the first time it scrolls into view. */
export function InView({ children, className, threshold = DEFAULT_THRESHOLD }: InViewProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<InViewState | undefined>(undefined);

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === "undefined") return;
    // The observer reports once straight after `observe`, so the block is armed or shown from that
    // first callback, never synchronously here.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setState(IN_VIEW_STATES.VISIBLE);
          observer.disconnect();
        } else {
          setState(IN_VIEW_STATES.ARMED);
        }
      },
      { threshold },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  return (
    <div ref={ref} data-state={state} className={cn("group/view", className)}>
      {typeof children === "function" ? children(state !== IN_VIEW_STATES.ARMED) : children}
    </div>
  );
}

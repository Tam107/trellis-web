import type { CSSProperties, ReactNode } from "react";
import { cn } from "../lib/cn";

/** Geometry of the SVG circle; the viewBox is square and the stroke sits inside it. */
const VIEWBOX = 120;
const RADIUS = 52;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const STROKE_WIDTH = 12;
/** The empty-ring offset the fill animation starts from (see `animate-ring-fill`). */
const RING_STYLE = { "--ring-circumference": CIRCUMFERENCE } as CSSProperties;

export type ProgressRingProps = {
  /** 0-100, clamped. */
  value: number;
  label: string;
  /** Centre content, e.g. the percentage and a caption. */
  children?: ReactNode;
  className?: string;
};

/** A donut for one share of a whole. For a row of values use a bar chart, not several rings. */
export function ProgressRing({ value, label, children, className }: ProgressRingProps) {
  const percent = Math.min(100, Math.max(0, Math.round(value)));
  return (
    <div className={cn("relative grid place-items-center", className)}>
      <svg
        viewBox={`0 0 ${VIEWBOX} ${VIEWBOX}`}
        className="h-full w-full -rotate-90"
        role="progressbar"
        aria-label={label}
        aria-valuenow={percent}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <circle
          cx={VIEWBOX / 2}
          cy={VIEWBOX / 2}
          r={RADIUS}
          fill="none"
          strokeWidth={STROKE_WIDTH}
          className="stroke-surface-sunken"
        />
        <circle
          cx={VIEWBOX / 2}
          cy={VIEWBOX / 2}
          r={RADIUS}
          fill="none"
          strokeWidth={STROKE_WIDTH}
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={CIRCUMFERENCE * (1 - percent / 100)}
          className="animate-ring-fill stroke-brand"
          style={RING_STYLE}
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center text-center">{children}</div>
    </div>
  );
}

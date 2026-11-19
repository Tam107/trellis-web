"use client";

import { useLocale } from "next-intl";
import { useEffect, useState } from "react";
import type { Locale } from "@/i18n/routing";
import { formatNumber } from "@/shared/lib/format";

const DURATION_MS = 1400;
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

/** Ease-out cubic: fast at first, settling onto the final figure. */
const easeOut = (progress: number) => 1 - (1 - progress) ** 3;

/**
 * A figure that counts up from zero once, on load. The server and the first client render show
 * the final value, so the number is right before any script runs.
 */
export function CountUp({
  value,
  decimals = 0,
  suffix = "",
}: {
  value: number;
  decimals?: number;
  suffix?: string;
}) {
  const locale = useLocale() as Locale;
  const [shown, setShown] = useState(value);

  useEffect(() => {
    if (window.matchMedia(REDUCED_MOTION_QUERY).matches) return;
    let frame = 0;
    const startedAt = performance.now();
    const tick = (now: number) => {
      const progress = Math.min(1, (now - startedAt) / DURATION_MS);
      setShown(value * easeOut(progress));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [value]);

  const text = formatNumber(shown, locale, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
  return <span className="tabular-nums">{`${text}${suffix}`}</span>;
}

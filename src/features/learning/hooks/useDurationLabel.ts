"use client";

import { useTranslations } from "next-intl";
import { splitMinutes } from "../shared/learning.format";

/**
 * A course length as one phrase. Three cases, because "6 giờ 0 phút" and "0h 40min" both read as
 * a bug: hours only, minutes only, or both.
 */
export function useDurationLabel(): (totalMinutes: number) => string {
  const t = useTranslations("learning.units");
  return (totalMinutes) => {
    const { hours, minutes } = splitMinutes(totalMinutes);
    if (hours === 0) return t("minutes", { count: minutes });
    if (minutes === 0) return t("durationHours", { hours });
    return t("duration", { hours, minutes });
  };
}

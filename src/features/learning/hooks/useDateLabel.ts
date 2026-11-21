"use client";

import { useFormatter, type DateTimeFormatOptions } from "next-intl";

/**
 * Formats an ISO timestamp from the API in the current locale. Screens keep passing one of the
 * option constants in `learning.format.ts` (`SHORT_DATE`, `CLOCK_TIME`...), so the same moment
 * reads the same everywhere and no screen builds a `Date` or an options object inline.
 */
export function useDateLabel(): (iso: string, options: DateTimeFormatOptions) => string {
  const format = useFormatter();
  return (iso, options) => format.dateTime(new Date(iso), options);
}

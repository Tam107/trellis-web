import type { DateTimeFormatOptions } from "next-intl";

const SECONDS_PER_MINUTE = 60;
const MINUTES_PER_HOUR = 60;
const SECONDS_PER_HOUR = SECONDS_PER_MINUTE * MINUTES_PER_HOUR;
const BYTES_PER_MEGABYTE = 1_000_000;

/** `372` -> `{ hours: 6, minutes: 12 }`, for the `units.duration` message. */
export function splitMinutes(totalMinutes: number): { hours: number; minutes: number } {
  return {
    hours: Math.floor(totalMinutes / MINUTES_PER_HOUR),
    minutes: totalMinutes % MINUTES_PER_HOUR,
  };
}

/** Media timestamps are read as digits, not prose, so they stay outside i18n. */
export function formatClock(totalSeconds: number): string {
  const hours = Math.floor(totalSeconds / SECONDS_PER_HOUR);
  const minutes = Math.floor((totalSeconds % SECONDS_PER_HOUR) / SECONDS_PER_MINUTE);
  const seconds = Math.floor(totalSeconds % SECONDS_PER_MINUTE);
  const ss = seconds.toString().padStart(2, "0");
  // `6:12` under an hour, `4:20:00` past it, the way a video player shows length.
  return hours > 0 ? `${hours}:${minutes.toString().padStart(2, "0")}:${ss}` : `${minutes}:${ss}`;
}

export function toMegabytes(bytes: number): string {
  return (bytes / BYTES_PER_MEGABYTE).toFixed(1);
}

/** `26 Jan`. Declared once: inline option objects in JSX trip the no-literal-string rule. */
export const SHORT_DATE: DateTimeFormatOptions = { day: "numeric", month: "short" };

/** `26 Jan, 13:38`. */
export const SHORT_DATE_TIME: DateTimeFormatOptions = {
  day: "numeric",
  month: "short",
  hour: "2-digit",
  minute: "2-digit",
};

/** `Mon 26`, for a week grid. */
export const WEEKDAY_DATE: DateTimeFormatOptions = { weekday: "short", day: "numeric" };

/** `09:52`, for an `asOf` stamp. */
export const CLOCK_TIME: DateTimeFormatOptions = { hour: "2-digit", minute: "2-digit" };

"use client";

import { History } from "lucide-react";
import { useFormatter, useTranslations } from "next-intl";
import { Icon } from "@/ui/Icon";
import { CLOCK_TIME } from "./learning.format";

/**
 * Projections are rebuilt in the background, so every figure read from one carries the moment it
 * was built (BR-07). Showing a number without it would claim a freshness the system does not have.
 */
export function AsOfBadge({ asOf }: { asOf: string }) {
  const t = useTranslations("learning.asOf");
  const format = useFormatter();
  return (
    <span
      title={t("note")}
      className="flex items-center gap-1.5 rounded-control bg-surface-sunken px-2.5 py-1.5 text-xs text-fg-muted"
    >
      <Icon icon={History} size="sm" />
      {t("label", { time: format.dateTime(new Date(asOf), CLOCK_TIME) })}
    </span>
  );
}

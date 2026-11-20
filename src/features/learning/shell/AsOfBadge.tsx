"use client";

import { useDateLabel } from "@/features/learning/hooks/useDateLabel";
import { History } from "lucide-react";
import { useTranslations } from "next-intl";
import { Icon } from "@/ui/Icon";
import { CLOCK_TIME } from "../shared/learning.format";

/**
 * Projections are rebuilt in the background, so every figure read from one carries the moment it
 * was built (BR-07). Showing a number without it would claim a freshness the system does not have.
 */
export function AsOfBadge({ asOf }: { asOf: string }) {
  const t = useTranslations("learning.asOf");
  const dateLabel = useDateLabel();
  return (
    <span
      title={t("note")}
      className="flex items-center gap-1.5 rounded-control bg-surface-sunken px-2.5 py-1.5 text-xs text-fg-muted"
    >
      <Icon icon={History} size="sm" />
      {t("label", { time: dateLabel(asOf, CLOCK_TIME) })}
    </span>
  );
}

"use client";

import { BarChart3, EyeOff } from "lucide-react";
import { useTranslations } from "next-intl";
import { ANALYTICS_AS_OF, SKILL_GAPS } from "@/entities/learning/teaching.fixtures";
import type { SkillGapRow } from "@/entities/learning/teaching.types";
import { EmptyState } from "@/ui/feedback/EmptyState";
import { Icon } from "@/ui/primitives/Icon";
import { ProgressBar } from "@/ui/feedback/ProgressBar";
import { AsOfBadge } from "../shell/AsOfBadge";
import { PageHeading } from "../shell/PageHeading";

/** M21 — skill gaps. Two rules show on screen: the projection lag, and the small-group cut-off. */
export function StudioAnalyticsPage() {
  const t = useTranslations("learning.analyticsPage");

  return (
    <div className="flex flex-col gap-4">
      <PageHeading
        title={t("title")}
        description={t("description")}
        actions={<AsOfBadge asOf={ANALYTICS_AS_OF} />}
      />

      {SKILL_GAPS.length === 0 ? (
        <EmptyState icon={BarChart3} title={t("emptyTitle")} description={t("emptyDescription")} />
      ) : (
        <>
          <ul className="flex flex-col gap-3">
            {SKILL_GAPS.map((row) => (
              <li key={row.skill}>
                <SkillRow row={row} />
              </li>
            ))}
          </ul>
          <p className="text-xs text-fg-subtle">{t("withheldNote")}</p>
        </>
      )}
    </div>
  );
}

function SkillRow({ row }: { row: SkillGapRow }) {
  const t = useTranslations("learning.analyticsPage");

  if (row.isTooSmallToShow) {
    return (
      <article className="flex flex-wrap items-center gap-3 rounded-card border border-border bg-surface p-4">
        <h2 className="min-w-0 flex-1 text-sm font-semibold text-fg">{row.skill}</h2>
        <span className="flex items-center gap-1.5 text-xs text-fg-subtle">
          <Icon icon={EyeOff} size="sm" />
          {t("withheld")}
        </span>
      </article>
    );
  }

  return (
    <article className="flex flex-col gap-2 rounded-card border border-border bg-surface p-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-sm font-semibold text-fg">{row.skill}</h2>
        <span className="text-xs text-fg-muted">{t("cohortSize", { count: row.cohortSize })}</span>
      </div>
      <div className="flex items-center gap-3">
        <ProgressBar value={row.attainment} label={row.skill} />
        <span className="shrink-0 text-sm font-semibold text-fg">{row.attainment}%</span>
      </div>
      <p className="text-xs text-fg-muted">{t("attainment", { percent: row.attainment })}</p>
    </article>
  );
}

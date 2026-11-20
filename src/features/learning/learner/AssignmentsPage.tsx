"use client";

import { NotebookPen } from "lucide-react";
import { useFormatter, useTranslations } from "next-intl";
import { ASSIGNMENTS } from "@/entities/learning/teaching.fixtures";
import type { AssignmentRow } from "@/entities/learning/teaching.types";
import { EmptyState } from "@/ui/EmptyState";
import { ProgressBar } from "@/ui/ProgressBar";
import { SHORT_DATE } from "../shared/learning.format";
import { PageHeading } from "../shell/PageHeading";

/** The mock has one fixed "today", so overdue is decided against it rather than the clock. */
const TODAY = new Date("2026-01-27T00:00:00Z");

export function AssignmentsPage() {
  const t = useTranslations("learning.assignmentsPage");

  return (
    <div className="flex flex-col gap-4">
      <PageHeading title={t("title")} description={t("description")} />

      {ASSIGNMENTS.length === 0 ? (
        <EmptyState icon={NotebookPen} title={t("emptyTitle")} description={t("emptyDescription")} />
      ) : (
        <ul className="flex flex-col gap-3">
          {ASSIGNMENTS.map((row) => (
            <li key={row.id}>
              <AssignmentCard row={row} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function AssignmentCard({ row }: { row: AssignmentRow }) {
  const t = useTranslations("learning.assignmentsPage");
  const format = useFormatter();
  const due = new Date(row.dueAt);
  const isClosed = due < TODAY;
  const percent = row.cohortSize === 0 ? 0 : (row.submitted / row.cohortSize) * 100;

  return (
    <article className="flex flex-wrap items-center gap-4 rounded-card border border-border bg-surface p-4">
      <div className="min-w-0 flex-1 basis-64">
        <h2 className="text-sm font-semibold text-fg">{row.title}</h2>
        <p className="mt-0.5 text-xs text-fg-muted">{row.courseTitle}</p>
        <div className="mt-2 flex items-center gap-2">
          <ProgressBar size="sm" value={percent} label={row.title} />
          <span className="shrink-0 text-xs text-fg-muted">
            {t("submittedOf", { submitted: row.submitted, total: row.cohortSize })}
          </span>
        </div>
      </div>
      <span className="text-xs text-fg-subtle">
        {isClosed
          ? t("overdue", { date: format.dateTime(due, SHORT_DATE) })
          : t("due", { date: format.dateTime(due, SHORT_DATE) })}
      </span>
    </article>
  );
}

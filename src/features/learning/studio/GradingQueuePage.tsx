"use client";

import { useDateLabel } from "@/features/learning/hooks/useDateLabel";
import { ClipboardCheck } from "lucide-react";
import { useTranslations } from "next-intl";
import { SUBMISSIONS } from "@/entities/learning/teaching.fixtures";
import { SUBMISSION_STATES, type SubmissionRow } from "@/entities/learning/teaching.types";
import { Badge } from "@/ui/primitives/Badge";
import { Button } from "@/ui/primitives/Button";
import { EmptyState } from "@/ui/feedback/EmptyState";
import { SHORT_DATE } from "../shared/learning.format";
import { submissionTone } from "../shared/learning.tones";
import { PageHeading } from "../shell/PageHeading";

/** M18 — the marking queue. A mark is appended, never overwritten (BR-06). */
export function GradingQueuePage() {
  const t = useTranslations("learning.gradingPage");
  const waiting = SUBMISSIONS.filter((row) => row.state === SUBMISSION_STATES.WAITING);

  return (
    <div className="flex flex-col gap-4">
      <PageHeading title={t("title")} description={t("description")} />

      {SUBMISSIONS.length === 0 ? (
        <EmptyState icon={ClipboardCheck} title={t("emptyTitle")} description={t("emptyDescription")} />
      ) : (
        <>
          <p className="text-sm text-fg-muted">{t("waitingCount", { count: waiting.length })}</p>
          <ul className="flex flex-col gap-3">
            {SUBMISSIONS.map((row) => (
              <li key={row.id}>
                <SubmissionCard row={row} />
              </li>
            ))}
          </ul>
          <p className="text-xs text-fg-subtle">{t("appendOnlyNote")}</p>
        </>
      )}
    </div>
  );
}

function SubmissionCard({ row }: { row: SubmissionRow }) {
  const t = useTranslations("learning.gradingPage");
  const tStates = useTranslations("learning.submissionStates");
  const dateLabel = useDateLabel();
  const isWaiting = row.state === SUBMISSION_STATES.WAITING;

  return (
    <article className="flex flex-wrap items-start gap-4 rounded-card border border-border bg-surface p-4">
      <div className="min-w-0 flex-1 basis-64">
        <div className="flex flex-wrap items-center gap-2">
          <h2 className="text-sm font-semibold text-fg">{row.studentName}</h2>
          <Badge tone={submissionTone(isWaiting)} size="sm">
            {tStates(row.state)}
          </Badge>
        </div>
        <p className="mt-0.5 text-xs text-fg-muted">{row.assessmentTitle}</p>
        <p className="mt-2 text-sm text-fg">{row.questionPrompt}</p>
        <p className="mt-1 text-xs text-fg-subtle">
          {t("submittedAt", { date: dateLabel(row.submittedAt, SHORT_DATE) })}
        </p>
      </div>
      <div className="flex flex-col items-end gap-2">
        <span className="text-sm font-semibold text-fg">
          {t("pointsOf", { awarded: row.pointsAwarded ?? 0, possible: row.pointsPossible })}
        </span>
        <Button variant={isWaiting ? "primary" : "secondary"} size="sm">
          {t("mark")}
        </Button>
      </div>
    </article>
  );
}

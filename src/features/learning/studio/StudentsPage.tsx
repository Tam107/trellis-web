"use client";

import { useDateLabel } from "@/features/learning/hooks/useDateLabel";
import { MessageSquare, TriangleAlert, Users } from "lucide-react";
import { useTranslations } from "next-intl";
import { STUDENTS } from "@/entities/learning/teaching.fixtures";
import type { StudentRow } from "@/entities/learning/teaching.types";
import { Badge } from "@/ui/primitives/Badge";
import { Button } from "@/ui/primitives/Button";
import { EmptyState } from "@/ui/feedback/EmptyState";
import { Icon } from "@/ui/primitives/Icon";
import { ProgressBar } from "@/ui/feedback/ProgressBar";
import { SHORT_DATE } from "../shared/learning.format";
import { AT_RISK_TONE } from "../shared/learning.tones";
import { PageHeading } from "../shell/PageHeading";

export function StudentsPage() {
  const t = useTranslations("learning.studentsPage");
  const students = STUDENTS;

  return (
    <div className="flex flex-col gap-4">
      <PageHeading title={t("title")} description={t("description")} />

      {students.length === 0 ? (
        <EmptyState icon={Users} title={t("emptyTitle")} description={t("emptyDescription")} />
      ) : (
        <>
          <ul className="flex flex-col gap-3">
            {students.map((student) => (
              <li key={student.id}>
                <StudentCard student={student} />
              </li>
            ))}
          </ul>
          {/* A flag is a prompt for a human, never a decision about the learner (FR-044). */}
          <p className="text-xs text-fg-subtle">{t("atRiskNote")}</p>
        </>
      )}
    </div>
  );
}

function StudentCard({ student }: { student: StudentRow }) {
  const t = useTranslations("learning.studentsPage");
  const dateLabel = useDateLabel();
  return (
    <article className="flex flex-wrap items-center gap-4 rounded-card border border-border bg-surface p-4">
      <span className="grid size-10 shrink-0 place-items-center rounded-full bg-surface-sunken text-sm font-medium text-fg">
        {student.initials}
      </span>
      <div className="min-w-0 flex-1 basis-64">
        <div className="flex flex-wrap items-center gap-2">
          <h2 className="text-sm font-semibold text-fg">{student.name}</h2>
          {student.isAtRisk ? (
            <Badge tone={AT_RISK_TONE} size="sm" icon={<Icon icon={TriangleAlert} size="xs" />}>
              {t("atRisk")}
            </Badge>
          ) : null}
        </div>
        <p className="mt-0.5 text-xs text-fg-muted">{student.courseTitle}</p>
        <div className="mt-2 flex items-center gap-2">
          <ProgressBar size="sm" value={student.percentComplete} label={t("progress")} />
          <span className="shrink-0 text-xs text-fg-muted">{student.percentComplete}%</span>
        </div>
      </div>
      <div className="flex flex-col items-end gap-2">
        <span className="text-xs text-fg-subtle">
          {t("lastActive", { date: dateLabel(student.lastActivityAt, SHORT_DATE) })}
        </span>
        <Button variant="secondary" size="sm" icon={<Icon icon={MessageSquare} size="sm" />}>
          {t("message")}
        </Button>
      </div>
    </article>
  );
}

"use client";

import { useDateLabel } from "@/features/learning/hooks/useDateLabel";
import { CalendarPlus, Check, Circle, CircleDot, type LucideIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { STUDY_SESSIONS } from "@/entities/learning/library.fixtures";
import {
  STUDY_SESSION_STATES,
  type StudySession,
  type StudySessionState,
} from "@/entities/learning/library.types";
import { Button } from "@/ui/primitives/Button";
import { cn } from "@/ui/lib/cn";
import { EmptyState } from "@/ui/feedback/EmptyState";
import { Icon } from "@/ui/primitives/Icon";
import { WEEKDAY_DATE } from "../shared/learning.format";
import { PageHeading } from "../shell/PageHeading";

const STATE_ICONS: Record<StudySessionState, LucideIcon> = {
  [STUDY_SESSION_STATES.DONE]: Check,
  [STUDY_SESSION_STATES.TODAY]: CircleDot,
  [STUDY_SESSION_STATES.PLANNED]: Circle,
};

const STATE_TONES: Record<StudySessionState, string> = {
  [STUDY_SESSION_STATES.DONE]: "border-success bg-success-subtle text-success",
  [STUDY_SESSION_STATES.TODAY]: "border-brand bg-info-subtle text-fg-brand",
  [STUDY_SESSION_STATES.PLANNED]: "border-border bg-surface text-fg-subtle",
};

export function StudyPlanPage() {
  const t = useTranslations("learning.studyPlanPage");
  const sessions = STUDY_SESSIONS;
  const total = sessions.reduce((sum, session) => sum + session.minutes, 0);

  return (
    <div className="flex flex-col gap-4">
      <PageHeading
        title={t("title")}
        description={t("description")}
        actions={
          <Button variant="secondary" icon={<Icon icon={CalendarPlus} size="md" />}>
            {t("addSession")}
          </Button>
        }
      />

      <p className="text-sm text-fg-muted">{t("weekTotal", { count: total })}</p>

      {sessions.length === 0 ? (
        <EmptyState icon={CalendarPlus} title={t("emptyTitle")} description={t("emptyDescription")} />
      ) : (
        <ul className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
          {sessions.map((session) => (
            <li key={session.id}>
              <SessionCard session={session} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function SessionCard({ session }: { session: StudySession }) {
  const t = useTranslations("learning.studyPlanPage");
  const tStates = useTranslations("learning.studySessionStates");
  const dateLabel = useDateLabel();

  return (
    <article className={cn("flex h-full flex-col gap-2 rounded-card border p-4", STATE_TONES[session.state])}>
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs font-medium">{dateLabel(session.date, WEEKDAY_DATE)}</span>
        <Icon icon={STATE_ICONS[session.state]} size="sm" />
      </div>
      <p className="text-sm font-semibold text-fg">{session.focus}</p>
      <p className="text-xs text-fg-muted">{session.courseTitle}</p>
      <p className="mt-auto flex items-center justify-between gap-2 text-xs">
        <span className="text-fg-muted">{t("minutes", { count: session.minutes })}</span>
        <span>{tStates(session.state)}</span>
      </p>
    </article>
  );
}

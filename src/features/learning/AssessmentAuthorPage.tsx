"use client";

import { Clock, Eye, Minus, Plus, Target, TriangleAlert, Upload, type LucideIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { ASSESSMENT_DRAFT, QUESTION_BANK } from "@/entities/learning/studio.fixtures";
import type { Question, QuestionRevision } from "@/entities/learning/studio.types";
import { Button } from "@/ui/Button";
import { EmptyState } from "@/ui/EmptyState";
import { Icon } from "@/ui/Icon";

type BankEntry = { question: Question; revision: QuestionRevision };

const BANK: readonly BankEntry[] = QUESTION_BANK.flatMap((question) =>
  question.revisions.map((revision) => ({ question, revision })),
);

/**
 * M17 — assembling a quiz. It picks *revisions*, not questions: a grade has to be able to name the
 * exact wording it was produced against (BR-05), and publishing freezes everything cited here.
 */
export function AssessmentAuthorPage() {
  const t = useTranslations("learning.studio.assessmentAuthor");
  const draft = ASSESSMENT_DRAFT;
  const [selectedIds, setSelectedIds] = useState<readonly string[]>(draft.selectedRevisionIds);

  const selected = selectedIds
    .map((id) => BANK.find((entry) => entry.revision.id === id))
    .filter((entry): entry is BankEntry => entry !== undefined);
  const available = BANK.filter((entry) => !selectedIds.includes(entry.revision.id));
  const points = selected.reduce((total, entry) => total + entry.question.points, 0);

  return (
    <div className="flex flex-col gap-4">
      <header className="flex flex-wrap items-start justify-between gap-3">
        <div className="max-w-2xl">
          <p className="text-xs text-fg-subtle">{draft.courseTitle}</p>
          <h1 className="mt-1 text-2xl font-semibold text-fg">{draft.title}</h1>
          <p className="mt-1 text-sm text-fg-muted">{t("description")}</p>
        </div>
        <Button icon={<Icon icon={Upload} size="md" />}>{t("publish")}</Button>
      </header>

      {draft.isPolicyUnversioned ? (
        <div className="flex items-start gap-2 rounded-card border border-warning bg-warning-subtle p-3">
          <Icon icon={TriangleAlert} size="md" className="mt-0.5 text-warning" />
          <div>
            <p className="text-sm font-medium text-warning">{t("unversionedTitle")}</p>
            <p className="mt-0.5 text-xs text-fg-muted">{t("unversionedNote")}</p>
          </div>
        </div>
      ) : null}

      <div className="grid gap-4 lg:grid-cols-[1fr_20rem]">
        <section className="flex flex-col gap-3 rounded-card border border-border bg-surface p-5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 className="text-base font-semibold text-fg">{t("selectedTitle")}</h2>
            <span className="text-xs text-fg-muted">{t("summary", { count: selected.length, points })}</span>
          </div>

          {selected.length === 0 ? (
            <EmptyState
              icon={Target}
              title={t("emptySelectionTitle")}
              description={t("emptySelectionDescription")}
            />
          ) : (
            <ol className="flex flex-col gap-2">
              {selected.map((entry, index) => (
                <li key={entry.revision.id}>
                  <EntryRow
                    entry={entry}
                    position={index + 1}
                    actionLabel={t("remove")}
                    actionIcon={Minus}
                    onAction={() => setSelectedIds((ids) => ids.filter((id) => id !== entry.revision.id))}
                  />
                </li>
              ))}
            </ol>
          )}
        </section>

        <aside className="flex flex-col gap-4">
          <section className="rounded-card border border-border bg-surface p-4">
            <h2 className="text-sm font-semibold text-fg">{t("availableTitle")}</h2>
            <ul className="mt-3 flex flex-col gap-2">
              {available.map((entry) => (
                <li key={entry.revision.id}>
                  <EntryRow
                    entry={entry}
                    actionLabel={t("add")}
                    actionIcon={Plus}
                    onAction={() => setSelectedIds((ids) => [...ids, entry.revision.id])}
                  />
                </li>
              ))}
            </ul>
          </section>

          <PolicyPanel />
        </aside>
      </div>
    </div>
  );
}

function EntryRow({
  entry,
  position,
  actionLabel,
  actionIcon,
  onAction,
}: {
  entry: BankEntry;
  position?: number;
  actionLabel: string;
  actionIcon: LucideIcon;
  onAction: () => void;
}) {
  const t = useTranslations("learning.studio.assessmentAuthor");
  return (
    <div className="flex items-start gap-2 rounded-control border border-border px-3 py-2">
      {position === undefined ? null : (
        <span className="grid size-6 shrink-0 place-items-center rounded-control bg-surface-sunken text-xs text-fg-muted">
          {position}
        </span>
      )}
      <span className="min-w-0 flex-1">
        <span className="block text-sm text-fg">{entry.question.prompt}</span>
        <span className="block text-xs text-fg-subtle">
          {t("revisionOf", { number: entry.revision.number })}
        </span>
      </span>
      <button
        type="button"
        onClick={onAction}
        aria-label={actionLabel}
        className="grid size-7 shrink-0 place-items-center rounded-control border border-border text-fg-muted hover:bg-surface-hover hover:text-fg"
      >
        <Icon icon={actionIcon} size="sm" />
      </button>
    </div>
  );
}

function PolicyPanel() {
  const t = useTranslations("learning.studio.assessmentAuthor");
  const tRules = useTranslations("learning.gradingRules");
  const tReveal = useTranslations("learning.revealPolicies");
  const tStart = useTranslations("learning.attemptStart");
  const policy = ASSESSMENT_DRAFT.policy;

  return (
    <section className="rounded-card border border-border bg-surface p-4">
      <h2 className="text-sm font-semibold text-fg">{t("policyTitle")}</h2>
      <dl className="mt-3 flex flex-col gap-2 text-sm">
        <Row
          icon={Clock}
          term={tStart("timeLimit")}
          value={tStart("timeLimitValue", { count: policy.timeLimitMinutes })}
        />
        <Row
          icon={Target}
          term={tStart("passScore")}
          value={tStart("passScoreValue", { score: policy.passScore })}
        />
        <Row icon={Eye} term={tStart("gradingRule")} value={tRules(policy.gradingRule)} />
        <Row icon={Eye} term={tStart("revealPolicy")} value={tReveal(policy.revealPolicy)} />
      </dl>
    </section>
  );
}

function Row({ icon, term, value }: { icon: LucideIcon; term: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-3 border-b border-border pb-2 last:border-b-0 last:pb-0">
      <dt className="flex items-center gap-2 text-fg-muted">
        <Icon icon={icon} size="sm" className="text-fg-subtle" />
        {term}
      </dt>
      <dd className="text-right text-fg">{value}</dd>
    </div>
  );
}

"use client";

import { Lock, Pencil, Plus, Search } from "@/ui/icons/lucide";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { QUESTION_BANK } from "@/entities/learning/studio.fixtures";
import type { Question } from "@/entities/learning/studio.types";
import { Badge } from "@astryxdesign/core/Badge";
import { Button } from "@astryxdesign/core/Button";
import { EmptyState } from "@astryxdesign/core/EmptyState";
import { Icon } from "@astryxdesign/core/Icon";
import { TextInput } from "@astryxdesign/core/TextInput";
import { frozenTone, LANGUAGE_TONES } from "../shared/learning.tones";

/**
 * M16 — the question bank. The interesting state is the frozen revision: an assessment cites a
 * revision, and editing it would change what already-graded attempts were marked against (BR-05),
 * so the screen offers a new revision instead of an edit.
 */
export function QuestionBankPage() {
  const t = useTranslations("learning.studio.questionBank");
  const [search, setSearch] = useState("");

  const questions = QUESTION_BANK.filter((question) =>
    question.prompt.toLowerCase().includes(search.trim().toLowerCase()),
  );

  return (
    <div className="flex flex-col gap-4">
      <header className="flex flex-wrap items-start justify-between gap-3">
        <div className="max-w-2xl">
          <h1 className="text-2xl font-semibold text-fg">{t("title")}</h1>
          <p className="mt-1 text-sm text-fg-muted">{t("description")}</p>
        </div>
        <Button variant="primary" icon={<Icon icon={Plus} size="sm" />} label={t("newQuestion")} />
      </header>

      <TextInput
        label={t("searchLabel")}
        isLabelHidden
        type="search"
        startIcon={Search}
        value={search}
        onChange={setSearch}
        placeholder={t("searchPlaceholder")}
        width="28rem"
      />

      {questions.length === 0 ? (
        <EmptyState
          icon={<Icon icon={Search} size="lg" />}
          title={t("emptyTitle")}
          description={t("emptyDescription")}
        />
      ) : (
        <ul className="flex flex-col gap-3">
          {questions.map((question) => (
            <li key={question.id}>
              <QuestionRow question={question} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function QuestionRow({ question }: { question: Question }) {
  const t = useTranslations("learning.studio.questionBank");
  const tKinds = useTranslations("learning.questionKinds");
  const tDifficulties = useTranslations("learning.questionDifficulties");
  const tLanguages = useTranslations("learning.languages");

  const latest = question.revisions[question.revisions.length - 1];
  const isFrozen = latest?.isFrozen ?? false;

  return (
    <article className="flex flex-col gap-3 rounded-card border border-border bg-surface p-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <p className="min-w-0 flex-1 text-sm font-medium text-fg">{question.prompt}</p>
        <div className="flex shrink-0 flex-wrap items-center gap-2">
          <Badge label={tKinds(question.kind)} />
          <Badge label={tDifficulties(question.difficulty)} />
          <Badge variant={LANGUAGE_TONES[question.language]} label={tLanguages(question.language)} />
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3 text-xs text-fg-muted">
        <span>{t("points", { count: question.points })}</span>
        <span>{t("revisionCount", { count: question.revisions.length })}</span>
        {latest ? <span>{t("latestRevision", { number: latest.number })}</span> : null}
        {isFrozen ? (
          <Badge variant={frozenTone(isFrozen)} icon={<Icon icon={Lock} size="xsm" />} label={t("frozen")} />
        ) : null}
      </div>

      <p className="text-xs text-fg-subtle">
        {isFrozen && latest ? t("frozenNote", { assessments: latest.usedBy.join(", ") }) : t("notUsed")}
      </p>

      <div className="flex flex-wrap gap-2">
        {/* A frozen revision is not editable, so the action changes rather than disappearing. */}
        {isFrozen ? (
          <Button
            variant="secondary"
            size="sm"
            icon={<Icon icon={Plus} size="sm" />}
            label={t("newRevision")}
          />
        ) : (
          <Button variant="secondary" size="sm" icon={<Icon icon={Pencil} size="sm" />} label={t("edit")} />
        )}
      </div>
    </article>
  );
}

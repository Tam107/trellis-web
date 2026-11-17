"use client";

import { ChevronRight, FileText } from "lucide-react";
import { useFormatter, useTranslations } from "next-intl";
import { LEARNER_NOTES } from "@/entities/learning/library.fixtures";
import { Link } from "@/i18n/navigation";
import { ROUTES } from "@/shared/constants/routes";
import { EmptyState } from "@/ui/EmptyState";
import { Icon } from "@/ui/Icon";
import { Prose } from "@/ui/Prose";
import { SHORT_DATE } from "./learning.format";
import { PageHeading } from "./PageHeading";

export function NotesPage() {
  const t = useTranslations("learning.notesPage");
  const format = useFormatter();
  const notes = LEARNER_NOTES;

  return (
    <div className="flex flex-col gap-4">
      <PageHeading title={t("title")} description={t("description")} />

      {notes.length === 0 ? (
        <EmptyState icon={FileText} title={t("emptyTitle")} description={t("emptyDescription")} />
      ) : (
        <ul className="flex flex-col gap-3">
          {notes.map((note) => (
            <li key={note.id}>
              <article className="rounded-card border border-border bg-surface p-5">
                <header className="flex flex-wrap items-start justify-between gap-2">
                  <div className="min-w-0">
                    <h2 className="text-sm font-semibold text-fg">{note.lessonTitle}</h2>
                    <p className="text-xs text-fg-muted">{note.courseTitle}</p>
                  </div>
                  <span className="text-xs text-fg-subtle">
                    {t("updated", { date: format.dateTime(new Date(note.updatedAt), SHORT_DATE) })}
                  </span>
                </header>
                <Prose className="mt-3 text-sm">
                  <ul>
                    {note.body.map((line) => (
                      <li key={line}>{line}</li>
                    ))}
                  </ul>
                </Prose>
                <Link
                  href={ROUTES.learnCourse("english-everyday-communication")}
                  className="mt-3 inline-flex items-center gap-1 text-sm text-fg-brand hover:text-brand-hover"
                >
                  {t("openLesson")}
                  <Icon icon={ChevronRight} size="sm" />
                </Link>
              </article>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

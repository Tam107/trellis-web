"use client";

import { ArrowRight, CalendarClock, ChevronRight, LayoutGrid } from "lucide-react";
import { useFormatter, useTranslations } from "next-intl";
import { MY_COURSES } from "@/entities/learning/course.fixtures";
import { type MyCourseRow } from "@/entities/learning/course.types";
import { Link } from "@/i18n/navigation";
import { ROUTES } from "@/shared/constants/routes";
import { Badge } from "@/ui/Badge";
import { Button } from "@/ui/Button";
import { EmptyState } from "@/ui/EmptyState";
import { Icon } from "@/ui/Icon";
import { ProgressBar } from "@/ui/ProgressBar";
import { CourseArtwork } from "./CourseArtwork";
import { SHORT_DATE } from "./learning.format";
import { LANGUAGE_TONES } from "./learning.tones";

/** M3 — everything the learner is enrolled in. */
export function MyCoursesPage() {
  const t = useTranslations("learning.myCourses");
  const courses = MY_COURSES;

  return (
    <div className="flex flex-col gap-4">
      <header>
        <h1 className="text-2xl font-semibold text-fg">{t("title")}</h1>
        <p className="mt-1 text-sm text-fg-muted">{t("description")}</p>
      </header>

      {courses.length === 0 ? (
        <EmptyState
          icon={LayoutGrid}
          title={t("emptyTitle")}
          description={t("emptyDescription")}
          action={
            <Button asChild>
              <Link href={ROUTES.catalog}>
                {t("emptyAction")}
                <Icon icon={ArrowRight} size="md" />
              </Link>
            </Button>
          }
        />
      ) : (
        <ul className="flex flex-col gap-3">
          {courses.map((course) => (
            <li key={course.slug}>
              <CourseRow course={course} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function CourseRow({ course }: { course: MyCourseRow }) {
  const t = useTranslations("learning.myCourses");
  const tLanguages = useTranslations("learning.languages");
  const format = useFormatter();
  const isStarted = course.percentComplete > 0;

  return (
    <article className="flex flex-wrap items-center gap-4 rounded-card border border-border bg-surface p-4">
      <CourseArtwork art={course.art} title={course.title} className="size-16 shrink-0 rounded-control" />
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <h2 className="text-sm font-semibold text-fg">{course.title}</h2>
          <Badge tone={LANGUAGE_TONES[course.language]} size="sm">
            {tLanguages(course.language)}
          </Badge>
          {/* Pinned version, because a newer one may already be published (BR-19). */}
          <Badge size="sm">{t("pinnedVersion", { version: course.pinnedVersion })}</Badge>
        </div>
        <p className="mt-1 flex flex-wrap items-center gap-3 text-xs text-fg-muted">
          <span>
            {isStarted
              ? t("lastActivity", {
                  date: format.dateTime(new Date(course.lastActivityAt), SHORT_DATE),
                })
              : t("notStarted")}
          </span>
          {course.dueAt ? (
            <span className="flex items-center gap-1 text-warning">
              <Icon icon={CalendarClock} size="sm" />
              {t("dueAt", { date: format.dateTime(new Date(course.dueAt), SHORT_DATE) })}
            </span>
          ) : null}
        </p>
        <div className="mt-2 flex items-center gap-2">
          <ProgressBar size="sm" value={course.percentComplete} label={course.title} />
          <span className="shrink-0 text-xs text-fg-muted">{course.percentComplete}%</span>
        </div>
      </div>
      <Button asChild variant={isStarted ? "secondary" : "primary"} size="sm">
        <Link href={ROUTES.learnCourse(course.slug)}>
          {isStarted ? t("continueAction") : t("startAction")}
          <Icon icon={ChevronRight} size="sm" />
        </Link>
      </Button>
    </article>
  );
}

"use client";

import { ChevronRight, Layers, Plus, Users } from "lucide-react";
import { useFormatter, useTranslations } from "next-intl";
import { STUDIO_COURSES } from "@/entities/learning/studio.fixtures";
import type { StudioCourseRow } from "@/entities/learning/studio.types";
import { Link } from "@/i18n/navigation";
import { ROUTES } from "@/shared/constants/routes";
import { Badge } from "@/ui/Badge";
import { Button } from "@/ui/Button";
import { EmptyState } from "@/ui/EmptyState";
import { Icon } from "@/ui/Icon";
import { CourseArtwork } from "./CourseArtwork";
import { SHORT_DATE } from "./learning.format";
import { LANGUAGE_TONES, PUBLISH_TONES } from "./learning.tones";

/** M10 — what an instructor owns. The entry point the studio never had. */
export function StudioCoursesPage() {
  const t = useTranslations("learning.studio.home");
  const courses = STUDIO_COURSES;

  return (
    <div className="flex flex-col gap-4">
      <header className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold text-fg">{t("title")}</h1>
          <p className="mt-1 text-sm text-fg-muted">{t("description")}</p>
        </div>
        <Button asChild icon={<Icon icon={Plus} size="md" />}>
          <Link href={ROUTES.studioNewCourse}>{t("newCourse")}</Link>
        </Button>
      </header>

      {courses.length === 0 ? (
        <EmptyState
          icon={Layers}
          title={t("emptyTitle")}
          description={t("emptyDescription")}
          action={
            <Button asChild>
              <Link href={ROUTES.studioNewCourse}>{t("newCourse")}</Link>
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

function CourseRow({ course }: { course: StudioCourseRow }) {
  const t = useTranslations("learning.studio.home");
  const tLanguages = useTranslations("learning.languages");
  const tStates = useTranslations("learning.studio.publishStates");
  const format = useFormatter();

  return (
    <article className="flex flex-wrap items-center gap-4 rounded-card border border-border bg-surface p-4">
      <CourseArtwork art={course.art} title={course.title} className="size-14 shrink-0 rounded-control" />
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <h2 className="text-sm font-semibold text-fg">{course.title}</h2>
          <Badge tone={PUBLISH_TONES[course.publishState]} size="sm">
            {tStates(course.publishState)}
          </Badge>
          <Badge tone={LANGUAGE_TONES[course.language]} size="sm">
            {tLanguages(course.language)}
          </Badge>
        </div>
        <p className="mt-1 flex flex-wrap items-center gap-3 text-xs text-fg-muted">
          <span>{t("versions", { count: course.versionCount })}</span>
          <span className="flex items-center gap-1">
            <Icon icon={Users} size="sm" />
            {t("learners", { count: course.learnerCount })}
          </span>
          <span>{t("updated", { date: format.dateTime(new Date(course.updatedAt), SHORT_DATE) })}</span>
        </p>
      </div>
      <Button asChild variant="secondary" size="sm">
        <Link href={ROUTES.studioCourse(course.slug)}>
          {t("open")}
          <Icon icon={ChevronRight} size="sm" />
        </Link>
      </Button>
    </article>
  );
}

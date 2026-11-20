"use client";

import { BookOpen, CalendarDays, Clock3, Signal, Star, Users } from "@/ui/icons/lucide";
import type { LucideIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import type { CatalogCourse } from "@/entities/marketing/marketing.types";
import { CourseThumbnail } from "@/features/learning/shared/CourseThumbnail";
import { LANGUAGE_TONES } from "@/features/learning/shared/learning.tones";
import { useDurationLabel } from "@/features/learning/hooks/useDurationLabel";
import { Link } from "@/i18n/navigation";
import { ROUTES } from "@/shared/constants/routes";
import { Badge } from "@astryxdesign/core/Badge";
import { cn } from "@/ui/lib/cn";
import { Icon } from "@astryxdesign/core/Icon";
import { BESTSELLER_TONE } from "../shared/marketing.tones";

function initialsOf(name: string): string {
  return name
    .split(/\s+/)
    .map((word) => word.charAt(0))
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

/**
 * A course in a shelf, with everything a learner compares before opening it: who teaches it, a
 * summary, rating and audience size, and the numbers that say how big a commitment it is
 * (lessons, hours, level, weeks). Taller than `CourseCard` on purpose; the shelf has the room.
 */
export function DetailedCourseCard({ course }: { course: CatalogCourse }) {
  const t = useTranslations("marketing.card");
  const tLevels = useTranslations("learning.levels");
  const tLanguages = useTranslations("learning.languages");
  const tUnits = useTranslations("learning.units");
  const durationLabel = useDurationLabel();

  const facts: readonly { icon: LucideIcon; label: string }[] = [
    { icon: BookOpen, label: tUnits("lessonCount", { count: course.lessonCount }) },
    { icon: Clock3, label: durationLabel(course.durationMinutes) },
    { icon: Signal, label: tLevels(course.level) },
    { icon: CalendarDays, label: t("weeksCount", { count: course.weeks }) },
  ];

  return (
    <Link
      href={ROUTES.catalogCourse(course.slug)}
      className="group flex h-full flex-col overflow-hidden rounded-card border border-border bg-surface transition-[translate,border-color] duration-normal ease-standard hover:-translate-y-1 hover:border-border-strong"
    >
      <CourseThumbnail
        art={course.art}
        title={course.title}
        hook={course.thumbnailHook}
        durationMinutes={course.durationMinutes}
        className="rounded-none"
      />

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant={LANGUAGE_TONES[course.language]} label={tLanguages(course.language)} />
          {course.isBestseller ? <Badge variant={BESTSELLER_TONE} label={t("bestseller")} /> : null}
        </div>

        <h3 className="line-clamp-2 text-lg leading-snug font-semibold text-fg transition-colors duration-fast ease-standard group-hover:text-fg-brand">
          {course.title}
        </h3>

        <p className="flex items-center gap-2 text-sm text-fg-muted">
          <span
            aria-hidden
            className="grid size-7 shrink-0 place-items-center rounded-full bg-info-subtle text-xs font-bold text-fg-brand"
          >
            {initialsOf(course.instructor)}
          </span>
          {t("taughtBy", { name: course.instructor })}
        </p>

        <p className="line-clamp-3 text-sm leading-relaxed text-fg-muted">{course.summary}</p>

        <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
          <span className="flex items-center gap-1 font-semibold text-warning">
            <Icon icon={Star} size="sm" className="fill-current" />
            {course.rating}
            <span className="font-normal text-fg-subtle">
              {t("ratingCount", { count: course.ratingCount })}
            </span>
          </span>
          <span className="flex items-center gap-1 text-fg-muted">
            <Icon icon={Users} size="sm" />
            {t("learnersCount", { count: course.learners })}
          </span>
        </p>

        <ul className={cn("mt-auto grid grid-cols-2 gap-x-4 gap-y-2.5 border-t border-border pt-4")}>
          {facts.map(({ icon, label }) => (
            <li key={label} className="flex min-w-0 items-center gap-2 text-sm text-fg-muted">
              <Icon icon={icon} size="sm" className="text-fg-subtle" />
              <span className="truncate">{label}</span>
            </li>
          ))}
        </ul>

        <span className="inline-flex h-10 items-center justify-center rounded-control bg-brand text-sm font-medium text-on-brand transition-colors duration-fast ease-standard group-hover:bg-brand-hover">
          {t("viewCourse")}
        </span>
      </div>
    </Link>
  );
}

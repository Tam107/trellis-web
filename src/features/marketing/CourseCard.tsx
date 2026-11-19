import { Star } from "lucide-react";
import { useTranslations } from "next-intl";
import type { FeaturedCourse } from "@/entities/marketing/marketing.types";
import { Link } from "@/i18n/navigation";
import { ROUTES } from "@/shared/constants/routes";
import { Badge } from "@/ui/Badge";
import { Icon } from "@/ui/Icon";
import { CourseThumbnail } from "@/features/learning/CourseThumbnail";
import { BESTSELLER_TONE } from "./marketing.tones";

/** `Ms Chen` -> `MC`: the avatar stands in for a teacher photo the mock does not have. */
function initialsOf(name: string): string {
  return name
    .split(/\s+/)
    .map((word) => word.charAt(0))
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

/**
 * One course in a grid, laid out like a video in a feed: a frameless thumbnail, then the teacher's
 * avatar beside the title, the teacher, and the rating with the course length.
 *
 * There is no card box: on a grid of photos the thumbnails already make the rhythm, and a frame
 * around each would double every edge.
 */
export function CourseCard({
  course,
  hasQuickView = false,
}: {
  course: FeaturedCourse;
  /** Opens a summary over the card after the pointer rests on it (a feed, not a plain grid). */
  hasQuickView?: boolean;
}) {
  const t = useTranslations("marketing.card");
  const tLevels = useTranslations("learning.levels");

  return (
    <Link
      href={ROUTES.catalogCourse(course.slug)}
      className="group relative flex h-full flex-col gap-3 rounded-card"
    >
      <CourseThumbnail
        art={course.art}
        title={course.title}
        hook={course.thumbnailHook}
        durationMinutes={course.durationMinutes}
        className="transition-[border-radius] duration-normal ease-standard group-hover:rounded-control"
      />

      <div className="flex gap-3">
        <span
          aria-hidden
          className="grid size-9 shrink-0 place-items-center rounded-full bg-info-subtle text-xs font-bold text-fg-brand"
        >
          {initialsOf(course.instructor)}
        </span>
        <div className="flex min-w-0 flex-col gap-0.5">
          <h3 className="line-clamp-2 text-base leading-snug font-semibold text-fg transition-colors duration-fast ease-standard group-hover:text-fg-brand">
            {course.title}
          </h3>
          <p className="text-sm text-fg-muted">{course.instructor}</p>
          <p className="flex flex-wrap items-center gap-x-1.5 text-sm text-fg-muted">
            <span className="flex items-center gap-1 font-semibold text-warning">
              <Icon icon={Star} size="sm" className="fill-current" />
              {course.rating}
            </span>
            <span className="text-fg-subtle">{t("ratingCount", { count: course.ratingCount })}</span>
          </p>
          <p className="text-xs text-fg-subtle">
            {t("meta", { level: tLevels(course.level), weeks: course.weeks })}
          </p>
          {course.isBestseller ? (
            <Badge tone={BESTSELLER_TONE} className="mt-1.5 self-start">
              {t("bestseller")}
            </Badge>
          ) : null}
        </div>
      </div>
      {hasQuickView ? <QuickView course={course} /> : null}
    </Link>
  );
}

/**
 * The summary that covers a card on hover-intent. It sits inside the card, not beside it, because
 * a shelf scrolls and would clip anything that hangs outside. It repeats what the card links to,
 * so it is hidden from assistive tech, and it only appears where a pointer can hover.
 */
function QuickView({ course }: { course: FeaturedCourse }) {
  const t = useTranslations("home.shelf");
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 hidden flex-col justify-between gap-3 rounded-card border border-border bg-surface p-4 opacity-0 shadow-raised transition-opacity duration-normal ease-standard group-hover:opacity-100 group-hover:delay-slow [@media(hover:hover)]:flex"
    >
      <div>
        <p className="text-base font-semibold text-fg">{course.title}</p>
        <p className="mt-1 text-xs text-fg-subtle">{course.instructor}</p>
        <p className="mt-3 text-sm leading-relaxed text-fg-muted">{course.summary}</p>
        <p className="mt-3 text-xs font-medium text-fg-muted">
          {t("quickLessons", { count: course.lessonCount })}
        </p>
      </div>
      <span className="inline-flex h-10 items-center justify-center rounded-control bg-brand text-sm font-medium text-on-brand">
        {t("quickCta")}
      </span>
    </div>
  );
}

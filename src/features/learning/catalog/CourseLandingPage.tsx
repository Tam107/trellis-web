"use client";

import { useDateLabel } from "@/features/learning/hooks/useDateLabel";
import {
  ArrowRight,
  Award,
  CalendarDays,
  Check,
  ChevronDown,
  ChevronRight,
  Clock3,
  Download,
  Layers3,
  LockKeyhole,
  MonitorSmartphone,
  PlayCircle,
  Signal,
  Star,
  Users,
  type LucideIcon,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { useState, type ReactNode } from "react";

import type { CourseEdition } from "@/entities/learning/course.types";
import { ENROLMENT_STATES, type EnrolmentPolicy } from "@/entities/learning/learning.constants";
import type { CourseLandingDetail } from "@/entities/marketing/courseDetail.types";
import { BESTSELLER_TONE } from "@/features/marketing/shared/marketing.tones";
import { Link } from "@/i18n/navigation";
import { ROUTES } from "@/shared/constants/routes";
import { Badge } from "@/ui/Badge";
import { Button } from "@/ui/Button";
import { Card } from "@/ui/Card";
import { cn } from "@/ui/cn";
import { Container } from "@/ui/Container";
import { Icon } from "@/ui/Icon";
import { EnrolDialog } from "./EnrolDialog";
import { CourseThumbnail } from "../shared/CourseThumbnail";
import { editionTone, ENROLLED_TONE, LANGUAGE_TONES } from "../shared/learning.tones";
import { MONTH_YEAR } from "@/features/learning/shared/learning.format";
import { useDurationLabel } from "@/features/learning/hooks/useDurationLabel";

/** The hero's enrol column on desktop, full width on a phone. */
const PREVIEW_SIZES = "(min-width: 1024px) 24rem, 100vw";

const SECTION_IDS = {
  overview: "overview",
  curriculum: "curriculum",
  instructor: "instructor",
  faq: "faq",
} as const;

/** The hero is tinted like `info-subtle`, so a badge of that tone needs a solid white behind it. */
const HERO_BADGE_CLASSES = "bg-surface";

const FAQ_KEYS = ["faqCertificate", "faqAccess", "faqLevel"] as const;
const STARS = [1, 2, 3, 4, 5];

const ARROW_CLASSES = "transition-transform duration-normal ease-emphasized group-hover:translate-x-0.5";

/** Same underline motion as the header nav, so the two rows of links behave alike. */
const TAB_CLASSES =
  "relative py-3.5 text-sm font-medium whitespace-nowrap text-fg-muted transition-colors duration-fast ease-standard after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:origin-center after:scale-x-0 after:bg-brand after:transition-transform after:duration-normal after:ease-emphasized hover:text-fg hover:after:scale-x-100";

function initialsOf(name: string): string {
  return name
    .split(/\s+/)
    .map((word) => word.charAt(0))
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

/**
 * Public course page: a tinted hero with the enrol card beside it, a sticky section nav, then the
 * overview, the outline, the instructor and the questions, with the editions in a rail.
 *
 * - Displays only public course metadata and lesson titles (D-12).
 * - Enrolment is tied to a specific immutable course edition (D-05).
 */
export function CourseLandingPage({ course }: { course: CourseLandingDetail }) {
  const t = useTranslations("learning.landing");
  const tCard = useTranslations("marketing.card");
  const tNav = useTranslations("home.nav");
  const tLanguages = useTranslations("learning.languages");
  const tLevels = useTranslations("learning.levels");
  const tUnits = useTranslations("learning.units");
  const tPolicies = useTranslations("learning.enrolmentPolicies");
  const dateLabel = useDateLabel();
  const durationLabel = useDurationLabel();

  const [enrolment, setEnrolment] = useState(course.enrolment);
  const [editionInDialog, setEditionInDialog] = useState<CourseEdition | null>(null);
  const isEnrolled = enrolment === ENROLMENT_STATES.ENROLLED;
  const firstOpenEdition = course.editions.find((edition) => edition.isOpen);
  const moduleCount = course.modules.length;

  const includes: readonly { icon: LucideIcon; label: string }[] = [
    { icon: Clock3, label: t("includesVideo", { duration: durationLabel(course.durationMinutes) }) },
    { icon: Layers3, label: tUnits("lessonCount", { count: course.lessonCount }) },
    { icon: Download, label: t("includesResources", { count: course.resourceCount }) },
    { icon: Award, label: t("includesCertificate") },
    { icon: MonitorSmartphone, label: t("includesAccess") },
  ];

  const primaryAction = isEnrolled ? (
    <Button asChild size="lg" className="group w-full">
      <Link href={ROUTES.learnCourse(course.slug)}>
        {t("continueCourse")}
        <Icon icon={ArrowRight} size="md" className={ARROW_CLASSES} />
      </Link>
    </Button>
  ) : (
    <Button
      size="lg"
      className="group w-full"
      disabled={!firstOpenEdition}
      onClick={() => {
        if (firstOpenEdition) setEditionInDialog(firstOpenEdition);
      }}
    >
      {firstOpenEdition ? t("enrol") : t("noOpenEditionTitle")}
      {firstOpenEdition ? <Icon icon={ArrowRight} size="md" className={ARROW_CLASSES} /> : null}
    </Button>
  );

  return (
    <main>
      <section aria-labelledby="course-title" className="bg-info-subtle">
        <Container className="grid items-start gap-10 py-12 lg:grid-cols-[minmax(0,1fr)_24rem] lg:gap-16 lg:py-16">
          <div className="min-w-0">
            <nav aria-label={t("breadcrumbLabel")} className="flex animate-rise items-center gap-1.5 text-sm">
              <Link href={ROUTES.courses} className="font-semibold text-fg-brand hover:text-brand-hover">
                {tNav("courses")}
              </Link>
              <Icon icon={ChevronRight} size="sm" className="text-fg-subtle" />
              <span className="text-fg-muted">{tLanguages(course.language)}</span>
            </nav>

            <div className="mt-4 flex animate-rise flex-wrap items-center gap-2 stagger-1">
              <Badge tone={LANGUAGE_TONES[course.language]} className={HERO_BADGE_CLASSES}>
                {tLanguages(course.language)}
              </Badge>
              {course.isBestseller ? (
                <Badge tone={BESTSELLER_TONE} className={HERO_BADGE_CLASSES}>
                  {tCard("bestseller")}
                </Badge>
              ) : null}
            </div>

            <h1
              id="course-title"
              className="mt-4 max-w-3xl animate-rise text-4xl leading-tight font-bold tracking-tight text-balance text-fg stagger-1 md:text-5xl"
            >
              {course.title}
            </h1>
            <p className="mt-5 max-w-2xl animate-rise text-lg leading-relaxed text-fg-muted stagger-2">
              {course.summary}
            </p>

            <div className="mt-6 flex animate-rise flex-wrap items-center gap-x-5 gap-y-2 text-sm stagger-3">
              <span className="flex items-center gap-1.5 font-semibold text-warning">
                {course.rating}
                <span
                  aria-label={t("ratedLabel", { rating: course.rating })}
                  className="flex items-center gap-0.5"
                >
                  {STARS.map((star) => (
                    <Icon
                      key={star}
                      icon={Star}
                      size="sm"
                      className={star <= Math.round(course.rating) ? "fill-current" : "text-fg-subtle"}
                    />
                  ))}
                </span>
                <span className="font-normal text-fg-muted">
                  {tCard("ratingCount", { count: course.ratingCount })}
                </span>
              </span>
              <span className="flex items-center gap-1.5 text-fg-muted">
                <Icon icon={Users} size="sm" />
                {tCard("learnersCount", { count: course.learners })}
              </span>
              <span className="text-fg-muted">
                {t("updated", { date: dateLabel(course.updatedAt, MONTH_YEAR) })}
              </span>
            </div>

            <p className="mt-4 flex animate-rise items-center gap-2.5 text-sm text-fg-muted stagger-3">
              <span
                aria-hidden
                className="grid size-8 place-items-center rounded-full bg-surface text-xs font-bold text-fg-brand"
              >
                {initialsOf(course.instructor.name)}
              </span>
              {tCard("taughtBy", { name: course.instructor.name })}
            </p>

            <ul className="mt-6 flex animate-rise flex-wrap items-center gap-x-5 gap-y-2 text-sm text-fg-muted stagger-4">
              <Fact icon={Signal}>{tLevels(course.level)}</Fact>
              <Fact icon={Layers3}>{tUnits("lessonCount", { count: course.lessonCount })}</Fact>
              <Fact icon={Clock3}>{durationLabel(course.durationMinutes)}</Fact>
              <Fact icon={CalendarDays}>{tCard("weeksCount", { count: course.weeks })}</Fact>
              {isEnrolled ? (
                <li>
                  <Badge tone={ENROLLED_TONE} icon={<Icon icon={Check} size="sm" />}>
                    {t("alreadyEnrolled")}
                  </Badge>
                </li>
              ) : null}
            </ul>
          </div>

          <Card size="none" className="animate-rise overflow-hidden stagger-3">
            <a
              href={`#${SECTION_IDS.curriculum}`}
              aria-label={t("previewLabel")}
              className="group block border-b border-border"
            >
              <CourseThumbnail
                art={course.art}
                title={course.title}
                hook={course.thumbnailHook}
                durationMinutes={course.durationMinutes}
                playLabel={t("previewLabel")}
                isPlayVisible
                sizes={PREVIEW_SIZES}
                className="rounded-none"
              />
            </a>
            <div className="flex flex-col gap-4 p-5">
              {firstOpenEdition ? (
                <p className="text-3xl font-bold tracking-tight text-fg">
                  {tPolicies(policyKey(firstOpenEdition.policy))}
                </p>
              ) : null}
              {primaryAction}
              <p className="text-center text-xs text-fg-subtle">{t("signedOutNote")}</p>

              <div className="border-t border-border pt-4">
                <h2 className="text-sm font-semibold text-fg">{t("includesTitle")}</h2>
                <ul className="mt-3 flex flex-col gap-2.5">
                  {includes.map(({ icon, label }) => (
                    <li key={label} className="flex items-center gap-2.5 text-sm text-fg-muted">
                      <Icon icon={icon} size="md" className="text-fg-subtle" />
                      {label}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Card>
        </Container>
      </section>

      <nav
        aria-label={t("sectionsLabel")}
        className="sticky top-16 z-dropdown border-b border-border bg-surface"
      >
        <Container className="scrollbar-none flex gap-6 overflow-x-auto">
          <a href={`#${SECTION_IDS.overview}`} className={TAB_CLASSES}>
            {t("tabOverview")}
          </a>
          <a href={`#${SECTION_IDS.curriculum}`} className={TAB_CLASSES}>
            {t("outlineTitle")}
          </a>
          <a href={`#${SECTION_IDS.instructor}`} className={TAB_CLASSES}>
            {t("tabInstructor")}
          </a>
          <a href={`#${SECTION_IDS.faq}`} className={TAB_CLASSES}>
            {t("tabFaq")}
          </a>
        </Container>
      </nav>

      <Container className="grid items-start gap-10 py-12 lg:grid-cols-[minmax(0,1fr)_24rem] lg:gap-16 lg:py-16">
        <div className="flex min-w-0 flex-col gap-14">
          <section
            id={SECTION_IDS.overview}
            aria-labelledby="outcomes-heading"
            className="reveal scroll-mt-32"
          >
            <div className="rounded-dialog bg-tint-mint p-6 text-fg md:p-8">
              <h2 id="outcomes-heading" className="text-2xl font-semibold tracking-tight">
                {t("outcomesTitle")}
              </h2>
              <ul className="mt-5 grid gap-x-8 gap-y-3 sm:grid-cols-2">
                {course.outcomes.map((outcome) => (
                  <li key={outcome} className="flex min-w-0 items-start gap-3 text-sm leading-relaxed">
                    <span className="mt-0.5 text-success">
                      <Icon icon={Check} size="lg" />
                    </span>
                    {outcome}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-5 grid gap-5 md:grid-cols-2">
              <ListCard title={t("requirementsTitle")} items={course.requirements} />
              <ListCard title={t("audienceTitle")} items={course.audience} />
            </div>
          </section>

          <section
            id={SECTION_IDS.curriculum}
            aria-labelledby="curriculum-heading"
            className="reveal scroll-mt-32"
          >
            <h2 id="curriculum-heading" className="text-2xl font-semibold tracking-tight text-fg">
              {t("outlineTitle")}
            </h2>
            <p className="mt-2 text-sm text-fg-muted">
              {t("outlineSummary", {
                modules: moduleCount,
                lessons: tUnits("lessonCount", { count: course.lessonCount }),
                duration: durationLabel(course.durationMinutes),
              })}
            </p>
            <p className="mt-1 text-sm text-fg-subtle">{t("outlineNote")}</p>

            <div className="mt-6 divide-y divide-border overflow-hidden rounded-card border border-border bg-surface">
              {course.modules.map((module, moduleIndex) => {
                const hiddenLessons = module.lessonCount - module.lessons.length;
                const minutesPerLesson = Math.round(module.minutes / module.lessonCount);
                return (
                  <details key={module.id} open={moduleIndex === 0 ? true : undefined} className="group">
                    <summary className="flex cursor-pointer list-none items-center gap-4 px-5 py-4 transition-colors duration-fast ease-standard hover:bg-surface-hover [&::-webkit-details-marker]:hidden">
                      <span className="grid size-9 shrink-0 place-items-center rounded-control bg-info-subtle text-sm font-bold text-fg-brand tabular-nums">
                        {moduleIndex + 1}
                      </span>
                      <span className="min-w-0 flex-1 text-base font-semibold text-fg">{module.title}</span>
                      <span className="hidden shrink-0 text-xs text-fg-subtle sm:block">
                        {tUnits("lessonCount", { count: module.lessonCount })} •{" "}
                        {durationLabel(module.minutes)}
                      </span>
                      <Icon
                        icon={ChevronDown}
                        size="lg"
                        className="text-fg-subtle transition-transform duration-normal ease-emphasized group-open:rotate-180"
                      />
                    </summary>
                    <ol className="border-t border-border bg-canvas px-5 py-2">
                      {module.lessons.map((lesson, lessonIndex) => {
                        const isPreview = moduleIndex === 0 && lessonIndex === 0;
                        return (
                          <li key={lesson} className="flex items-center gap-3 py-2.5 text-sm">
                            <span className={isPreview ? "text-fg-brand" : "text-fg-subtle"}>
                              <Icon
                                icon={isPreview ? PlayCircle : LockKeyhole}
                                size="md"
                                aria-label={isPreview ? t("previewBadge") : t("lockedLabel")}
                              />
                            </span>
                            <span className="min-w-0 flex-1 truncate text-fg">{lesson}</span>
                            {isPreview ? <Badge tone={PREVIEW_TONE}>{t("previewBadge")}</Badge> : null}
                            <span className="shrink-0 text-xs text-fg-subtle tabular-nums">
                              {tUnits("minutes", { count: minutesPerLesson })}
                            </span>
                          </li>
                        );
                      })}
                      {hiddenLessons > 0 ? (
                        <li className="py-2.5 text-sm text-fg-subtle">
                          {t("moreLessons", { count: hiddenLessons })}
                        </li>
                      ) : null}
                    </ol>
                  </details>
                );
              })}
            </div>
          </section>

          <section
            id={SECTION_IDS.instructor}
            aria-labelledby="instructor-heading"
            className="reveal scroll-mt-32"
          >
            <h2 id="instructor-heading" className="text-2xl font-semibold tracking-tight text-fg">
              {t("instructorTitle")}
            </h2>
            <Card size="lg" className="mt-6 flex flex-col gap-5 sm:flex-row">
              <span
                aria-hidden
                className="grid size-20 shrink-0 place-items-center rounded-full bg-tint-amber text-2xl font-bold text-fg"
              >
                {initialsOf(course.instructor.name)}
              </span>
              <div className="min-w-0">
                <h3 className="text-lg font-semibold text-fg">{course.instructor.name}</h3>
                <p className="text-sm text-fg-brand">{course.instructor.role}</p>
                <p className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-fg-muted">
                  <span className="flex items-center gap-1 font-semibold text-warning">
                    <Icon icon={Star} size="sm" className="fill-current" />
                    {course.instructor.rating}
                  </span>
                  <span>
                    {t("instructorStats", {
                      courses: course.instructor.courseCount,
                      learners: course.instructor.learnerCount,
                    })}
                  </span>
                </p>
                <p className="mt-4 text-sm leading-relaxed text-fg-muted">{course.instructor.bio}</p>
              </div>
            </Card>
          </section>

          <section id={SECTION_IDS.faq} aria-labelledby="faq-heading" className="reveal scroll-mt-32">
            <h2 id="faq-heading" className="text-2xl font-semibold tracking-tight text-fg">
              {t("faqTitle")}
            </h2>
            <div className="mt-4 divide-y divide-border border-y border-border">
              {FAQ_KEYS.map((key) => (
                <details key={key} className="group">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-base font-semibold text-fg transition-colors duration-fast ease-standard hover:text-fg-brand [&::-webkit-details-marker]:hidden">
                    {t(`${key}Question`)}
                    <Icon
                      icon={ChevronDown}
                      size="lg"
                      className="text-fg-subtle transition-transform duration-normal ease-emphasized group-open:rotate-180"
                    />
                  </summary>
                  <p className="animate-slide-in pb-5 text-sm leading-relaxed text-fg-muted">
                    {t(`${key}Answer`)}
                  </p>
                </details>
              ))}
            </div>
          </section>
        </div>

        <aside aria-labelledby="editions-heading" className="flex flex-col gap-4 lg:sticky lg:top-32">
          <h2 id="editions-heading" className="text-lg font-semibold tracking-tight text-fg">
            {t("editionsTitle")}
          </h2>
          {course.editions.length === 0 ? (
            <p className="text-sm text-fg-muted">{t("noOpenEditionDescription")}</p>
          ) : null}
          {course.editions.map((edition) => (
            <EditionCard
              key={edition.id}
              edition={edition}
              isEnrolled={isEnrolled}
              onEnrol={() => setEditionInDialog(edition)}
            />
          ))}
        </aside>
      </Container>

      <EnrolDialog
        courseTitle={course.title}
        edition={editionInDialog}
        onOpenChange={(open) => {
          if (!open) setEditionInDialog(null);
        }}
        onEnrolled={() => setEnrolment(ENROLMENT_STATES.ENROLLED)}
        courseSlug={course.slug}
        isAlreadyEnrolled={isEnrolled}
      />
    </main>
  );
}

const PREVIEW_TONE = "brand" as const;

function Fact({ icon, children }: { icon: LucideIcon; children: ReactNode }) {
  return (
    <li className="flex items-center gap-1.5">
      <Icon icon={icon} size="sm" className="text-fg-subtle" />
      {children}
    </li>
  );
}

/** A plain list under a heading, for requirements and audience. */
function ListCard({ title, items }: { title: string; items: readonly string[] }) {
  return (
    <Card size="lg">
      <h3 className="text-lg font-semibold text-fg">{title}</h3>
      <ul className="mt-4 flex flex-col gap-3">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-fg-muted">
            <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-fg-subtle" />
            {item}
          </li>
        ))}
      </ul>
    </Card>
  );
}

function EditionCard({
  edition,
  isEnrolled,
  onEnrol,
}: {
  edition: CourseEdition;
  isEnrolled: boolean;
  onEnrol: () => void;
}) {
  const t = useTranslations("learning.landing");
  const tPolicies = useTranslations("learning.enrolmentPolicies");
  const percent = Math.round((edition.seatsTaken / edition.seatsTotal) * 100);

  return (
    <Card as="article" className={cn(edition.isOpen ? "border-brand" : null)}>
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <h3 className="text-base font-semibold text-fg">{edition.label}</h3>
          <p className="mt-0.5 text-xs text-fg-subtle">{t("editionVersion", { version: edition.version })}</p>
        </div>
        <Badge tone={editionTone(edition.isOpen)}>
          {edition.isOpen ? tPolicies(policyKey(edition.policy)) : t("editionClosed")}
        </Badge>
      </div>

      <p className="mt-4 flex items-center gap-1.5 text-xs text-fg-muted">
        <Icon icon={Users} size="sm" />
        {t("editionSeats", { taken: edition.seatsTaken, total: edition.seatsTotal })}
      </p>
      <span aria-hidden className="mt-2 block h-1.5 overflow-hidden rounded-control bg-surface-sunken">
        <span
          className={cn(
            "block h-full origin-left animate-grow-x rounded-control stagger-4",
            edition.isOpen ? "bg-brand" : "bg-border-strong",
          )}
          style={{ width: `${percent}%` }}
        />
      </span>

      {edition.isOpen ? (
        <Button className="mt-4 w-full" disabled={isEnrolled} onClick={onEnrol}>
          {t("enrol")}
        </Button>
      ) : null}
    </Card>
  );
}

function policyKey(policy: EnrolmentPolicy): "free" | "invite" | "paid" {
  return policy;
}

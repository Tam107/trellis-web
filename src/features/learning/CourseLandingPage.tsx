"use client";

import {
  ArrowRight,
  BookOpen,
  Check,
  ChevronRight,
  Clock3,
  Layers3,
  LockKeyhole,
  Signal,
  Users,
  type LucideIcon,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { useState, type ReactNode } from "react";

import { PUBLIC_COURSE } from "@/entities/learning/course.fixtures";
import type { CourseEdition } from "@/entities/learning/course.types";
import { ENROLMENT_STATES, type EnrolmentPolicy } from "@/entities/learning/learning.constants";
import { Link } from "@/i18n/navigation";
import { ROUTES } from "@/shared/constants/routes";
import { Badge } from "@/ui/Badge";
import { Button } from "@/ui/Button";
import { Card } from "@/ui/Card";
import { cn } from "@/ui/cn";
import { Container } from "@/ui/Container";
import { Icon } from "@/ui/Icon";
import { IconTile } from "@/ui/IconTile";
import { CourseThumbnail } from "./CourseThumbnail";
import { EnrolDialog } from "./EnrolDialog";
import { editionTone, ENROLLED_TONE, LANGUAGE_TONES } from "./learning.tones";
import { useDurationLabel } from "./useDurationLabel";

/** The hero's preview column on desktop, full width on a phone. */
const PREVIEW_SIZES = "(min-width: 1024px) 24rem, 100vw";

const OUTCOMES_ID = "outcomes";
const CURRICULUM_ID = "curriculum";

const ARROW_CLASSES = "transition-transform duration-normal ease-emphasized group-hover:translate-x-0.5";

/**
 * Public course page: hero (tint) with the enrol card beside it, then the outcomes and the outline
 * on the canvas with the editions in a sticky rail.
 *
 * - Displays only public course metadata and module titles (D-12).
 * - Enrolment is tied to a specific immutable course edition (D-05).
 */
export function CourseLandingPage() {
  const t = useTranslations("learning.landing");
  const tNav = useTranslations("home.nav");
  const tLanguages = useTranslations("learning.languages");
  const tLevels = useTranslations("learning.levels");
  const tUnits = useTranslations("learning.units");
  const durationLabel = useDurationLabel();
  const course = PUBLIC_COURSE;

  const [enrolment, setEnrolment] = useState(course.enrolment);
  const [editionInDialog, setEditionInDialog] = useState<CourseEdition | null>(null);
  const isEnrolled = enrolment === ENROLMENT_STATES.ENROLLED;
  const firstOpenEdition = course.editions.find((edition) => edition.isOpen);

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
        <Container className="grid items-center gap-10 py-12 lg:grid-cols-[minmax(0,1fr)_24rem] lg:gap-16 lg:py-16">
          <div className="min-w-0">
            <nav aria-label={t("breadcrumbLabel")} className="flex animate-rise items-center gap-1.5 text-sm">
              <Link href={ROUTES.courses} className="font-semibold text-fg-brand hover:text-brand-hover">
                {tNav("courses")}
              </Link>
              <Icon icon={ChevronRight} size="sm" className="text-fg-subtle" />
              <span className="text-fg-muted">{tLanguages(course.language)}</span>
            </nav>

            <h1
              id="course-title"
              className="mt-4 max-w-3xl animate-rise text-4xl leading-tight font-bold tracking-tight text-balance text-fg stagger-1 md:text-5xl"
            >
              {course.title}
            </h1>
            <p className="mt-5 max-w-2xl animate-rise text-lg leading-relaxed text-fg-muted stagger-2">
              {course.summary}
            </p>

            <ul className="mt-6 flex animate-rise flex-wrap items-center gap-x-5 gap-y-2 text-sm text-fg-muted stagger-3">
              <li>
                <Badge tone={LANGUAGE_TONES[course.language]}>{tLanguages(course.language)}</Badge>
              </li>
              <Fact icon={Signal}>{tLevels(course.level)}</Fact>
              <Fact icon={Layers3}>{tUnits("lessonCount", { count: course.lessonCount })}</Fact>
              <Fact icon={Clock3}>{durationLabel(course.durationMinutes)}</Fact>
              {isEnrolled ? (
                <li>
                  <Badge tone={ENROLLED_TONE} icon={<Icon icon={Check} size="sm" />}>
                    {t("alreadyEnrolled")}
                  </Badge>
                </li>
              ) : null}
            </ul>
          </div>

          <Card size="none" className="animate-rise overflow-hidden shadow-raised stagger-3">
            <a
              href={`#${CURRICULUM_ID}`}
              aria-label={t("previewLabel")}
              className="group block border-b border-border"
            >
              <CourseThumbnail
                art={course.art}
                title={course.title}
                hook={course.title}
                durationMinutes={course.durationMinutes}
                playLabel={t("previewLabel")}
                isPlayVisible
                sizes={PREVIEW_SIZES}
                className="rounded-none"
              />
            </a>
            <div className="flex flex-col gap-3 p-5">
              {primaryAction}
              <Button asChild size="lg" variant="secondary" className="w-full">
                <a href={`#${CURRICULUM_ID}`}>{t("outlineTitle")}</a>
              </Button>
              <p className="text-center text-xs text-fg-subtle">{t("signedOutNote")}</p>
            </div>
          </Card>
        </Container>
      </section>

      <nav
        aria-label={t("sectionsLabel")}
        className="sticky top-16 z-dropdown border-b border-border bg-surface"
      >
        <Container className="flex gap-6">
          <a href={`#${OUTCOMES_ID}`} className={TAB_CLASSES}>
            {t("outcomesTitle")}
          </a>
          <a href={`#${CURRICULUM_ID}`} className={TAB_CLASSES}>
            {t("outlineTitle")}
          </a>
        </Container>
      </nav>

      <Container className="grid items-start gap-8 py-12 lg:grid-cols-[minmax(0,1fr)_24rem] lg:gap-16 lg:py-16">
        <div className="flex min-w-0 flex-col gap-8">
          <Card
            as="section"
            id={OUTCOMES_ID}
            aria-labelledby="outcomes-heading"
            size="lg"
            className="reveal scroll-mt-32"
          >
            <h2 id="outcomes-heading" className="text-xl font-semibold tracking-tight text-fg md:text-2xl">
              {t("outcomesTitle")}
            </h2>
            <ul className="mt-6 grid gap-x-8 gap-y-4 sm:grid-cols-2">
              {course.outcomes.map((outcome) => (
                <li key={outcome.id} className="flex min-w-0 items-start gap-3">
                  <span className="mt-0.5 text-success">
                    <Icon icon={Check} size="lg" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm leading-relaxed font-medium text-fg">{outcome.label}</p>
                    <p className="mt-0.5 text-xs text-fg-subtle">{outcome.scaleVersion}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Card>

          <section id={CURRICULUM_ID} aria-labelledby="curriculum-heading" className="reveal scroll-mt-32">
            <div className="flex items-center gap-3">
              <IconTile icon={BookOpen} />
              <h2
                id="curriculum-heading"
                className="text-xl font-semibold tracking-tight text-fg md:text-2xl"
              >
                {t("outlineTitle")}
              </h2>
            </div>
            <p className="mt-3 text-sm text-fg-muted">{t("outlineNote")}</p>
            <ol className="mt-6 divide-y divide-border overflow-hidden rounded-card border border-border bg-surface">
              {course.outlinePreview.map((module, index) => (
                <li
                  key={module.id}
                  className="flex items-center gap-4 px-5 py-4 transition-colors duration-fast ease-standard hover:bg-surface-hover"
                >
                  <span className="grid size-9 shrink-0 place-items-center rounded-control bg-info-subtle text-sm font-bold text-fg-brand tabular-nums">
                    {index + 1}
                  </span>
                  <span className="min-w-0 flex-1 truncate text-sm font-semibold text-fg">
                    {module.title}
                  </span>
                  <span className="shrink-0 text-xs text-fg-subtle">
                    {t("moduleLessons", { count: module.lessonCount })}
                  </span>
                  <span className="shrink-0 text-fg-subtle">
                    <Icon icon={LockKeyhole} size="sm" aria-label={t("lockedLabel")} />
                  </span>
                </li>
              ))}
            </ol>
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

/** Same underline motion as the header nav, so the two rows of links behave alike. */
const TAB_CLASSES =
  "relative py-3.5 text-sm font-medium text-fg-muted transition-colors duration-fast ease-standard after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:origin-center after:scale-x-0 after:bg-brand after:transition-transform after:duration-normal after:ease-emphasized hover:text-fg hover:after:scale-x-100";

function Fact({ icon, children }: { icon: LucideIcon; children: ReactNode }) {
  return (
    <li className="flex items-center gap-1.5">
      <Icon icon={icon} size="sm" className="text-fg-subtle" />
      {children}
    </li>
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

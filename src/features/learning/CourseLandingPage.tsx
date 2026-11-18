"use client";

import {
  ArrowRight,
  BookOpen,
  Check,
  Clock3,
  GraduationCap,
  Layers3,
  LockKeyhole,
  Signal,
  Target,
  Users,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";

import { PUBLIC_COURSE } from "@/entities/learning/course.fixtures";
import type { CourseEdition } from "@/entities/learning/course.types";
import { ENROLMENT_STATES, type EnrolmentPolicy } from "@/entities/learning/learning.constants";
import { Link } from "@/i18n/navigation";
import { ROUTES } from "@/shared/constants/routes";
import { Badge } from "@/ui/Badge";
import { Button } from "@/ui/Button";
import { EnrolDialog } from "./EnrolDialog";
import { editionTone, LANGUAGE_TONES } from "./learning.tones";
import { useDurationLabel } from "./useDurationLabel";

/**
 * Public M1 landing page.
 *
 * - Displays only public course metadata and module titles (D-12).
 * - Enrolment is tied to a specific immutable course edition (D-05).
 * - Leaves the existing enrolment dialog, i18n keys and fixtures intact.
 * - Hero image is a demo illustration, not a hardcoded source of business data.
 */
export function CourseLandingPage() {
  const t = useTranslations("learning.landing");
  const tLanguages = useTranslations("learning.languages");
  const tLevels = useTranslations("learning.levels");
  const tUnits = useTranslations("learning.units");
  const durationLabel = useDurationLabel();
  const course = PUBLIC_COURSE;

  const [enrolment, setEnrolment] = useState(course.enrolment);
  const [editionInDialog, setEditionInDialog] = useState<CourseEdition | null>(null);
  const isEnrolled = enrolment === ENROLMENT_STATES.ENROLLED;
  const firstOpenEdition = course.editions.find((edition) => edition.isOpen);
  const hasOpenEdition = !!firstOpenEdition;

  return (
    <main className="min-h-screen bg-canvas text-fg">
      <div className="mx-auto max-w-10/12 px-4 pt-7 pb-20 sm:px-6 lg:px-8">
        {/* HERO: authoritative course data is always text, not embedded in an image. */}
        <section
          aria-labelledby="course-title"
          className="relative isolate overflow-hidden rounded-[28px] border border-border bg-info-subtle shadow-raised"
        >
          {/* Decorative hero art for the sample Chinese course. Replace with a
              course-specific media field when real catalog imagery is modeled. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 right-0 hidden w-[52%] bg-cover bg-center md:block"
            style={{
              backgroundImage: "url('/images/course-hero-chinese.png')",
            }}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-r from-info-subtle via-info-subtle/95 to-transparent md:via-info-subtle/80"
          />

          <div className="relative z-dropdown flex min-h-[315px] flex-col justify-center gap-5 px-6 py-9 sm:px-9 md:max-w-[66%] lg:px-12">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center rounded-full bg-surface/75 px-3 py-1 text-[11px] font-bold tracking-[0.12em] text-fg-brand uppercase">
                {t("eyebrow")}
              </span>
              {isEnrolled && (
                <span className="inline-flex items-center gap-1 rounded-full bg-success-subtle px-3 py-1 text-xs font-medium text-success">
                  <Check size={13} aria-hidden="true" />
                  {t("alreadyEnrolled")}
                </span>
              )}
            </div>

            <div>
              <h1
                id="course-title"
                className="max-w-[660px] text-[30px] leading-[1.14] font-bold tracking-[-0.04em] sm:text-[38px] lg:text-[42px]"
              >
                {course.title}
              </h1>
              <p className="mt-3 max-w-[560px] text-sm leading-7 text-fg-muted sm:text-[15px]">
                {course.summary}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <Badge tone={LANGUAGE_TONES[course.language]}>{tLanguages(course.language)}</Badge>
              <MetaPill icon={Signal}>{tLevels(course.level)}</MetaPill>
              <MetaPill icon={Layers3}>{tUnits("lessonCount", { count: course.lessonCount })}</MetaPill>
              <MetaPill icon={Clock3}>{durationLabel(course.durationMinutes)}</MetaPill>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              {isEnrolled ? (
                <Button asChild>
                  <Link href={ROUTES.learnCourse(course.slug)}>
                    {t("continueCourse")}
                    <ArrowRight size={16} aria-hidden="true" />
                  </Link>
                </Button>
              ) : (
                <Button
                  disabled={!hasOpenEdition}
                  onClick={() => {
                    if (firstOpenEdition) setEditionInDialog(firstOpenEdition);
                  }}
                >
                  {hasOpenEdition ? t("enrol") : t("noOpenEditionTitle")}
                  {hasOpenEdition && <ArrowRight size={16} aria-hidden="true" />}
                </Button>
              )}
              <a
                href="#curriculum"
                className="inline-flex min-h-10 items-center justify-center rounded-xl border border-border bg-surface/80 px-4 text-sm font-semibold text-fg transition-colors hover:bg-surface focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                {t("outlineTitle")}
              </a>
            </div>
          </div>
        </section>

        {/* IN-PAGE NAV: no fake Reviews, Trailer or Instructor buttons. */}
        <nav aria-label={t("sectionsLabel")} className="mt-5 flex gap-8 border-b border-border px-2">
          <a
            href="#outcomes"
            className="border-b-2 border-brand px-1 pb-3 text-sm font-semibold text-fg-brand"
          >
            {t("outcomesTitle")}
          </a>
          <a
            href="#curriculum"
            className="border-b-2 border-transparent px-1 pb-3 text-sm font-medium text-fg-muted hover:text-fg-brand"
          >
            {t("outlineTitle")}
          </a>
        </nav>

        <div className="mt-7 grid items-start gap-7 lg:grid-cols-[minmax(0,1fr)_340px]">
          <div className="min-w-0 space-y-7">
            {/* Keep claims and version descriptors directly from fixture. */}
            <section
              id="outcomes"
              aria-labelledby="outcomes-heading"
              className="scroll-mt-6 rounded-[22px] border border-border bg-surface p-5 shadow-raised sm:p-7"
            >
              <SectionTitle id="outcomes-heading" icon={Target}>
                {t("outcomesTitle")}
              </SectionTitle>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {course.outcomes.map((outcome) => (
                  <li key={outcome.id} className="flex min-w-0 items-start gap-3 rounded-2xl bg-surface p-4">
                    <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-info-subtle text-fg-brand">
                      <Check size={18} aria-hidden="true" />
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm leading-6 font-medium text-fg">{outcome.label}</p>
                      <p className="mt-1 text-xs text-fg-subtle">{outcome.scaleVersion}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </section>

            {/* Public outline must not leak lesson bodies or private materials. */}
            <section
              id="curriculum"
              aria-labelledby="curriculum-heading"
              className="scroll-mt-6 rounded-[22px] border border-border bg-surface p-5 shadow-raised sm:p-7"
            >
              <SectionTitle id="curriculum-heading" icon={BookOpen}>
                {t("outlineTitle")}
              </SectionTitle>
              <p className="mt-2 text-sm leading-6 text-fg-subtle">{t("outlineNote")}</p>
              <ol className="mt-5 space-y-2.5">
                {course.outlinePreview.map((module, index) => (
                  <li
                    key={module.id}
                    className="flex items-center gap-3 rounded-2xl border border-border px-3.5 py-3.5 transition-colors hover:bg-surface sm:gap-4"
                  >
                    <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-info-subtle text-sm font-semibold text-fg-brand">
                      {index + 1}
                    </span>
                    <span className="min-w-0 flex-1 truncate text-sm font-semibold text-fg">
                      {module.title}
                    </span>
                    <span className="shrink-0 text-xs text-fg-subtle">
                      {t("moduleLessons", { count: module.lessonCount })}
                    </span>
                    <LockKeyhole
                      size={15}
                      className="shrink-0 text-fg-subtle"
                      aria-label={t("lockedLabel")}
                    />
                  </li>
                ))}
              </ol>
            </section>
          </div>

          {/* High-visibility enrolment CTA next to the decision content. */}
          <aside
            aria-labelledby="editions-heading"
            className="rounded-[22px] border border-border bg-surface p-5 shadow-raised lg:sticky lg:top-6"
          >
            <div className="flex items-center gap-3">
              <span className="grid size-10 place-items-center rounded-2xl bg-info-subtle text-fg-brand">
                <GraduationCap size={20} aria-hidden="true" />
              </span>
              <h2 id="editions-heading" className="text-lg font-bold tracking-tight">
                {t("editionsTitle")}
              </h2>
            </div>
            {course.editions.length === 0 && (
              <p className="mt-4 text-sm text-fg-subtle">{t("noOpenEditionDescription")}</p>
            )}
            <div className="mt-5 space-y-3">
              {course.editions.map((edition) => (
                <EditionCard
                  key={edition.id}
                  edition={edition}
                  isEnrolled={isEnrolled}
                  onEnrol={() => setEditionInDialog(edition)}
                />
              ))}
            </div>
            <p className="mt-4 rounded-xl bg-surface px-3.5 py-3 text-xs leading-5 text-fg-muted">
              {t("signedOutNote")}
            </p>
          </aside>
        </div>
      </div>

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

function MetaPill({ icon: Icon, children }: { icon: typeof Clock3; children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-surface/80 px-2.5 py-1.5 text-xs font-medium text-fg-muted">
      <Icon size={13} aria-hidden="true" />
      {children}
    </span>
  );
}

function SectionTitle({
  id,
  icon: Icon,
  children,
}: {
  id: string;
  icon: typeof Target;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="grid size-10 place-items-center rounded-2xl bg-info-subtle text-fg-brand">
        <Icon size={20} aria-hidden="true" />
      </span>
      <h2 id={id} className="text-lg font-bold tracking-tight sm:text-xl">
        {children}
      </h2>
    </div>
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

  return (
    <article
      className={
        "rounded-2xl border p-4 " + (edition.isOpen ? "border-brand bg-surface" : "border-border bg-surface")
      }
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="min-w-0 text-sm font-bold text-fg">{edition.label}</h3>
        <Badge tone={editionTone(edition.isOpen)}>
          {edition.isOpen ? tPolicies(policyKey(edition.policy)) : t("editionClosed")}
        </Badge>
      </div>
      <p className="mt-2 text-xs text-fg-subtle">{t("editionVersion", { version: edition.version })}</p>
      <p className="mt-2 flex items-center gap-1.5 text-xs text-fg-muted">
        <Users size={13} aria-hidden="true" />
        {t("editionSeats", {
          taken: edition.seatsTaken,
          total: edition.seatsTotal,
        })}
      </p>
      <Button
        className="mt-4 w-full"
        size="sm"
        variant={edition.isOpen ? "primary" : "secondary"}
        disabled={!edition.isOpen || isEnrolled}
        onClick={onEnrol}
      >
        {t("enrol")}
        {edition.isOpen && !isEnrolled && <ArrowRight size={15} aria-hidden="true" />}
      </Button>
    </article>
  );
}

function policyKey(policy: EnrolmentPolicy): "free" | "invite" | "paid" {
  return policy;
}

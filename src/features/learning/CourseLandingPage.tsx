"use client";

import { ArrowRight, Check, Clock, Layers, Lock, Signal, Target, Users } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { PUBLIC_COURSE } from "@/entities/learning/course.fixtures";
import { type CourseEdition } from "@/entities/learning/course.types";
import { ENROLMENT_STATES, type EnrolmentPolicy } from "@/entities/learning/learning.constants";
import { Link } from "@/i18n/navigation";
import { ROUTES } from "@/shared/constants/routes";
import { Badge } from "@/ui/Badge";
import { Button } from "@/ui/Button";
import { cn } from "@/ui/cn";
import { EmptyState } from "@/ui/EmptyState";
import { Icon } from "@/ui/Icon";
import { CourseArtwork } from "./CourseArtwork";
import { EnrolDialog } from "./EnrolDialog";
import { editionTone, LANGUAGE_TONES } from "./learning.tones";
import { useDurationLabel } from "./useDurationLabel";

/**
 * M1 — the page a visitor reaches from a shared link. It sits outside `LearningShell` because a
 * visitor has no learner sidebar, and it shows titles only: lesson bodies are behind enrolment
 * (D-12), so the outline here is a shape, not content.
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
  const openEditions = course.editions.filter((edition) => edition.isOpen);
  const isEnrolled = enrolment === ENROLMENT_STATES.ENROLLED;

  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-8 md:px-6">
      <section className="flex flex-col gap-6 rounded-card bg-info-subtle p-6 md:flex-row md:p-8">
        <CourseArtwork
          art={course.art}
          language={course.language}
          title={course.title}
          className="h-40 w-full shrink-0 rounded-card md:size-40"
          markClassName="text-6xl"
        />
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold tracking-wide text-fg-brand uppercase">{t("eyebrow")}</p>
          <h1 className="mt-2 text-3xl font-semibold text-fg">{course.title}</h1>
          <p className="mt-2 text-sm text-fg-muted">{course.summary}</p>
          <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-fg-muted">
            <Badge tone={LANGUAGE_TONES[course.language]}>{tLanguages(course.language)}</Badge>
            <Chip icon={Signal}>{tLevels(course.level)}</Chip>
            <Chip icon={Layers}>{tUnits("lessonCount", { count: course.lessonCount })}</Chip>
            <Chip icon={Clock}>{durationLabel(course.durationMinutes)}</Chip>
          </div>
          {isEnrolled ? (
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <Button asChild>
                <Link href={ROUTES.learnCourse(course.slug)}>
                  {t("continueCourse")}
                  <Icon icon={ArrowRight} size="md" />
                </Link>
              </Button>
              <span className="flex items-center gap-1.5 text-sm text-success">
                <Icon icon={Check} size="sm" />
                {t("alreadyEnrolled")}
              </span>
            </div>
          ) : null}
        </div>
      </section>

      <div className="mt-6 grid gap-6 md:grid-cols-[1fr_18rem]">
        <div className="flex min-w-0 flex-col gap-6">
          <section>
            <h2 className="flex items-center gap-2 text-base font-semibold text-fg">
              <Icon icon={Target} size="md" className="text-fg-brand" />
              {t("outcomesTitle")}
            </h2>
            <ul className="mt-3 flex flex-col gap-2">
              {course.outcomes.map((outcome) => (
                <li
                  key={outcome.id}
                  className="flex items-start gap-2.5 rounded-card border border-border bg-surface p-3"
                >
                  <Icon icon={Check} size="md" className="mt-0.5 text-success" />
                  <span className="min-w-0 flex-1 text-sm text-fg">{outcome.label}</span>
                  {/* The scale version is part of the claim: descriptors are re-worded between editions. */}
                  <span className="shrink-0 text-xs text-fg-subtle">{outcome.scaleVersion}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-base font-semibold text-fg">{t("outlineTitle")}</h2>
            <p className="mt-1 text-sm text-fg-muted">{t("outlineNote")}</p>
            <ul className="mt-3 flex flex-col gap-2">
              {course.outlinePreview.map((module, index) => (
                <li
                  key={module.id}
                  className="flex items-center gap-3 rounded-card border border-border bg-surface px-3 py-2.5"
                >
                  <span className="grid size-7 shrink-0 place-items-center rounded-control bg-surface-sunken text-xs font-medium text-fg-muted">
                    {index + 1}
                  </span>
                  <span className="min-w-0 flex-1 truncate text-sm text-fg">{module.title}</span>
                  <span className="shrink-0 text-xs text-fg-subtle">
                    {t("moduleLessons", { count: module.lessonCount })}
                  </span>
                  <Icon icon={Lock} size="sm" className="shrink-0 text-fg-subtle" />
                </li>
              ))}
            </ul>
          </section>
        </div>

        <aside className="flex flex-col gap-3">
          <h2 className="text-base font-semibold text-fg">{t("editionsTitle")}</h2>
          {openEditions.length === 0 ? (
            <EmptyState
              icon={Users}
              title={t("noOpenEditionTitle")}
              description={t("noOpenEditionDescription")}
            />
          ) : null}
          {course.editions.map((edition) => (
            <EditionCard
              key={edition.id}
              edition={edition}
              isEnrolled={isEnrolled}
              onEnrol={() => setEditionInDialog(edition)}
            />
          ))}
          <p className="text-xs text-fg-subtle">{t("signedOutNote")}</p>
        </aside>
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

function Chip({ icon, children }: { icon: typeof Clock; children: React.ReactNode }) {
  return (
    <span className="flex items-center gap-1 rounded-control bg-surface px-2 py-1">
      <Icon icon={icon} size="sm" />
      {children}
    </span>
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
      className={cn(
        "flex flex-col gap-2 rounded-card border border-border bg-surface p-4",
        !edition.isOpen && "opacity-70",
      )}
    >
      <div className="flex items-center justify-between gap-2">
        <h3 className="text-sm font-semibold text-fg">{edition.label}</h3>
        <Badge tone={editionTone(edition.isOpen)}>
          {edition.isOpen ? tPolicies(policyKey(edition.policy)) : t("editionClosed")}
        </Badge>
      </div>
      {/* The version is on the card because enrolment pins it (D-05): what you join is what you keep. */}
      <p className="text-xs text-fg-subtle">{t("editionVersion", { version: edition.version })}</p>
      <p className="text-xs text-fg-muted">
        {t("editionSeats", { taken: edition.seatsTaken, total: edition.seatsTotal })}
      </p>
      <Button
        size="sm"
        className="mt-1 w-full"
        variant={edition.isOpen ? "primary" : "secondary"}
        disabled={!edition.isOpen || isEnrolled}
        onClick={onEnrol}
      >
        {t("enrol")}
      </Button>
    </article>
  );
}

/** `EnrolmentPolicy` values are also the message keys, but TypeScript needs the narrowing. */
function policyKey(policy: EnrolmentPolicy): "free" | "invite" | "paid" {
  return policy;
}

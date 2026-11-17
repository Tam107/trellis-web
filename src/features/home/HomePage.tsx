import {
  ArrowRight,
  BookOpen,
  ClipboardCheck,
  GraduationCap,
  Play,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { COURSE_LANGUAGES } from "@/entities/learning/learning.constants";
import { ATTEMPT_RESULT } from "@/entities/learning/assessment.fixtures";
import { CATALOG_COURSES, CONTINUE_LEARNING } from "@/entities/learning/course.fixtures";
import { CourseArtwork } from "@/features/learning/CourseArtwork";
import { EYEBROW_TONE, LANGUAGE_TONES } from "@/features/learning/learning.tones";
import { Link } from "@/i18n/navigation";
import { ROUTES } from "@/shared/constants/routes";
import { Badge } from "@/ui/Badge";
import { Button } from "@/ui/Button";
import { cn } from "@/ui/cn";
import { Icon } from "@/ui/Icon";
import { ProgressBar } from "@/ui/ProgressBar";

/** The three courses the landing page leads with. */
const FEATURED_SLUGS = [
  "english-everyday-communication",
  "chinese-i-foundations",
  "english-academic-purposes",
] as const;

export function HomePage() {
  return (
    <main className="flex flex-col">
      <Hero />
      <Stats />
      <Tracks />
      <HowItWorks />
      <Featured />
      <InstructorBand />
      <Closing />
    </main>
  );
}

function Section({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <section className={cn("px-4 py-14 md:px-6 md:py-20", className)}>
      <div className="mx-auto w-full max-w-6xl">{children}</div>
    </section>
  );
}

function Hero() {
  const t = useTranslations("home.hero");
  return (
    <section className="bg-gradient-to-b from-info-subtle to-canvas px-4 pt-14 pb-16 md:px-6 md:pt-20 md:pb-24">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-10 lg:grid-cols-[1.1fr_1fr]">
        <div className="min-w-0">
          <Badge tone={EYEBROW_TONE} icon={<Icon icon={Sparkles} size="xs" />}>
            {t("eyebrow")}
          </Badge>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-fg md:text-5xl">{t("title")}</h1>
          <p className="mt-4 max-w-xl text-base text-fg-muted md:text-lg">{t("subtitle")}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link href={ROUTES.catalog}>
                {t("ctaPrimary")}
                <Icon icon={ArrowRight} size="md" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <Link href={ROUTES.login}>{t("ctaSecondary")}</Link>
            </Button>
          </div>
        </div>

        <HeroCards />
      </div>
    </section>
  );
}

/** A small echo of the learner dashboard, so the promise on the page matches the product. */
function HeroCards() {
  const t = useTranslations("home.hero");
  const course = CATALOG_COURSES.find((item) => item.slug === "chinese-i-foundations");
  const resumed = CONTINUE_LEARNING[1];
  const scoreLabel = `${ATTEMPT_RESULT.score} / ${ATTEMPT_RESULT.maxScore}`;
  if (!course || !resumed) return null;

  return (
    <div className="mx-auto w-full max-w-sm">
      <div className="rounded-card border border-border bg-surface p-5 shadow-raised">
        <p className="text-xs font-semibold tracking-wide text-fg-brand uppercase">{t("cardEyebrow")}</p>
        <div className="mt-4 flex items-center gap-3">
          <CourseArtwork
            art={course.art}
            language={course.language}
            title={course.title}
            className="size-14 shrink-0 rounded-control"
          />
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-fg">{course.title}</p>
            <p className="truncate text-xs text-fg-muted">
              {t("cardLesson", { number: resumed.currentLessonNumber, title: resumed.currentLessonTitle })}
            </p>
          </div>
        </div>
        <div className="mt-4 flex items-center gap-2">
          <ProgressBar size="sm" value={60} label={course.title} />
          <span className="text-xs text-fg-muted">60%</span>
        </div>
      </div>

      {/*
        A second card, offset and rotated: depth without an illustration. It is decorative, and it
        overhangs only its own wrapper inside the hero's padding, so it cannot land on any text.
      */}
      <div
        aria-hidden
        className="mt-4 ml-auto hidden w-56 rotate-3 rounded-card border border-border bg-surface p-4 shadow-raised sm:block"
      >
        <div className="flex items-center gap-2">
          <span className="grid size-8 place-items-center rounded-control bg-success-subtle text-success">
            <Icon icon={ClipboardCheck} size="md" />
          </span>
          <div className="min-w-0">
            <p className="truncate text-xs font-semibold text-fg">{ATTEMPT_RESULT.courseTitle}</p>
            <p className="truncate text-xs text-fg-muted">{scoreLabel}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Stats() {
  const t = useTranslations("home.stats");
  const rows = [
    { key: "courses", value: t("coursesValue"), label: t("courses") },
    { key: "lessons", value: t("lessonsValue"), label: t("lessons") },
    { key: "languages", value: t("languagesValue"), label: t("languages") },
    { key: "levels", value: t("levelsValue"), label: t("levels") },
  ];
  return (
    <Section className="py-10 md:py-12">
      <dl className="grid grid-cols-2 gap-6 lg:grid-cols-4">
        {rows.map((row) => (
          <div key={row.key} className="flex flex-col gap-1">
            <dd className="text-3xl font-semibold text-fg">{row.value}</dd>
            <dt className="text-sm text-fg-muted">{row.label}</dt>
          </div>
        ))}
      </dl>
    </Section>
  );
}

function Tracks() {
  const t = useTranslations("home.tracks");
  const tLanguages = useTranslations("learning.languages");
  const tracks = [
    {
      language: COURSE_LANGUAGES.ENGLISH,
      title: t("englishTitle"),
      body: t("englishBody"),
      scale: t("englishScale"),
      art: "landmark",
    },
    {
      language: COURSE_LANGUAGES.CHINESE,
      title: t("chineseTitle"),
      body: t("chineseBody"),
      scale: t("chineseScale"),
      art: "blossom",
    },
  ] as const;

  return (
    <Section>
      <h2 className="text-2xl font-semibold text-fg md:text-3xl">{t("title")}</h2>
      {/* The scales are kept apart on the landing page too: it is the first thing to get right. */}
      <p className="mt-2 max-w-2xl text-sm text-fg-muted">{t("subtitle")}</p>

      <div className="mt-8 grid gap-5 md:grid-cols-2">
        {tracks.map((track) => (
          <article
            key={track.language}
            className="flex flex-col gap-4 rounded-card border border-border bg-surface p-6"
          >
            <CourseArtwork
              art={track.art}
              language={track.language}
              title={track.title}
              className="h-28 w-full rounded-card"
              markClassName="text-5xl"
            />
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-xl font-semibold text-fg">{track.title}</h3>
              <Badge tone={LANGUAGE_TONES[track.language]} size="sm">
                {tLanguages(track.language)}
              </Badge>
            </div>
            <p className="text-sm text-fg-muted">{track.body}</p>
            <p className="text-xs text-fg-subtle">{track.scale}</p>
            <Button asChild variant="secondary" className="mt-auto self-start">
              <Link href={ROUTES.catalog}>
                {t("explore", { language: tLanguages(track.language) })}
                <Icon icon={ArrowRight} size="md" />
              </Link>
            </Button>
          </article>
        ))}
      </div>
    </Section>
  );
}

function HowItWorks() {
  const t = useTranslations("home.how");
  const steps: readonly { icon: LucideIcon; title: string; body: string }[] = [
    { icon: BookOpen, title: t("stepOneTitle"), body: t("stepOneBody") },
    { icon: Play, title: t("stepTwoTitle"), body: t("stepTwoBody") },
    { icon: ClipboardCheck, title: t("stepThreeTitle"), body: t("stepThreeBody") },
  ];

  return (
    <Section className="bg-surface">
      <h2 className="text-2xl font-semibold text-fg md:text-3xl">{t("title")}</h2>
      <ol className="mt-8 grid gap-6 md:grid-cols-3">
        {steps.map((step, index) => (
          <li key={step.title} className="flex flex-col gap-3">
            <span className="flex items-center gap-3">
              <span className="grid size-10 place-items-center rounded-control bg-info-subtle text-fg-brand">
                <Icon icon={step.icon} size="lg" />
              </span>
              <span className="text-sm font-medium text-fg-subtle">{index + 1}</span>
            </span>
            <h3 className="text-base font-semibold text-fg">{step.title}</h3>
            <p className="text-sm text-fg-muted">{step.body}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}

function Featured() {
  const t = useTranslations("home.featured");
  const tLanguages = useTranslations("learning.languages");
  const courses = CATALOG_COURSES.filter((course) =>
    FEATURED_SLUGS.includes(course.slug as (typeof FEATURED_SLUGS)[number]),
  );

  return (
    <Section>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-2xl font-semibold text-fg md:text-3xl">{t("title")}</h2>
          <p className="mt-2 text-sm text-fg-muted">{t("subtitle")}</p>
        </div>
        <Link
          href={ROUTES.catalog}
          className="flex items-center gap-1 text-sm text-fg-brand hover:text-brand-hover"
        >
          {t("viewAll")}
          <Icon icon={ArrowRight} size="sm" />
        </Link>
      </div>

      <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {courses.map((course) => (
          <li key={course.slug}>
            <Link
              href={ROUTES.catalogCourse(course.slug)}
              className="flex h-full flex-col overflow-hidden rounded-card border border-border bg-surface transition-colors duration-fast ease-standard hover:border-border-strong"
            >
              <CourseArtwork
                art={course.art}
                language={course.language}
                title={course.title}
                className="h-32 w-full"
                markClassName="text-5xl"
              />
              <div className="flex min-w-0 flex-1 flex-col gap-2 p-4">
                <Badge tone={LANGUAGE_TONES[course.language]} size="sm" className="self-start">
                  {tLanguages(course.language)}
                </Badge>
                <h3 className="text-base font-semibold text-fg">{course.title}</h3>
                <p className="line-clamp-2 text-sm text-fg-muted">{course.description}</p>
                <p className="mt-auto pt-2 text-xs text-fg-subtle">
                  {t("lessons", { count: course.lessonCount })}
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}

function InstructorBand() {
  const t = useTranslations("home.instructors");
  return (
    <Section>
      {/* `fg` on `canvas`: the near-black the design system already uses for a quiet call to action. */}
      <div className="flex flex-col items-start gap-5 rounded-dialog bg-fg p-8 text-canvas md:flex-row md:items-center md:justify-between md:p-12">
        <div className="max-w-xl">
          <p className="flex items-center gap-2 text-xs font-semibold tracking-wide uppercase opacity-70">
            <Icon icon={GraduationCap} size="sm" />
            {t("eyebrow")}
          </p>
          <h2 className="mt-3 text-2xl font-semibold md:text-3xl">{t("title")}</h2>
          <p className="mt-3 text-sm opacity-80">{t("body")}</p>
        </div>
        <Button asChild size="lg" className="bg-canvas text-fg hover:bg-surface-hover">
          <Link href={ROUTES.studio}>
            {t("cta")}
            <Icon icon={ArrowRight} size="md" />
          </Link>
        </Button>
      </div>
    </Section>
  );
}

function Closing() {
  const t = useTranslations("home.closing");
  return (
    <Section className="pb-20 text-center md:pb-28">
      <h2 className="text-2xl font-semibold text-fg md:text-3xl">{t("title")}</h2>
      <p className="mt-3 text-sm text-fg-muted">{t("body")}</p>
      <Button asChild size="lg" className="mt-7">
        <Link href={ROUTES.catalog}>
          {t("cta")}
          <Icon icon={ArrowRight} size="md" />
        </Link>
      </Button>
    </Section>
  );
}

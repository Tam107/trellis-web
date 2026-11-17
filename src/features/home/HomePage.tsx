import {
  ArrowRight,
  BarChart3,
  BookOpen,
  GraduationCap,
  Play,
  Sparkles,
  Star,
  Users,
  type LucideIcon,
} from "lucide-react";
import { useTranslations } from "next-intl";
import {
  FEATURED_COURSES,
  MARKETING_FEATURES,
  MARKETING_STATS,
} from "@/entities/marketing/marketing.fixtures";
import type { FeaturedCourse, MarketingFeature, MarketingStat } from "@/entities/marketing/marketing.types";
import { CourseArtwork } from "@/features/learning/CourseArtwork";
import { Link } from "@/i18n/navigation";
import { ROUTES } from "@/shared/constants/routes";
import { Button } from "@/ui/Button";
import { cn } from "@/ui/cn";
import { Icon } from "@/ui/Icon";
import { HeroVisual } from "./HeroVisual";

const STAT_ICONS: Record<MarketingStat["key"], LucideIcon> = {
  learners: Users,
  courses: BookOpen,
  educators: GraduationCap,
  rating: Star,
};

const FEATURE_ICONS: Record<MarketingFeature["key"], LucideIcon> = {
  structured: BookOpen,
  aiPractice: Sparkles,
  progress: BarChart3,
  teach: Users,
};

export function HomePage() {
  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-6 md:px-6">
      <Hero />
      <FeatureStrip />
      <Featured />
      <Closing />
    </main>
  );
}

function Hero() {
  const t = useTranslations("home.hero");
  return (
    <section className="rounded-dialog bg-info-subtle">
      <div className="grid items-center gap-10 p-6 md:p-10 lg:grid-cols-[1fr_0.9fr] lg:gap-14">
        <div className="min-w-0">
          <span className="inline-flex rounded-control bg-surface px-3 py-1 text-xs font-medium text-fg-brand">
            {t("badge")}
          </span>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-fg md:text-4xl xl:text-5xl">
            {t("title")}
          </h1>
          <p className="mt-4 max-w-md text-sm text-fg-muted md:text-base">{t("subtitle")}</p>

          <div className="mt-7 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link href={ROUTES.learn}>
                {t("ctaPrimary")}
                <Icon icon={ArrowRight} size="md" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="secondary" className="bg-surface">
              <Link href={ROUTES.catalog}>{t("ctaSecondary")}</Link>
            </Button>
          </div>

          <Stats />
        </div>

        <HeroVisual />
      </div>
    </section>
  );
}

function Stats() {
  const t = useTranslations("home.stats");
  return (
    <dl className="mt-8 flex flex-wrap gap-y-4">
      {MARKETING_STATS.map((stat, index) => (
        <div
          key={stat.key}
          className={cn("flex items-center gap-2.5 pr-6", index > 0 && "border-l border-border-strong pl-6")}
        >
          <Icon icon={STAT_ICONS[stat.key]} size="lg" className="shrink-0 text-fg-brand" />
          <div className="min-w-0">
            <dd className="text-lg font-semibold text-fg">{stat.value}</dd>
            <dt className="text-xs text-fg-muted">{t(stat.key)}</dt>
          </div>
        </div>
      ))}
    </dl>
  );
}

function FeatureStrip() {
  const t = useTranslations("home.features");
  return (
    <section className="rounded-dialog bg-info-subtle p-6 md:p-8">
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {MARKETING_FEATURES.map((feature, index) => (
          <li
            key={feature.key}
            className={cn(
              "flex items-start gap-3",
              index > 0 && "lg:border-l lg:border-border-strong lg:pl-6",
            )}
          >
            <span className="grid size-10 shrink-0 place-items-center rounded-control bg-surface text-fg-brand">
              <Icon icon={FEATURE_ICONS[feature.key]} size="lg" />
            </span>
            <div className="min-w-0">
              <h2 className="text-sm font-semibold text-fg">{t(`${feature.key}Title`)}</h2>
              <p className="mt-1 text-sm text-fg-muted">{t(`${feature.key}Body`)}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

function Featured() {
  const t = useTranslations("home.featured");
  return (
    <section className="py-4">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="max-w-sm">
          <span className="block h-1 w-10 rounded-control bg-brand" />
          <h2 className="mt-4 text-2xl font-semibold text-fg md:text-3xl">{t("title")}</h2>
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

      <ul className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {FEATURED_COURSES.map((course) => (
          <li key={course.slug}>
            <CourseCard course={course} />
          </li>
        ))}
      </ul>
    </section>
  );
}

function CourseCard({ course }: { course: FeaturedCourse }) {
  const t = useTranslations("home.featured");
  const tLevels = useTranslations("learning.levels");

  return (
    <Link
      href={ROUTES.catalogCourse(course.slug)}
      className="flex h-full flex-col overflow-hidden rounded-card border border-border bg-surface transition-colors duration-fast ease-standard hover:border-border-strong"
    >
      <div className="relative">
        <CourseArtwork
          art={course.art}
          language={course.language}
          title={course.title}
          className="h-32 w-full"
          markClassName="text-4xl"
        />
        <span className="absolute right-3 bottom-3 grid size-7 place-items-center rounded-full bg-surface text-fg shadow-raised">
          <Icon icon={Play} size="sm" aria-label={t("preview", { title: course.title })} />
        </span>
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-1 p-4">
        <h3 className="text-sm font-semibold text-fg">{course.title}</h3>
        <p className="text-xs text-fg-muted">
          {t("meta", { level: tLevels(course.level), weeks: course.weeks })}
        </p>
        <p className="mt-2 flex items-center gap-1.5 text-xs">
          <Icon icon={Star} size="sm" className="fill-current text-warning" />
          <span className="font-semibold text-fg">{course.rating}</span>
          <span className="text-fg-muted">{`(${course.ratingCount})`}</span>
        </p>
      </div>
    </Link>
  );
}

function Closing() {
  const t = useTranslations("home.closing");
  return (
    <section className="flex flex-col items-center gap-6 rounded-dialog bg-info-subtle p-6 text-center md:flex-row md:p-10 md:text-left">
      <span
        aria-hidden
        className="grid size-20 shrink-0 place-items-center rounded-dialog bg-surface text-fg-brand"
      >
        <Icon icon={GraduationCap} size="xl" className="size-10" />
      </span>
      <div className="min-w-0 flex-1 md:border-l md:border-border-strong md:pl-8">
        <h2 className="text-xl font-semibold text-fg md:text-2xl">{t("title")}</h2>
        <p className="mt-2 text-sm text-fg-muted">{t("body")}</p>
      </div>
      <Button asChild size="lg" className="shrink-0">
        <Link href={ROUTES.login}>
          {t("cta")}
          <Icon icon={ArrowRight} size="md" />
        </Link>
      </Button>
    </section>
  );
}

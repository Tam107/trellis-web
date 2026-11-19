import { ArrowRight, BarChart3, BookOpen, Sparkles, Users, type LucideIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import {
  FEATURED_COURSES,
  MARKETING_FEATURES,
  MARKETING_STATS,
} from "@/entities/marketing/marketing.fixtures";
import type { MarketingFeature } from "@/entities/marketing/marketing.types";
import { CourseCard } from "@/features/marketing/CourseCard";
import { Link } from "@/i18n/navigation";
import { ROUTES } from "@/shared/constants/routes";
import { Button } from "@/ui/Button";
import { CallToAction } from "@/ui/CallToAction";
import { Card } from "@/ui/Card";
import { Icon } from "@/ui/Icon";
import { IconTile } from "@/ui/IconTile";
import { PageHero } from "@/ui/PageHero";
import { Section } from "@/ui/Section";
import { HeroVisual } from "./HeroVisual";

const FEATURE_ICONS: Record<MarketingFeature["key"], LucideIcon> = {
  structured: BookOpen,
  aiPractice: Sparkles,
  progress: BarChart3,
  teach: Users,
};

/** The arrow nudges forward when its button is hovered; the button carries `group`. */
const ARROW_CLASSES = "transition-transform duration-normal ease-emphasized group-hover:translate-x-0.5";

/** Hero (tint) → features (canvas) → featured courses (surface) → closing band (brand). */
export function HomePage() {
  const t = useTranslations("home.hero");
  return (
    <main>
      <PageHero
        eyebrow={t("badge")}
        title={t("title")}
        description={t("subtitle")}
        actions={
          <>
            <Button asChild size="lg" className="group">
              <Link href={ROUTES.learn}>
                {t("ctaPrimary")}
                <Icon icon={ArrowRight} size="md" className={ARROW_CLASSES} />
              </Link>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <Link href={ROUTES.courses}>{t("ctaSecondary")}</Link>
            </Button>
          </>
        }
        aside={<HeroVisual />}
      >
        <Stats />
      </PageHero>
      <Features />
      <Featured />
      <Closing />
    </main>
  );
}

/** Figures as type, not tiles: a value over its label, each hung on a short brand rule. */
function Stats() {
  const t = useTranslations("home.stats");
  return (
    <dl className="grid max-w-xl grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-4">
      {MARKETING_STATS.map((stat) => (
        <div key={stat.key} className="flex flex-col-reverse gap-0.5 border-l-2 border-brand pl-3">
          <dt className="text-sm text-fg-muted">{t(stat.key)}</dt>
          <dd className="text-2xl font-bold tracking-tight text-fg">{stat.value}</dd>
        </div>
      ))}
    </dl>
  );
}

function Features() {
  const t = useTranslations("home.features");
  return (
    <Section title={t("title")} description={t("subtitle")}>
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {MARKETING_FEATURES.map((feature) => (
          <li key={feature.key} className="reveal">
            <Card isInteractive className="group h-full">
              <IconTile
                icon={FEATURE_ICONS[feature.key]}
                className="transition-colors duration-normal ease-standard group-hover:bg-brand group-hover:text-on-brand"
              />
              <h3 className="mt-5 text-base font-semibold text-fg">{t(`${feature.key}Title`)}</h3>
              <p className="mt-2 text-sm leading-relaxed text-fg-muted">{t(`${feature.key}Body`)}</p>
            </Card>
          </li>
        ))}
      </ul>
    </Section>
  );
}

function Featured() {
  const t = useTranslations("home.featured");
  return (
    <Section
      variant="surface"
      title={t("title")}
      description={t("subtitle")}
      action={
        <Link
          href={ROUTES.courses}
          className="group flex items-center gap-1.5 text-sm font-semibold text-fg-brand hover:text-brand-hover"
        >
          {t("viewAll")}
          <Icon icon={ArrowRight} size="sm" className={ARROW_CLASSES} />
        </Link>
      }
    >
      <ul className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {FEATURED_COURSES.map((course) => (
          <li key={course.slug} className="reveal">
            <CourseCard course={course} />
          </li>
        ))}
      </ul>
    </Section>
  );
}

function Closing() {
  const t = useTranslations("home.closing");
  return (
    <CallToAction
      title={t("title")}
      description={t("body")}
      actions={
        <Button asChild size="lg" variant="secondary" className="group border-transparent">
          <Link href={ROUTES.login}>
            {t("cta")}
            <Icon icon={ArrowRight} size="md" className={ARROW_CLASSES} />
          </Link>
        </Button>
      }
    />
  );
}

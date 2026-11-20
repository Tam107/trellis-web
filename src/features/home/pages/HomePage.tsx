import { ArrowRight } from "@/ui/icons/lucide";
import { useTranslations } from "next-intl";
import { MARKETING_STATS } from "@/entities/marketing/marketing.fixtures";
import { Link } from "@/i18n/navigation";
import { ROUTES } from "@/shared/constants/routes";
import { Button } from "@astryxdesign/core/Button";
import { CallToAction } from "@/ui/layout/CallToAction";
import { Icon } from "@astryxdesign/core/Icon";
import { PageHero } from "@/ui/layout/PageHero";
import { Section } from "@/ui/layout/Section";
import { FeatureCards } from "../sections/FeatureCards";
import { CountUp } from "../components/CountUp";
import { CourseShelf } from "../sections/CourseShelf";
import { HeroVisual } from "../sections/HeroVisual";
import { TopicMarquee } from "../sections/TopicMarquee";

/** The arrow nudges forward when its button is hovered; the button carries `group`. */
const ARROW_CLASSES = "transition-transform duration-normal ease-emphasized group-hover:translate-x-0.5";

/** Hero (tint) → topic strip (surface) → feature cards (canvas) → course shelf (surface) → closing banner. */
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
            <Button
              variant="primary"
              size="lg"
              className="group"
              endContent={<Icon icon={ArrowRight} size="sm" className={ARROW_CLASSES} />}
              href={ROUTES.learn}
              label={t("ctaPrimary")}
            />
            <Button size="lg" variant="secondary" href={ROUTES.courses} label={t("ctaSecondary")} />
          </>
        }
        aside={<HeroVisual />}
      >
        <Stats />
      </PageHero>
      <TopicMarquee />
      <FeatureCards />
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
          <dd className="text-2xl font-bold tracking-tight text-fg">
            <CountUp value={stat.value} decimals={stat.decimals} suffix={stat.suffix} />
          </dd>
        </div>
      ))}
    </dl>
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
      <CourseShelf />
    </Section>
  );
}

function Closing() {
  const t = useTranslations("home.closing");
  return (
    <CallToAction
      title={t("title")}
      actions={
        <Button
          size="lg"
          variant="secondary"
          className="group border-transparent"
          endContent={<Icon icon={ArrowRight} size="sm" className={ARROW_CLASSES} />}
          href={ROUTES.login}
          label={t("cta")}
        />
      }
    />
  );
}

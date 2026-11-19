import { ArrowRight, Clock3, FileText, LayoutTemplate, PlayCircle, Search } from "lucide-react";
import { useTranslations } from "next-intl";
import { RESOURCE_ITEMS } from "@/entities/marketing/marketing.fixtures";
import type { ResourceItem, ResourceKind } from "@/entities/marketing/marketing.types";
import { Link } from "@/i18n/navigation";
import { ROUTES } from "@/shared/constants/routes";
import { Badge } from "@/ui/Badge";
import { Button } from "@/ui/Button";
import { CallToAction } from "@/ui/CallToAction";
import { cardVariants } from "@/ui/Card";
import { cn } from "@/ui/cn";
import { Icon } from "@/ui/Icon";
import { PageHero } from "@/ui/PageHero";
import { Section } from "@/ui/Section";
import { RESOURCE_KIND_TONE } from "./marketing.tones";

const KIND_ICONS: Record<ResourceKind, typeof FileText> = {
  guide: FileText,
  article: FileText,
  webinar: PlayCircle,
  template: LayoutTemplate,
};

const SAMPLE_COURSE_SLUG = "english-everyday-communication";

/**
 * Each card links to the screen it talks about. Nothing here opens an article that does not exist:
 * the mock has no CMS, so a guide points at the part of the product it describes.
 */
const KIND_TARGETS: Record<ResourceItem["key"], string> = {
  gettingStarted: ROUTES.studioNewCourse,
  courseDesign: ROUTES.studio,
  assessmentDesign: ROUTES.studioQuestionBank,
  aiTutor: ROUTES.learn,
  analytics: ROUTES.studioAnalytics,
  accessibility: ROUTES.studioResources,
};

const ARROW_CLASSES = "transition-transform duration-normal ease-emphasized group-hover:translate-x-1";

/** Hero (tint) → guides (canvas) → closing band (brand). */
export function ResourcesPage() {
  const t = useTranslations("marketing.resources");

  return (
    <main>
      <PageHero eyebrow={t("eyebrow")} title={t("title")} description={t("subtitle")} />

      <Section>
        <ul className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {RESOURCE_ITEMS.map((item) => (
            <li key={item.key} className="reveal">
              <ResourceCard item={item} />
            </li>
          ))}
        </ul>
      </Section>

      <CallToAction
        title={t("helpTitle")}
        description={t("helpBody")}
        actions={
          <>
            <Button asChild size="lg" variant="secondary" className="border-transparent">
              <Link href={ROUTES.search}>
                <Icon icon={Search} size="md" />
                {t("helpSearch")}
              </Link>
            </Button>
            <Button asChild size="lg" variant="ghost" className="text-on-brand hover:bg-surface/15">
              <Link href={ROUTES.catalogCourse(SAMPLE_COURSE_SLUG)}>{t("helpSample")}</Link>
            </Button>
          </>
        }
      />
    </main>
  );
}

function ResourceCard({ item }: { item: ResourceItem }) {
  const t = useTranslations("marketing.resources");

  return (
    <Link
      href={KIND_TARGETS[item.key]}
      className={cn(cardVariants({ size: "lg", isInteractive: true }), "group flex h-full flex-col")}
    >
      <div className="flex items-center justify-between gap-3">
        <Badge tone={RESOURCE_KIND_TONE} icon={<Icon icon={KIND_ICONS[item.kind]} size="sm" />}>
          {t(`kinds.${item.kind}`)}
        </Badge>
        <span className="flex items-center gap-1.5 text-xs text-fg-subtle">
          <Icon icon={Clock3} size="sm" />
          {t("readTime", { minutes: item.readMinutes })}
        </span>
      </div>
      <h2 className="mt-5 text-lg leading-snug font-semibold text-fg transition-colors duration-fast ease-standard group-hover:text-fg-brand">
        {t(`items.${item.key}Title`)}
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-fg-muted">{t(`items.${item.key}Body`)}</p>
      <span className="mt-auto flex items-center gap-1.5 pt-6 text-sm font-semibold text-fg-brand">
        {t(`kinds.${item.kind}`)}
        <Icon icon={ArrowRight} size="sm" className={ARROW_CLASSES} />
      </span>
    </Link>
  );
}

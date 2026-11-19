import { Quote } from "lucide-react";
import { useTranslations } from "next-intl";
import { INSTITUTIONS, TESTIMONIALS } from "@/entities/marketing/marketing.fixtures";
import { Card } from "@/ui/Card";
import { Icon } from "@/ui/Icon";
import { Section } from "@/ui/Section";

function initialsOf(name: string): string {
  return name
    .split(/\s+/)
    .map((word) => word.charAt(0))
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

/**
 * Social proof in two layers: a row of school names, set as type because a made-up logo would be
 * a fake brand, then three quotes. Quote text is content, so it stays in its own language.
 */
export function Testimonials() {
  const t = useTranslations("home.testimonials");
  const [lead, ...rest] = TESTIMONIALS;
  return (
    <Section title={t("title")} description={t("subtitle")}>
      {lead ? (
        <figure className="reveal">
          <Card size="lg" variant="brand" className="relative overflow-hidden">
            <span aria-hidden className="absolute -top-2 right-6 text-brand opacity-15">
              <Icon icon={Quote} size="xl" className="size-24 fill-current" />
            </span>
            <blockquote className="relative max-w-3xl text-xl leading-relaxed font-medium text-balance text-fg md:text-2xl">
              {lead.quote}
            </blockquote>
            <Byline name={lead.name} role={lead.role} />
          </Card>
        </figure>
      ) : null}

      <ul className="mt-5 grid gap-5 md:grid-cols-2">
        {rest.map((item) => (
          <li key={item.key} className="reveal">
            <Card as="figure" isInteractive className="h-full">
              <blockquote className="text-base leading-relaxed text-fg">{item.quote}</blockquote>
              <Byline name={item.name} role={item.role} />
            </Card>
          </li>
        ))}
      </ul>

      <div className="mt-14 reveal">
        <p className="text-center text-sm font-medium text-fg-subtle">{t("logosLabel")}</p>
        <ul className="mt-5 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {INSTITUTIONS.map((institution) => (
            <li
              key={institution.name}
              className="text-lg font-semibold tracking-tight text-fg-subtle transition-colors duration-fast ease-standard hover:text-fg"
            >
              {institution.name}
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}

function Byline({ name, role }: { name: string; role: string }) {
  return (
    <figcaption className="relative mt-6 flex items-center gap-3">
      <span
        aria-hidden
        className="grid size-10 place-items-center rounded-full bg-surface text-sm font-bold text-fg-brand"
      >
        {initialsOf(name)}
      </span>
      <span className="flex flex-col">
        <span className="text-sm font-semibold text-fg">{name}</span>
        <span className="text-xs text-fg-muted">{role}</span>
      </span>
    </figcaption>
  );
}

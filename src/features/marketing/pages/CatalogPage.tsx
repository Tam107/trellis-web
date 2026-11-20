"use client";

import { Search } from "@/ui/icons/lucide";
import { useTranslations } from "next-intl";
import { useMemo, useState } from "react";
import { CATALOG_COURSES } from "@/entities/marketing/marketing.fixtures";
import type { CatalogTopic } from "@/entities/marketing/marketing.types";
import { COURSE_LEVELS, type CourseLevel } from "@/entities/learning/learning.constants";
import { Button } from "@astryxdesign/core/Button";
import { cn } from "@/ui/lib/cn";
import { Card } from "@/ui/card/Card";
import { EmptyState } from "@astryxdesign/core/EmptyState";
import { Icon } from "@astryxdesign/core/Icon";
import { PageHero } from "@/ui/layout/PageHero";
import { Section } from "@/ui/layout/Section";
import { CourseCard } from "../cards/CourseCard";

const TOPICS: readonly CatalogTopic[] = ["language", "business", "academic", "data"];
const LEVELS: readonly CourseLevel[] = [
  COURSE_LEVELS.BEGINNER,
  COURSE_LEVELS.INTERMEDIATE,
  COURSE_LEVELS.ADVANCED,
];

/** `null` is the "All" choice for a filter, which is why the state is nullable rather than a flag. */
export function CatalogPage() {
  const t = useTranslations("marketing.catalog");
  const [query, setQuery] = useState("");
  const [topic, setTopic] = useState<CatalogTopic | null>(null);
  const [level, setLevel] = useState<CourseLevel | null>(null);

  const matches = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return CATALOG_COURSES.filter(
      (course) =>
        (!topic || course.topic === topic) &&
        (!level || course.level === level) &&
        (!needle || course.title.toLowerCase().includes(needle)),
    );
  }, [query, topic, level]);

  const hasFilters = !!query || !!topic || !!level;

  return (
    <main>
      <PageHero eyebrow={t("eyebrow")} title={t("title")} description={t("subtitle")}>
        <label className="flex max-w-xl items-center gap-2.5 rounded-control border border-border bg-surface px-4 py-3 shadow-raised transition-colors duration-fast ease-standard focus-within:border-brand">
          <Icon icon={Search} size="sm" className="shrink-0 text-fg-subtle" />
          <span className="sr-only">{t("searchLabel")}</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={t("searchPlaceholder")}
            className="w-full min-w-0 bg-transparent text-base text-fg outline-none placeholder:text-fg-subtle"
          />
        </label>
      </PageHero>

      <Section>
        <Card className="flex flex-col gap-3">
          <FilterRow label={t("filterTopic")}>
            <Chip isActive={!topic} onClick={() => setTopic(null)}>
              {t("all")}
            </Chip>
            {TOPICS.map((value) => (
              <Chip key={value} isActive={topic === value} onClick={() => setTopic(value)}>
                {t(`topics.${value}`)}
              </Chip>
            ))}
          </FilterRow>
          <FilterRow label={t("filterLevel")}>
            <Chip isActive={!level} onClick={() => setLevel(null)}>
              {t("all")}
            </Chip>
            {LEVELS.map((value) => (
              <LevelChip key={value} value={value} isActive={level === value} onSelect={setLevel} />
            ))}
          </FilterRow>
        </Card>

        <p aria-live="polite" className="mt-8 text-sm font-medium text-fg-muted">
          {t("resultCount", { count: matches.length })}
        </p>

        {matches.length === 0 ? (
          <EmptyState
            className="mt-6"
            title={t("emptyTitle")}
            description={t("emptyBody")}
            actions={
              hasFilters ? (
                <Button
                  variant="secondary"
                  onClick={() => {
                    setQuery("");
                    setTopic(null);
                    setLevel(null);
                  }}
                  label={t("clearFilters")}
                />
              ) : undefined
            }
          />
        ) : (
          <ul className="mt-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {matches.map((course) => (
              <li key={course.slug} className="animate-rise">
                <CourseCard course={course} />
              </li>
            ))}
          </ul>
        )}
      </Section>
    </main>
  );
}

function FilterRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="w-20 shrink-0 text-sm font-medium text-fg-muted">{label}</span>
      {children}
    </div>
  );
}

function Chip({
  isActive,
  onClick,
  children,
}: {
  isActive: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={isActive}
      className={cn(
        "rounded-control border px-3 py-1.5 text-sm font-medium transition-colors duration-fast ease-standard",
        isActive
          ? "border-brand bg-info-subtle text-fg-brand"
          : "border-border bg-surface text-fg-muted hover:border-border-strong hover:text-fg",
      )}
    >
      {children}
    </button>
  );
}

/** Level labels live in the learning namespace, so the chip reads them rather than the catalogue. */
function LevelChip({
  value,
  isActive,
  onSelect,
}: {
  value: CourseLevel;
  isActive: boolean;
  onSelect: (level: CourseLevel) => void;
}) {
  const tLevels = useTranslations("learning.levels");
  return (
    <Chip isActive={isActive} onClick={() => onSelect(value)}>
      {tLevels(value)}
    </Chip>
  );
}

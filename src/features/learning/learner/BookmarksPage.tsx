"use client";

import { useDateLabel } from "@/features/learning/hooks/useDateLabel";
import { Bookmark, TriangleAlert } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { SAVED_ITEMS } from "@/entities/learning/library.fixtures";
import { SAVED_KINDS, type SavedItem, type SavedKind } from "@/entities/learning/library.types";
import { Badge } from "@/ui/primitives/Badge";
import { Button } from "@/ui/primitives/Button";
import { cn } from "@/ui/lib/cn";
import { EmptyState } from "@/ui/feedback/EmptyState";
import { Icon } from "@/ui/primitives/Icon";
import { SHORT_DATE } from "../shared/learning.format";
import { LANGUAGE_TONES } from "../shared/learning.tones";
import { PageHeading } from "../shell/PageHeading";

const ALL = "all";
type Filter = SavedKind | typeof ALL;

export function BookmarksPage() {
  const t = useTranslations("learning.bookmarksPage");
  const tKinds = useTranslations("learning.savedKinds");
  const [filter, setFilter] = useState<Filter>(ALL);

  const items = SAVED_ITEMS.filter((item) => filter === ALL || item.kind === filter);

  return (
    <div className="flex flex-col gap-4">
      <PageHeading
        title={t("title")}
        description={t("description")}
        actions={<Button variant="secondary">{t("review")}</Button>}
      />

      <div className="flex flex-wrap gap-2">
        <FilterChip isActive={filter === ALL} onClick={() => setFilter(ALL)}>
          {t("filterAll")}
        </FilterChip>
        {Object.values(SAVED_KINDS).map((kind) => (
          <FilterChip key={kind} isActive={filter === kind} onClick={() => setFilter(kind)}>
            {tKinds(kind)}
          </FilterChip>
        ))}
      </div>

      {items.length === 0 ? (
        <EmptyState icon={Bookmark} title={t("emptyTitle")} description={t("emptyDescription")} />
      ) : (
        <ul className="grid gap-3 md:grid-cols-2">
          {items.map((item) => (
            <li key={item.id}>
              <SavedCard item={item} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function FilterChip({
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
        "rounded-control px-3 py-1 text-sm",
        isActive ? "bg-info-subtle font-medium text-fg-brand" : "text-fg-muted hover:bg-surface-hover",
      )}
    >
      {children}
    </button>
  );
}

function SavedCard({ item }: { item: SavedItem }) {
  const t = useTranslations("learning.bookmarksPage");
  const tKinds = useTranslations("learning.savedKinds");
  const tLanguages = useTranslations("learning.languages");
  const dateLabel = useDateLabel();

  return (
    <article className="flex h-full flex-col gap-2 rounded-card border border-border bg-surface p-4">
      <div className="flex flex-wrap items-center gap-2">
        <Badge size="sm">{tKinds(item.kind)}</Badge>
        <Badge tone={LANGUAGE_TONES[item.language]} size="sm">
          {tLanguages(item.language)}
        </Badge>
        <span className="ml-auto text-xs text-fg-subtle">
          {t("savedOn", { date: dateLabel(item.savedAt, SHORT_DATE) })}
        </span>
      </div>
      <p className="text-lg font-semibold text-fg">{item.term}</p>
      <p className="text-sm text-fg-muted">{item.meaning}</p>
      <p className="mt-auto text-xs text-fg-subtle">
        {t("source", { course: item.sourceCourse, lesson: item.sourceLesson })}
      </p>
      {/* A saved item outlives the lesson it came from, so the card says so rather than 404ing. */}
      {item.isSourceAvailable ? null : (
        <p className="flex items-center gap-1.5 text-xs text-warning">
          <Icon icon={TriangleAlert} size="sm" />
          {t("sourceGone")}
        </p>
      )}
    </article>
  );
}

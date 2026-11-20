"use client";

import { BookOpen, FileText, Lock, Play, Search, type LucideIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { SAMPLE_QUERY, SEARCH_HITS } from "@/entities/learning/search.fixtures";
import { SEARCH_HIT_KINDS, type SearchHit, type SearchHitKind } from "@/entities/learning/search.types";
import { Badge } from "@/ui/primitives/Badge";
import { Button } from "@/ui/primitives/Button";
import { EmptyState } from "@/ui/feedback/EmptyState";
import { Icon } from "@/ui/primitives/Icon";
import { Input } from "@/ui/form/Input";
import { LANGUAGE_TONES } from "../shared/learning.tones";
import { PageHeading } from "../shell/PageHeading";

const KIND_ICONS: Record<SearchHitKind, LucideIcon> = {
  [SEARCH_HIT_KINDS.COURSE]: BookOpen,
  [SEARCH_HIT_KINDS.LESSON]: Play,
  [SEARCH_HIT_KINDS.RESOURCE]: FileText,
};

/** M26 — search results. The index finds things; the backend decides what may be opened. */
export function SearchResultsPage() {
  const t = useTranslations("learning.searchPage");
  const [query, setQuery] = useState(SAMPLE_QUERY);

  const hits = SEARCH_HITS.filter((hit) =>
    `${hit.title} ${hit.context} ${hit.highlight}`.toLowerCase().includes(query.trim().toLowerCase()),
  );

  return (
    <div className="flex flex-col gap-4">
      <PageHeading title={t("title")} description={t("description")} />

      <label className="flex max-w-xl items-center gap-2 rounded-control border border-border bg-surface px-3 py-2">
        <Icon icon={Search} size="md" className="text-fg-subtle" />
        <span className="sr-only">{t("title")}</span>
        <Input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={t("placeholder")}
          className="h-auto border-0 bg-transparent px-0"
        />
      </label>

      {hits.length === 0 ? (
        <EmptyState icon={Search} title={t("emptyTitle")} description={t("emptyDescription")} />
      ) : (
        <>
          <p className="text-sm text-fg-muted">{t("resultCount", { count: hits.length, query })}</p>
          <ul className="flex flex-col gap-3">
            {hits.map((hit) => (
              <li key={hit.id}>
                <HitRow hit={hit} />
              </li>
            ))}
          </ul>
        </>
      )}

      <p className="text-xs text-fg-subtle">{t("authorityNote")}</p>
    </div>
  );
}

function HitRow({ hit }: { hit: SearchHit }) {
  const t = useTranslations("learning.searchPage");
  const tKinds = useTranslations("learning.searchHitKinds");
  const tLanguages = useTranslations("learning.languages");

  return (
    <article className="flex flex-wrap items-start gap-3 rounded-card border border-border bg-surface p-4">
      <span className="grid size-9 shrink-0 place-items-center rounded-control bg-surface-sunken text-fg-muted">
        <Icon icon={KIND_ICONS[hit.kind]} size="md" />
      </span>
      <div className="min-w-0 flex-1 basis-64">
        <div className="flex flex-wrap items-center gap-2">
          <h2 className="text-sm font-semibold text-fg">{hit.title}</h2>
          <Badge size="sm">{tKinds(hit.kind)}</Badge>
          <Badge tone={LANGUAGE_TONES[hit.language]} size="sm">
            {tLanguages(hit.language)}
          </Badge>
        </div>
        <p className="mt-1 text-xs text-fg-muted">{hit.context}</p>
        {/* The index produces the highlight; the UI never assembles one from the query. */}
        <p className="mt-2 text-sm text-fg-muted italic">{hit.highlight}</p>
        {hit.isOpenable ? null : (
          <p className="mt-2 flex items-center gap-1.5 text-xs text-fg-subtle">
            <Icon icon={Lock} size="sm" />
            {t("metadataOnly")}
          </p>
        )}
      </div>
      <Button variant="secondary" size="sm" disabled={!hit.isOpenable}>
        {t("open")}
      </Button>
    </article>
  );
}

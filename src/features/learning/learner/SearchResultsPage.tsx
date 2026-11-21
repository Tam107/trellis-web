"use client";

import { BookOpen, FileText, Lock, Play, Search } from "@/ui/icons/lucide";
import type { LucideIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { SAMPLE_QUERY, SEARCH_HITS } from "@/entities/learning/search.fixtures";
import { SEARCH_HIT_KINDS, type SearchHit, type SearchHitKind } from "@/entities/learning/search.types";
import { Badge } from "@astryxdesign/core/Badge";
import { Button } from "@astryxdesign/core/Button";
import { EmptyState } from "@astryxdesign/core/EmptyState";
import { Icon } from "@astryxdesign/core/Icon";
import { TextInput } from "@astryxdesign/core/TextInput";
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

      <TextInput
        label={t("title")}
        isLabelHidden
        type="search"
        startIcon={Search}
        value={query}
        onChange={setQuery}
        placeholder={t("placeholder")}
        width="36rem"
      />

      {hits.length === 0 ? (
        <EmptyState
          icon={<Icon icon={Search} size="lg" />}
          title={t("emptyTitle")}
          description={t("emptyDescription")}
        />
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
        <Icon icon={KIND_ICONS[hit.kind]} size="sm" />
      </span>
      <div className="min-w-0 flex-1 basis-64">
        <div className="flex flex-wrap items-center gap-2">
          <h2 className="text-sm font-semibold text-fg">{hit.title}</h2>
          <Badge label={tKinds(hit.kind)} />
          <Badge variant={LANGUAGE_TONES[hit.language]} label={tLanguages(hit.language)} />
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
      <Button variant="secondary" size="sm" isDisabled={!hit.isOpenable} label={t("open")} />
    </article>
  );
}

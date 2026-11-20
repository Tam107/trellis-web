"use client";

import { Search, Users } from "@/ui/icons/lucide";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";
import { NOTICE_AUDIENCES, NOTICE_PAGE_SIZE } from "@/entities/notice/notice.constants";
import { useNotices } from "@/entities/notice/notice.queries";
import { Link } from "@/i18n/navigation";
import { getApiErrorMessage } from "@/shared/api/errors";
import { ROUTES } from "@/shared/constants/routes";
import { useDebouncedCallback } from "@/shared/hooks/useDebouncedCallback";
import { useFeatureFlag } from "@/shared/hooks/useFeatureFlag";
import { EventType, track } from "@/shared/lib/analytics";
import { formatDate } from "@/shared/lib/format";
import { screenStateOf } from "@/shared/lib/screenState";
import { Button } from "@astryxdesign/core/Button";
import { EmptyState } from "@astryxdesign/core/EmptyState";
import { ErrorState } from "@/ui/feedback/ErrorState";
import { Icon } from "@astryxdesign/core/Icon";
import { TextInput } from "@astryxdesign/core/TextInput";
import { PageShell } from "@/ui/layout/PageShell";
import { Skeleton } from "@astryxdesign/core/Skeleton";
import { NoticeSeverityBadge } from "../components/NoticeSeverityBadge";

const SEARCH_INPUT_TYPE = "search";

function NoticeListSkeleton() {
  return (
    <ul className="flex flex-col gap-3">
      {Array.from({ length: NOTICE_PAGE_SIZE }, (_, index) => (
        <li key={index}>
          <Skeleton className="h-16 w-full rounded-card" />
        </li>
      ))}
    </ul>
  );
}

/**
 * Sample feature: a keyset-paged, searchable list. Shows the full pipeline (component -> entity
 * hook -> entity api -> generated client -> http), "load more" over cursor pages, a feature flag,
 * debouncing, analytics and the five screen states.
 */
export function NoticeListPage() {
  const t = useTranslations("notice.list");
  const tAll = useTranslations();
  const locale = useLocale();
  const searchEnabled = useFeatureFlag("noticeSearch");

  // The input updates on every keystroke; only the request is debounced.
  const [searchInput, setSearchInput] = useState("");
  const [query, setQuery] = useState("");
  const applySearch = useDebouncedCallback((value: string) => {
    // A new search is a new query key, so the infinite query starts again from the first page.
    setQuery(value.trim());
    track({ type: EventType.NoticeSearched, queryLength: value.trim().length });
  });

  const notices = useNotices({ first: NOTICE_PAGE_SIZE, query: query || undefined });
  const items = notices.data?.pages.flatMap((page) => page.items);
  const state = screenStateOf(notices, { isEmpty: items?.length === 0 });

  return (
    <PageShell
      title={t("title")}
      description={t("description")}
      actions={
        searchEnabled ? (
          <TextInput
            label={t("searchLabel")}
            isLabelHidden
            type={SEARCH_INPUT_TYPE}
            startIcon={Search}
            value={searchInput}
            placeholder={t("searchPlaceholder")}
            width="18rem"
            onChange={(next) => {
              setSearchInput(next);
              applySearch(next);
            }}
          />
        ) : null
      }
      state={state}
      loading={<NoticeListSkeleton />}
      empty={
        <EmptyState
          title={query ? t("emptySearchTitle") : t("emptyTitle")}
          description={query ? t("emptySearchDescription") : t("emptyDescription")}
        />
      }
      error={
        <ErrorState
          title={t("errorTitle")}
          description={getApiErrorMessage(notices.error, tAll)}
          retryLabel={tAll("common.actions.retry")}
          onRetry={() => void notices.refetch()}
        />
      }
    >
      {items ? (
        <div className="flex flex-col gap-4">
          <ul className="flex flex-col gap-3">
            {items.map((notice) => (
              <li key={notice.code}>
                <Link
                  href={ROUTES.noticeDetail(notice.code)}
                  onClick={() => track({ type: EventType.NoticeOpened, noticeCode: notice.code })}
                  className="flex flex-col gap-2 rounded-card border border-border bg-surface p-4 transition-colors hover:bg-surface-hover sm:flex-row sm:items-center sm:justify-between"
                >
                  <span className="flex min-w-0 items-center gap-2">
                    {notice.audience === NOTICE_AUDIENCES.STAFF ? (
                      <Icon icon={Users} size="sm" className="text-fg-subtle" label={t("staffLabel")} />
                    ) : null}
                    <span className="truncate font-medium text-fg">{notice.title}</span>
                  </span>
                  <span className="flex shrink-0 items-center gap-3 text-sm text-fg-muted">
                    <NoticeSeverityBadge severity={notice.severity} />
                    {notice.publishedAt ? (
                      <time dateTime={notice.publishedAt}>{formatDate(notice.publishedAt, locale)}</time>
                    ) : null}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex justify-center">
            {notices.hasNextPage ? (
              <Button
                variant="secondary"
                size="sm"
                isLoading={notices.isFetchingNextPage}
                onClick={() => void notices.fetchNextPage()}
                label={t("loadMore")}
              />
            ) : (
              <p className="text-sm text-fg-muted">{t("endOfList")}</p>
            )}
          </div>
        </div>
      ) : null}
    </PageShell>
  );
}

"use client";

import { ArrowLeft, SearchX } from "@/ui/icons/lucide";
import { useLocale, useTranslations } from "next-intl";
import { NOTICE_ERROR_MESSAGES } from "@/entities/notice/notice.constants";
import { useNotice } from "@/entities/notice/notice.queries";
import { getApiErrorMessage } from "@/shared/api/errors";
import { ROUTES } from "@/shared/constants/routes";
import { formatDateTime } from "@/shared/lib/format";
import { screenStateOf } from "@/shared/lib/screenState";
import { Button } from "@astryxdesign/core/Button";
import { EmptyState } from "@astryxdesign/core/EmptyState";
import { ErrorState } from "@/ui/feedback/ErrorState";
import { Icon } from "@astryxdesign/core/Icon";
import { PageShell } from "@/ui/layout/PageShell";
import { Prose } from "@/ui/primitives/Prose";
import { Skeleton } from "@astryxdesign/core/Skeleton";
import { NoticeSeverityBadge } from "../components/NoticeSeverityBadge";

/** Detail screen over the GraphQL read model (notice + publication stats in one request). */
export function NoticeDetailPage({ noticeCode }: { noticeCode: string }) {
  const t = useTranslations("notice.detail");
  const tAll = useTranslations();
  const locale = useLocale();
  const notice = useNotice(noticeCode);
  const backLink = (
    <Button
      variant="ghost"
      size="sm"
      icon={<Icon icon={ArrowLeft} size="sm" />}
      href={ROUTES.notices}
      label={t("back")}
    />
  );

  return (
    <PageShell
      actions={backLink}
      state={screenStateOf(notice)}
      loading={
        <div className="flex max-w-3xl flex-col gap-4">
          <Skeleton className="h-8 w-2/3" />
          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-32 w-full rounded-card" />
        </div>
      }
      notFound={
        <EmptyState
          icon={<Icon icon={SearchX} size="lg" />}
          title={t("notFoundTitle")}
          description={t("notFoundDescription")}
          actions={backLink}
        />
      }
      error={
        <ErrorState
          title={t("errorTitle")}
          description={getApiErrorMessage(notice.error, tAll, { codeMessages: NOTICE_ERROR_MESSAGES })}
          retryLabel={tAll("common.actions.retry")}
          onRetry={() => void notice.refetch()}
        />
      }
    >
      {notice.data ? (
        <article className="flex max-w-3xl flex-col gap-4">
          <h1 className="text-2xl font-semibold text-fg">{notice.data.title}</h1>
          <div className="flex flex-wrap items-center gap-3 text-sm text-fg-muted">
            <NoticeSeverityBadge severity={notice.data.severity} />
            {notice.data.publishedAt ? (
              <time dateTime={notice.data.publishedAt}>
                {t("publishedAt", { date: formatDateTime(notice.data.publishedAt, locale) })}
              </time>
            ) : null}
            <span>{t("publishCount", { count: notice.data.stats.publishCount })}</span>
          </div>
          <Prose>
            <p className="whitespace-pre-line">{notice.data.body}</p>
          </Prose>
        </article>
      ) : null}
    </PageShell>
  );
}

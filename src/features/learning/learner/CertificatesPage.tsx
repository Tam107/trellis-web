"use client";

import { useDateLabel } from "@/features/learning/hooks/useDateLabel";
import { Award, Download } from "@/ui/icons/lucide";
import { useTranslations } from "next-intl";
import { CERTIFICATES } from "@/entities/learning/teaching.fixtures";
import { Button } from "@astryxdesign/core/Button";
import { EmptyState } from "@astryxdesign/core/EmptyState";
import { Icon } from "@astryxdesign/core/Icon";
import { SHORT_DATE } from "../shared/learning.format";
import { PageHeading } from "../shell/PageHeading";

export function CertificatesPage() {
  const t = useTranslations("learning.certificatesPage");
  const dateLabel = useDateLabel();

  return (
    <div className="flex flex-col gap-4">
      <PageHeading title={t("title")} description={t("description")} />

      {CERTIFICATES.length === 0 ? (
        <EmptyState
          icon={<Icon icon={Award} size="lg" />}
          title={t("emptyTitle")}
          description={t("emptyDescription")}
        />
      ) : (
        <ul className="grid gap-3 md:grid-cols-2">
          {CERTIFICATES.map((row) => (
            <li key={row.id}>
              <article className="flex h-full items-start gap-3 rounded-card border border-border bg-surface p-4">
                <span className="grid size-10 shrink-0 place-items-center rounded-control bg-warning-subtle text-warning">
                  <Icon icon={Award} size="md" />
                </span>
                <div className="min-w-0 flex-1">
                  <h2 className="text-sm font-semibold text-fg">{row.studentName}</h2>
                  <p className="text-xs text-fg-muted">{row.courseTitle}</p>
                  <p className="mt-1 text-xs text-fg-subtle">
                    {t("issuedOn", { date: dateLabel(row.issuedAt, SHORT_DATE) })}
                  </p>
                  {/* The serial, not the PDF, is what a third party checks. */}
                  <p className="mt-1 font-mono text-xs text-fg">{t("serial", { serial: row.serial })}</p>
                </div>
                <Button
                  variant="secondary"
                  size="sm"
                  icon={<Icon icon={Download} size="sm" />}
                  label={t("download")}
                />
              </article>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

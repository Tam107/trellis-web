"use client";

import { useDateLabel } from "@/features/learning/hooks/useDateLabel";
import { CircleCheck, CircleX, Clock, FolderOpen, Upload } from "@/ui/icons/lucide";
import type { LucideIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { ASSETS } from "@/entities/learning/teaching.fixtures";
import { SCAN_STATES, type AssetRow, type ScanState } from "@/entities/learning/teaching.types";
import { Badge } from "@astryxdesign/core/Badge";
import { Button } from "@astryxdesign/core/Button";
import { cn } from "@/ui/lib/cn";
import { EmptyState } from "@astryxdesign/core/EmptyState";
import { Icon } from "@astryxdesign/core/Icon";
import { SHORT_DATE, toMegabytes } from "../shared/learning.format";
import { PageHeading } from "../shell/PageHeading";

const SCAN_ICONS: Record<ScanState, LucideIcon> = {
  [SCAN_STATES.PENDING]: Clock,
  [SCAN_STATES.CLEAN]: CircleCheck,
  [SCAN_STATES.REJECTED]: CircleX,
};

const SCAN_TONES: Record<ScanState, string> = {
  [SCAN_STATES.PENDING]: "text-warning",
  [SCAN_STATES.CLEAN]: "text-success",
  [SCAN_STATES.REJECTED]: "text-danger",
};

function scanTone(state: ScanState) {
  return state === SCAN_STATES.CLEAN ? "success" : state === SCAN_STATES.REJECTED ? "error" : "warning";
}

/** M19 — uploaded files. A file is not servable until it has been scanned (FR-051). */
export function ResourceLibraryPage() {
  const t = useTranslations("learning.resourcesPage");

  return (
    <div className="flex flex-col gap-4">
      <PageHeading
        title={t("title")}
        description={t("description")}
        actions={<Button variant="primary" icon={<Icon icon={Upload} size="sm" />} label={t("upload")} />}
      />

      {ASSETS.length === 0 ? (
        <EmptyState
          icon={<Icon icon={FolderOpen} size="lg" />}
          title={t("emptyTitle")}
          description={t("emptyDescription")}
        />
      ) : (
        <>
          <ul className="flex flex-col gap-3">
            {ASSETS.map((asset) => (
              <li key={asset.id}>
                <AssetCard asset={asset} />
              </li>
            ))}
          </ul>
          <p className="text-xs text-fg-subtle">{t("pendingNote")}</p>
        </>
      )}
    </div>
  );
}

function AssetCard({ asset }: { asset: AssetRow }) {
  const t = useTranslations("learning.resourcesPage");
  const tStates = useTranslations("learning.scanStates");
  const tUnits = useTranslations("learning.units");
  const dateLabel = useDateLabel();

  return (
    <article className="flex flex-wrap items-center gap-4 rounded-card border border-border bg-surface p-4">
      <Icon
        icon={SCAN_ICONS[asset.scanState]}
        size="md"
        className={cn("shrink-0", SCAN_TONES[asset.scanState])}
      />
      <div className="min-w-0 flex-1 basis-64">
        <h2 className="truncate text-sm font-semibold text-fg">{asset.fileName}</h2>
        <p className="mt-0.5 flex flex-wrap items-center gap-3 text-xs text-fg-muted">
          <span>{asset.mimeType}</span>
          <span>{tUnits("fileSize", { size: toMegabytes(asset.sizeBytes) })}</span>
          <span>{t("uploadedOn", { date: dateLabel(asset.uploadedAt, SHORT_DATE) })}</span>
        </p>
        {asset.rejectedReason === "" ? null : (
          <p className="mt-1 text-xs text-danger">{t("rejectedReason", { reason: asset.rejectedReason })}</p>
        )}
      </div>
      <Badge variant={scanTone(asset.scanState)} label={tStates(asset.scanState)} />
    </article>
  );
}

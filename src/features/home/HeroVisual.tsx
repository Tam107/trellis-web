import { Play, Sparkles, User } from "lucide-react";
import { useTranslations } from "next-intl";
import { HERO_PROGRESS_PERCENT } from "@/entities/marketing/marketing.fixtures";
import { Icon } from "@/ui/Icon";
import { ProgressRing } from "@/ui/ProgressRing";

/**
 * The hero's right half: a portrait with three cards floating over it.
 *
 * The repo ships no photography, so the portrait is a stand-in — drop a file in and this is the
 * one place to swap for `<Image>`; the cards are positioned against this box, not the photo, so
 * they stay where they are. Overlapping here is the design, and it is safe because the cards sit
 * over artwork inside a fixed-ratio box, never over text that can reflow.
 */
export function HeroVisual() {
  const t = useTranslations("home.hero");

  return (
    <div className="relative mx-auto aspect-square w-full max-w-lg">
      {/* The lavender blob the portrait sits in. */}
      <div aria-hidden className="absolute inset-x-6 top-4 bottom-0 rounded-dialog bg-brand/10" />

      {/* Portrait stand-in. */}
      <div
        aria-hidden
        className="absolute inset-x-12 top-10 bottom-0 grid place-items-end justify-center overflow-hidden rounded-dialog"
      >
        <span className="grid size-48 place-items-center rounded-t-dialog bg-surface-sunken text-fg-subtle md:size-64">
          <Icon icon={User} size="xl" className="size-24" />
        </span>
      </div>

      {/* Progress card, upper left. */}
      <div className="absolute top-[6%] left-0 w-44 rounded-card bg-surface p-3 shadow-raised md:w-52 md:p-4">
        <p className="text-xs font-medium text-fg md:text-sm">{t("progressTitle")}</p>
        <div className="mt-2 flex items-center gap-3">
          <ProgressRing
            value={HERO_PROGRESS_PERCENT}
            label={t("progressTitle")}
            className="size-10 shrink-0 md:size-12"
          />
          <div className="min-w-0">
            <p className="text-base font-semibold text-fg md:text-lg">{`${HERO_PROGRESS_PERCENT}%`}</p>
            <p className="text-xs text-fg-muted">{t("progressCaption")}</p>
          </div>
        </div>
      </div>

      {/* AI tutor card, lower left, offset so the two read as a stack. */}
      <div className="absolute top-[38%] left-[4%] flex w-48 items-start gap-2.5 rounded-card bg-surface p-3 shadow-raised md:w-56 md:p-4">
        <span className="grid size-7 shrink-0 place-items-center rounded-control bg-info-subtle text-fg-brand md:size-8">
          <Icon icon={Sparkles} size="md" />
        </span>
        <div className="min-w-0">
          <p className="text-xs font-semibold text-fg md:text-sm">{t("tutorTitle")}</p>
          <p className="mt-0.5 text-xs text-fg-muted">{t("tutorBody")}</p>
        </div>
      </div>

      {/* Video card, upper right, hanging past the edge as in the design. */}
      <div className="absolute top-[14%] -right-2 hidden w-40 overflow-hidden rounded-card bg-surface p-2 shadow-raised sm:block md:w-48">
        <div className="relative grid aspect-video place-items-center rounded-control bg-surface-sunken">
          <span className="grid size-9 place-items-center rounded-full bg-surface text-fg-brand shadow-raised">
            <Icon icon={Play} size="md" aria-label={t("playLabel")} />
          </span>
        </div>
        <div className="mt-2 h-1 rounded-control bg-surface-sunken">
          <div className="h-full w-1/3 rounded-control bg-brand" />
        </div>
      </div>
    </div>
  );
}

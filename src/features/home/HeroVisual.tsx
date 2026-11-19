import Image from "next/image";
import { Play, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";
import { HERO_PROGRESS_PERCENT, HERO_VIDEO } from "@/entities/marketing/marketing.fixtures";
import { cn } from "@/ui/cn";
import { Icon } from "@/ui/Icon";
import { IconTile } from "@/ui/IconTile";
import { ProgressRing } from "@/ui/ProgressRing";

/**
 * The hero's right half: a portrait with three cards floating over it.
 *
 * The cards are positioned against this box rather than against the picture, so a different crop
 * does not move them. Overlapping is the design here, and it is safe: the cards sit over artwork
 * inside a fixed-ratio box, never over text that can reflow.
 */
export function HeroVisual() {
  const t = useTranslations("home.hero");

  return (
    <div className="relative mx-auto aspect-4/5 w-full max-w-md">
      {/* A white mat around the photo, like a print, so it sits on the tinted hero instead of in it. */}
      <div aria-hidden className="absolute inset-0 rounded-dialog bg-surface shadow-raised" />

      {/*
        The photo fills the frame. The cards clear the subject by hanging past the left and right
        edges instead, which is also what keeps the composition tight: an inset photo would leave a
        wide band of empty colour around it.
      */}
      <div className="absolute inset-2 overflow-hidden rounded-dialog">
        <Image
          src="/images/hero-learner.jpg"
          alt={t("portraitAlt")}
          fill
          sizes={PORTRAIT_SIZES}
          className="object-cover object-center"
          priority
        />
      </div>

      <div className={cn(FLOATING_CARD_CLASSES, "top-[10%] -left-5 w-[46%] md:-left-8")}>
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

      <div
        className={cn(
          FLOATING_CARD_CLASSES,
          "top-[46%] -left-3 flex w-[50%] items-start gap-2.5 stagger-6 md:-left-6",
        )}
      >
        <IconTile icon={Sparkles} />
        <div className="min-w-0">
          <p className="text-xs font-semibold text-fg md:text-sm">{t("tutorTitle")}</p>
          <p className="mt-0.5 text-xs text-fg-muted">{t("tutorBody")}</p>
        </div>
      </div>

      <VideoCard />
    </div>
  );
}

/**
 * The lesson player, mocked: a still from the lesson, a play control, elapsed time and a bar at
 * the point the learner stopped. It is a picture of the player, not the player — the real one
 * lives in the course screen.
 */
function VideoCard() {
  const t = useTranslations("home.hero");
  const video = HERO_VIDEO;
  const percent = Math.round((video.playedSeconds / video.durationSeconds) * 100);

  return (
    <figure className="absolute top-[6%] -right-5 hidden w-[42%] animate-float overflow-hidden rounded-card border border-border bg-surface p-2 shadow-raised stagger-3 sm:block md:-right-8">
      <div className="relative overflow-hidden rounded-control">
        <Image
          src="/images/hero-lesson.jpg"
          alt={t("videoAlt")}
          width={320}
          height={180}
          sizes={VIDEO_SIZES}
          className="aspect-video w-full object-cover object-center"
        />
        <span className="absolute inset-0 grid place-items-center">
          <span className="grid size-9 place-items-center rounded-full bg-surface text-fg-brand shadow-raised">
            <Icon icon={Play} size="md" aria-label={t("playLabel")} />
          </span>
        </span>
        <span className="absolute right-1.5 bottom-1.5 rounded-control bg-overlay px-1.5 py-0.5 text-xs text-on-overlay">
          {formatClock(video.durationSeconds)}
        </span>
      </div>

      <figcaption className="mt-2 flex items-center gap-2">
        <span className="text-xs text-fg-muted">{formatClock(video.playedSeconds)}</span>
        <span className="h-1 flex-1 rounded-control bg-surface-sunken">
          <span
            className="block h-full origin-left animate-grow-x rounded-control bg-brand stagger-8"
            style={{ width: `${percent}%` }}
          />
        </span>
      </figcaption>
    </figure>
  );
}

/**
 * Each card drifts on its own clock (a different `stagger-*` delay), so the three never move in
 * step; moving together would read as the whole picture wobbling.
 */
const FLOATING_CARD_CLASSES =
  "absolute animate-float rounded-card border border-border bg-surface p-3 shadow-raised md:p-4";

/** `sizes` is a layout hint for the browser, not copy, so it is declared once here. */
const PORTRAIT_SIZES = "(min-width: 1024px) 32rem, 100vw";
const VIDEO_SIZES = "(min-width: 1024px) 16rem, 50vw";

const SECONDS_PER_MINUTE = 60;

/** Timestamps read as digits, so they stay out of i18n. */
function formatClock(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / SECONDS_PER_MINUTE);
  const seconds = totalSeconds % SECONDS_PER_MINUTE;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

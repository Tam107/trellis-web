import { Play } from "lucide-react";
import type { CourseArt } from "@/entities/learning/learning.constants";
import { CourseArtwork } from "./CourseArtwork";
import { formatClock } from "./learning.format";
import { cn } from "@/ui/cn";
import { Icon } from "@/ui/Icon";

const SECONDS_PER_MINUTE = 60;

export type CourseThumbnailProps = {
  art: CourseArt;
  /** The photo's alt text. */
  title: string;
  /** Printed over the photo, thumbnail-style. Decorative: the title below says the same thing. */
  hook: string;
  durationMinutes: number;
  /** Shown under the play button, e.g. "Preview"; the button alone otherwise. */
  playLabel?: string;
  /** Keep the play button visible instead of only on hover, for a single preview player. */
  isPlayVisible?: boolean;
  sizes?: string;
  className?: string;
};

/**
 * A course pictured like a video thumbnail: the photo under a dark corner scrim, a short hook in
 * heavy type, the total length in the corner and a play button on hover.
 *
 * Every hover effect hangs off a `group` on the nearest link or card, so the whole tile reacts,
 * not only the picture. The scrim keeps the white type readable on any photo in both themes.
 */
export function CourseThumbnail({
  art,
  title,
  hook,
  durationMinutes,
  playLabel,
  isPlayVisible = false,
  sizes,
  className,
}: CourseThumbnailProps) {
  return (
    <div
      className={cn(
        "relative isolate aspect-video overflow-hidden rounded-card bg-surface-sunken",
        className,
      )}
    >
      <CourseArtwork
        art={art}
        title={title}
        sizes={sizes}
        className="absolute inset-0"
        imageClassName="transition-transform duration-slow ease-standard group-hover:scale-105"
      />
      <span aria-hidden className="absolute inset-0 bg-linear-to-tr from-overlay via-overlay/40" />

      <span
        aria-hidden
        className="absolute bottom-3 left-3 max-w-[70%] text-xl leading-none font-black tracking-tight text-balance text-on-overlay uppercase text-shadow-md sm:text-2xl"
      >
        {hook}
      </span>

      <span className="absolute right-2 bottom-2 rounded-control bg-overlay px-1.5 py-0.5 text-xs font-semibold text-on-overlay tabular-nums">
        {formatClock(durationMinutes * SECONDS_PER_MINUTE)}
      </span>

      <span
        aria-hidden
        className={cn(
          // The dim makes the play label readable on a bright photo; it fades in with the button.
          "absolute inset-0 grid place-items-center bg-overlay transition-opacity duration-normal ease-standard",
          isPlayVisible ? "opacity-100" : "opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100",
        )}
      >
        <span className="flex flex-col items-center gap-2">
          <span className="grid h-11 w-16 place-items-center rounded-dialog bg-danger text-on-overlay shadow-raised transition-transform duration-normal ease-emphasized group-hover:scale-110">
            <Icon icon={Play} size="xl" className="fill-current" />
          </span>
          {playLabel ? (
            <span className="text-sm font-semibold text-on-overlay text-shadow-md">{playLabel}</span>
          ) : null}
        </span>
      </span>
    </div>
  );
}

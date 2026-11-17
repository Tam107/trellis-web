import { Building2, Flower2, GraduationCap, Landmark, Sparkles, Tent, type LucideIcon } from "lucide-react";
import {
  COURSE_ART,
  COURSE_LANGUAGES,
  type CourseArt,
  type CourseLanguage,
} from "@/entities/learning/learning.constants";
import { cn } from "@/ui/cn";
import { Icon } from "@/ui/Icon";

/**
 * Course thumbnails stand in for photography: the mock ships no image assets.
 *
 * A grey tile with a small grey icon reads as a broken image, so the placeholder is deliberate
 * instead: tinted by the course language, carrying the title's initial as its mark, with the
 * topic icon small in the corner. Swap this one file for `<Image>` when artwork exists.
 */
const ART_ICONS: Record<CourseArt, LucideIcon> = {
  [COURSE_ART.LANDMARK]: Landmark,
  [COURSE_ART.CITY]: Building2,
  [COURSE_ART.CAMPUS]: GraduationCap,
  [COURSE_ART.BLOSSOM]: Flower2,
  [COURSE_ART.LANTERN]: Tent,
  [COURSE_ART.SKYLINE]: Sparkles,
};

const LANGUAGE_SURFACES: Record<CourseLanguage, string> = {
  [COURSE_LANGUAGES.ENGLISH]: "bg-info-subtle text-fg-brand",
  [COURSE_LANGUAGES.CHINESE]: "bg-danger-subtle text-danger",
};

export type CourseArtworkProps = {
  art: CourseArt;
  language: CourseLanguage;
  /** Its first character becomes the mark; the full title stays on the card itself. */
  title: string;
  className?: string;
  /** Size of the initial, so a 64px tile and a full-width banner both read well. */
  markClassName?: string;
};

export function CourseArtwork({ art, language, title, className, markClassName }: CourseArtworkProps) {
  return (
    <div
      aria-hidden
      className={cn(
        "relative grid place-items-center overflow-hidden",
        LANGUAGE_SURFACES[language],
        className,
      )}
    >
      <span className={cn("leading-none font-semibold opacity-90", markClassName ?? "text-2xl")}>
        {title.slice(0, 1)}
      </span>
      <Icon icon={ART_ICONS[art]} size="sm" className="absolute right-1.5 bottom-1.5 opacity-50" />
    </div>
  );
}

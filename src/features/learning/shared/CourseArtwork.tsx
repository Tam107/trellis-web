import Image from "next/image";
import { COURSE_ART, type CourseArt } from "@/entities/learning/learning.constants";
import { cn } from "@/ui/cn";

/**
 * A course thumbnail.
 *
 * The art key, not the slug, picks the photograph: a fixture names the mood it wants
 * (`campus`, `city`, …) and six images cover the catalogue, so adding a course needs no new asset.
 */
const ART_IMAGES: Record<CourseArt, string> = {
  [COURSE_ART.LANDMARK]: "/images/courses/landmark.jpg",
  [COURSE_ART.CITY]: "/images/courses/city.jpg",
  [COURSE_ART.CAMPUS]: "/images/courses/campus.jpg",
  [COURSE_ART.BLOSSOM]: "/images/courses/blossom.jpg",
  [COURSE_ART.LANTERN]: "/images/courses/lantern.jpg",
  [COURSE_ART.SKYLINE]: "/images/courses/skyline.jpg",
};

/** A four-up grid at desktop, two-up at tablet, full width on a phone. */
const DEFAULT_SIZES = "(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw";

export type CourseArtworkProps = {
  art: CourseArt;
  /** Used as the image's alt text, so the card does not announce the title twice. */
  title: string;
  className?: string;
  /** Passed to `next/image`; the default suits a four-up card grid. */
  sizes?: string;
  /** On the photo itself, e.g. a zoom driven by the card's `group-hover`. */
  imageClassName?: string;
};

export function CourseArtwork({ art, title, className, sizes, imageClassName }: CourseArtworkProps) {
  return (
    <div className={cn("relative overflow-hidden bg-surface-sunken", className)}>
      <Image
        src={ART_IMAGES[art]}
        alt={title}
        fill
        sizes={sizes ?? DEFAULT_SIZES}
        className={cn("object-cover", imageClassName)}
      />
    </div>
  );
}

import {
  ATTEMPT_STATES,
  COURSE_LANGUAGES,
  PUBLISH_STATES,
  type CourseLanguage,
  type PublishState,
  type AttemptState,
} from "@/entities/learning/learning.constants";
import type { BadgePropsDefaults } from "@/ui/Badge";

type BadgeTone = BadgePropsDefaults["tone"];

/** Badge tones by domain value, so a screen never spells a tone inline. */
export const LANGUAGE_TONES: Record<CourseLanguage, BadgeTone> = {
  [COURSE_LANGUAGES.ENGLISH]: "brand",
  [COURSE_LANGUAGES.CHINESE]: "danger",
};

export const PUBLISH_TONES: Record<PublishState, BadgeTone> = {
  [PUBLISH_STATES.DRAFT]: "warning",
  [PUBLISH_STATES.PUBLISHED]: "success",
};

export const TAG_TONE: BadgeTone = "brand";

export const ATTEMPT_STATE_TONES: Record<AttemptState, BadgeTone> = {
  [ATTEMPT_STATES.IN_PROGRESS]: "info",
  [ATTEMPT_STATES.GRADING]: "info",
  [ATTEMPT_STATES.GRADED]: "success",
  [ATTEMPT_STATES.EXPIRED]: "warning",
  [ATTEMPT_STATES.INVALID]: "warning",
};

/** Helpers, not records: a record keyed by a literal still puts that literal in the JSX. */
export function passTone(isPassed: boolean): BadgeTone {
  return isPassed ? "success" : "danger";
}

export function editionTone(isOpen: boolean): BadgeTone {
  return isOpen ? "success" : "neutral";
}

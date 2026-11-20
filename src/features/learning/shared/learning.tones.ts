import { ATTEMPT_STATES, type AttemptState } from "@/entities/learning/assessment.constants";
import { COURSE_LANGUAGES, type CourseLanguage } from "@/entities/learning/learning.constants";
import { PUBLISH_STATES, type PublishState } from "@/entities/learning/studio.constants";
import type { BadgePropsDefaults } from "@/ui/primitives/Badge";

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

export function frozenTone(isFrozen: boolean): BadgeTone {
  return isFrozen ? "warning" : "neutral";
}

export function submissionTone(isWaiting: boolean): BadgeTone {
  return isWaiting ? "warning" : "success";
}

/** Badges that always carry the same tone, named so no screen spells one inline. */
export const UNREAD_TONE: BadgeTone = "brand";
export const AT_RISK_TONE: BadgeTone = "warning";

/** The eyebrow badge on the landing page. */
export const EYEBROW_TONE: BadgeTone = "brand";

/** The "you are enrolled" mark on a course page. */
export const ENROLLED_TONE: BadgeTone = "success";

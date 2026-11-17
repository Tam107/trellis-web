/**
 * Enum-like values for the learning screens. Every value doubles as an i18n key segment
 * (`t(`levels.${level}`)`), so they are camelCase and must match the `learning` namespace.
 */

export const COURSE_LANGUAGES = { ENGLISH: "english", CHINESE: "chinese" } as const;
export type CourseLanguage = (typeof COURSE_LANGUAGES)[keyof typeof COURSE_LANGUAGES];

export const COURSE_LEVELS = {
  BEGINNER: "beginner",
  INTERMEDIATE: "intermediate",
  ADVANCED: "advanced",
} as const;
export type CourseLevel = (typeof COURSE_LEVELS)[keyof typeof COURSE_LEVELS];

export const COURSE_SKILLS = {
  SPEAKING: "speaking",
  LISTENING: "listening",
  READING: "reading",
  WRITING: "writing",
  GRAMMAR: "grammar",
  VOCABULARY: "vocabulary",
} as const;
export type CourseSkill = (typeof COURSE_SKILLS)[keyof typeof COURSE_SKILLS];

export const COURSE_FORMATS = {
  SELF_PACED: "selfPaced",
  LIVE_CLASS: "liveClass",
  COHORT: "cohort",
} as const;
export type CourseFormat = (typeof COURSE_FORMATS)[keyof typeof COURSE_FORMATS];

/** Drives the card's primary action: enrol, or carry on where the learner stopped. */
export const ENROLMENT_STATES = { NOT_ENROLLED: "notEnrolled", ENROLLED: "enrolled" } as const;
export type EnrolmentState = (typeof ENROLMENT_STATES)[keyof typeof ENROLMENT_STATES];

export const LESSON_STATES = {
  COMPLETED: "completed",
  IN_PROGRESS: "inProgress",
  NOT_STARTED: "notStarted",
  LOCKED: "locked",
} as const;
export type LessonState = (typeof LESSON_STATES)[keyof typeof LESSON_STATES];

export const LESSON_KINDS = { VIDEO: "video", READING: "reading", PRACTICE: "practice" } as const;
export type LessonKind = (typeof LESSON_KINDS)[keyof typeof LESSON_KINDS];

export const CATALOG_SORTS = { POPULAR: "popular", NEWEST: "newest", SHORTEST: "shortest" } as const;
export type CatalogSort = (typeof CATALOG_SORTS)[keyof typeof CATALOG_SORTS];

export const CATALOG_VIEWS = { GRID: "grid", LIST: "list" } as const;
export type CatalogView = (typeof CATALOG_VIEWS)[keyof typeof CATALOG_VIEWS];

/** `all` is the extra chip beside the two languages, not a course language. */
export const CATALOG_LANGUAGE_FILTER_ALL = "all";

export const LESSON_TABS = {
  OVERVIEW: "overview",
  NOTES: "notes",
  RESOURCES: "resources",
  QNA: "qna",
} as const;
export type LessonTab = (typeof LESSON_TABS)[keyof typeof LESSON_TABS];

export const STUDIO_TABS = {
  CONTENT: "content",
  DETAILS: "details",
  SETTINGS: "settings",
  ANALYTICS: "analytics",
} as const;
export type StudioTab = (typeof STUDIO_TABS)[keyof typeof STUDIO_TABS];

export const LESSON_EDITOR_TABS = {
  DETAILS: "lessonDetails",
  CONTENT: "content",
  RESOURCES: "resources",
  ASSESSMENT: "assessment",
} as const;
export type LessonEditorTab = (typeof LESSON_EDITOR_TABS)[keyof typeof LESSON_EDITOR_TABS];

export const PUBLISH_STATES = { DRAFT: "draft", PUBLISHED: "published" } as const;
export type PublishState = (typeof PUBLISH_STATES)[keyof typeof PUBLISH_STATES];

export const LESSON_VISIBILITIES = { VISIBLE: "visible", HIDDEN: "hidden" } as const;
export type LessonVisibility = (typeof LESSON_VISIBILITIES)[keyof typeof LESSON_VISIBILITIES];

/** How far a learner got with one assessment question; drives the navigator's colours. */
export const QUESTION_STATES = {
  ANSWERED: "answered",
  FLAGGED: "flagged",
  UNTOUCHED: "untouched",
} as const;
export type QuestionState = (typeof QUESTION_STATES)[keyof typeof QUESTION_STATES];

/** Answer keys are letters in the UI; the index into `options` is what the code carries. */
export const ANSWER_LETTERS = ["A", "B", "C", "D"] as const;

/** Thumbnails have no artwork in the mock: each course picks one of these tinted placeholders. */
export const COURSE_ART = {
  LANDMARK: "landmark",
  CITY: "city",
  CAMPUS: "campus",
  BLOSSOM: "blossom",
  LANTERN: "lantern",
  SKYLINE: "skyline",
} as const;
export type CourseArt = (typeof COURSE_ART)[keyof typeof COURSE_ART];

/**
 * Which side of the product the LMS chrome shows. It lives here, not beside the shell component:
 * the shell is a `"use client"` module, and a server component importing a value from one gets a
 * client-reference proxy, so `SHELL_ROLES.INSTRUCTOR` would read as undefined in a route.
 */
export const SHELL_ROLES = { LEARNER: "learner", INSTRUCTOR: "instructor" } as const;
export type ShellRole = (typeof SHELL_ROLES)[keyof typeof SHELL_ROLES];

/* ------------------------------------------------------------------------------------------------
 * Batch A: enrolment, lesson gating and assessment attempts (plan 13, §2).
 * ---------------------------------------------------------------------------------------------- */

/** How a learner gets into an edition. Payment is out of P0 (SRS §1.3), so `paid` is a label only. */
export const ENROLMENT_POLICIES = { FREE: "free", INVITE: "invite", PAID: "paid" } as const;
export type EnrolmentPolicy = (typeof ENROLMENT_POLICIES)[keyof typeof ENROLMENT_POLICIES];

/**
 * What enrolling answered. `alreadyEnrolled` is the idempotent case (BR-01): the same enrolment
 * comes back, no second row, and the UI must say so instead of looking like it worked twice.
 */
export const ENROLMENT_RESULTS = {
  CREATED: "created",
  ALREADY_ENROLLED: "alreadyEnrolled",
  EDITION_CLOSED: "editionClosed",
  EDITION_FULL: "editionFull",
} as const;
export type EnrolmentResult = (typeof ENROLMENT_RESULTS)[keyof typeof ENROLMENT_RESULTS];

/** Why a lesson is not open yet. The reason is shown, never just a padlock. */
export const LESSON_LOCK_REASONS = { PREREQUISITE: "prerequisite", PASS_SCORE: "passScore" } as const;
export type LessonLockReason = (typeof LESSON_LOCK_REASONS)[keyof typeof LESSON_LOCK_REASONS];

export const ATTEMPT_STATES = {
  IN_PROGRESS: "inProgress",
  GRADING: "grading",
  GRADED: "graded",
  EXPIRED: "expired",
  INVALID: "invalid",
} as const;
export type AttemptState = (typeof ATTEMPT_STATES)[keyof typeof ATTEMPT_STATES];

/** Which attempt counts towards the course grade (BR-15). */
export const GRADING_RULES = { BEST: "best", LAST: "last", AVERAGE: "average", FIRST: "first" } as const;
export type GradingRule = (typeof GRADING_RULES)[keyof typeof GRADING_RULES];

/** When answers and feedback become visible (BR-18). */
export const REVEAL_POLICIES = {
  AFTER_FINALIZE: "afterFinalize",
  AFTER_CLOSE: "afterClose",
  NEVER: "never",
} as const;
export type RevealPolicy = (typeof REVEAL_POLICIES)[keyof typeof REVEAL_POLICIES];

/** What the start screen must do before it lets the learner in (BR-17). */
export const ATTEMPT_ENTRIES = {
  START: "start",
  RESUME: "resume",
  NO_ATTEMPTS_LEFT: "noAttemptsLeft",
  EXPIRED: "expired",
} as const;
export type AttemptEntry = (typeof ATTEMPT_ENTRIES)[keyof typeof ATTEMPT_ENTRIES];

/** Outcome of one graded question, for the result screen's per-question list. */
export const ANSWER_OUTCOMES = { CORRECT: "correct", INCORRECT: "incorrect", PENDING: "pending" } as const;
export type AnswerOutcome = (typeof ANSWER_OUTCOMES)[keyof typeof ANSWER_OUTCOMES];

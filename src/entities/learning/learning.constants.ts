/**
 * Values shared by every learning screen: the vocabulary of courses and lessons.
 * Narrower sets live beside the screens that own them (assessment.constants.ts, studio.constants.ts).
 */

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
 * The three roles this product has.
 *
 * `learner` is the only one scoped to its own records — own enrolments, own attempts, own notes.
 * Every other role reads across people, and that is what makes it a role rather than a permission.
 * A teaching assistant is an instructor with a narrower scope, so it is a permission, not a role.
 * Operations work (projection rebuild, DLQ replay, trace) is not product UI and has no role here.
 *
 * It lives in this module, not beside the shell component: the shell is a `"use client"` module,
 * and a server component importing a value from one gets a client-reference proxy, so
 * `SHELL_ROLES.INSTRUCTOR` would read as undefined in a route.
 */
export const SHELL_ROLES = {
  LEARNER: "learner",
  INSTRUCTOR: "instructor",
  ADMIN: "admin",
} as const;
export type ShellRole = (typeof SHELL_ROLES)[keyof typeof SHELL_ROLES];

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

/** Which scale a course declares its levels on. The two never convert into each other (BR-12). */
export const LEVEL_FRAMEWORKS = { CEFR: "cefr", CHINESE_CURRICULUM: "chineseCurriculum" } as const;
export type LevelFramework = (typeof LEVEL_FRAMEWORKS)[keyof typeof LEVEL_FRAMEWORKS];

/** Which area of the product the chrome is showing; one account can hold both (decision Q3). */
export const SHELL_VIEWS = { LEARN: "learn", STUDIO: "studio" } as const;
export type ShellView = (typeof SHELL_VIEWS)[keyof typeof SHELL_VIEWS];

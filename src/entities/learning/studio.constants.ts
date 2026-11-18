/**
 * Authoring vocabulary: tabs, publish state, question banks.
 */

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

/** One row of the pre-publish checklist. `pending` blocks publishing just as `fail` does. */
export const PUBLISH_CHECK_STATES = { PASS: "pass", FAIL: "fail", PENDING: "pending" } as const;
export type PublishCheckState = (typeof PUBLISH_CHECK_STATES)[keyof typeof PUBLISH_CHECK_STATES];

export const QUESTION_KINDS = {
  SINGLE_CHOICE: "singleChoice",
  MULTI_CHOICE: "multiChoice",
  SHORT_ANSWER: "shortAnswer",
  ESSAY: "essay",
} as const;
export type QuestionKind = (typeof QUESTION_KINDS)[keyof typeof QUESTION_KINDS];

export const QUESTION_DIFFICULTIES = { EASY: "easy", MEDIUM: "medium", HARD: "hard" } as const;
export type QuestionDifficulty = (typeof QUESTION_DIFFICULTIES)[keyof typeof QUESTION_DIFFICULTIES];

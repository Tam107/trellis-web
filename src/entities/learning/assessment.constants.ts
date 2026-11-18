/**
 * Attempt, grading and reveal vocabulary. Every value is also an i18n key segment.
 */

/** How far a learner got with one assessment question; drives the navigator's colours. */
export const QUESTION_STATES = {
  ANSWERED: "answered",
  FLAGGED: "flagged",
  UNTOUCHED: "untouched",
} as const;
export type QuestionState = (typeof QUESTION_STATES)[keyof typeof QUESTION_STATES];

/** Answer keys are letters in the UI; the index into `options` is what the code carries. */
export const ANSWER_LETTERS = ["A", "B", "C", "D"] as const;

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

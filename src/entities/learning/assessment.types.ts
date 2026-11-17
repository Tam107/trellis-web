/**
 * Assessments, attempts and results.
 */

import {
  type AnswerOutcome,
  type AttemptState,
  type GradingRule,
  type QuestionState,
  type RevealPolicy,
} from "./assessment.constants";

export type AssessmentQuestion = {
  id: string;
  /** 1-based, shown to the learner. */
  number: number;
  prompt: string;
  points: number;
  /** Chinese sentences in an English UI: rendered with `lang` so the CJK stack applies. */
  optionsLang: string;
  options: readonly string[];
  state: QuestionState;
};

export type Assessment = {
  id: string;
  courseTitle: string;
  title: string;
  questions: readonly AssessmentQuestion[];
  answeredCount: number;
  flaggedCount: number;
  attempt: number;
  attemptsAllowed: number;
  /** Seconds left; the mock does not tick. */
  timeRemainingSeconds: number;
};

/** Rules the learner is told before starting, all of them server-owned (BR-16, BR-17). */
export type AssessmentPolicy = {
  maxAttempts: number;
  timeLimitMinutes: number;
  passScore: number;
  gradingRule: GradingRule;
  revealPolicy: RevealPolicy;
  /** Frozen revisions the grade will cite (BR-05). */
  assessmentRevision: string;
  gradingRuleRevision: string;
};

export type AttemptHistoryRow = {
  id: string;
  number: number;
  state: AttemptState;
  startedAt: string;
  /** Absent while the attempt is in progress or expired unmarked. */
  score?: number;
  /** An invalid attempt is excluded from the grading rule, and the row says why. */
  isCountedTowardsGrade: boolean;
};

export type QuestionResult = {
  questionId: string;
  number: number;
  prompt: string;
  outcome: AnswerOutcome;
  pointsEarned: number;
  pointsPossible: number;
  /** Shown only when the reveal policy allows it; the screen checks, not the caller. */
  feedback: string;
};

/** A grade correction. Append-only: a new row never replaces an old one (BR-06). */
export type GradeAdjustment = {
  id: string;
  actor: string;
  reason: string;
  fromScore: number;
  toScore: number;
  at: string;
};

export type AttemptResult = {
  attemptId: string;
  assessmentId: string;
  assessmentTitle: string;
  courseTitle: string;
  number: number;
  state: AttemptState;
  submittedAt: string;
  score: number;
  maxScore: number;
  /** What counts for the course after the grading rule is applied across attempts (BR-15). */
  effectiveScore: number;
  isPassed: boolean;
  policy: AssessmentPolicy;
  questions: readonly QuestionResult[];
  adjustments: readonly GradeAdjustment[];
};

/**
 * Sample assessment, attempts and one graded result.
 */

import {
  ANSWER_OUTCOMES,
  ATTEMPT_STATES,
  GRADING_RULES,
  QUESTION_STATES,
  REVEAL_POLICIES,
} from "./assessment.constants";
import {
  type Assessment,
  type AssessmentPolicy,
  type AttemptHistoryRow,
  type AttemptResult,
} from "./assessment.types";

const SECONDS_PER_MINUTE = 60;
const CHINESE = "zh";

export const SAMPLE_ASSESSMENT: Assessment = {
  id: "chinese-i-unit-4",
  courseTitle: "Chinese I",
  title: "Unit 4 — Language in everyday life",
  attempt: 1,
  attemptsAllowed: 2,
  answeredCount: 2,
  flaggedCount: 1,
  timeRemainingSeconds: 8 * SECONDS_PER_MINUTE + 24,
  questions: [
    {
      id: "q1",
      number: 1,
      prompt: "",
      points: 2,
      optionsLang: CHINESE,
      options: [],
      state: QUESTION_STATES.ANSWERED,
    },
    {
      id: "q2",
      number: 2,
      prompt: "",
      points: 2,
      optionsLang: CHINESE,
      options: [],
      state: QUESTION_STATES.ANSWERED,
    },
    {
      id: "q3",
      number: 3,
      prompt: "Which Chinese sentence means “I usually go to the library on weekends”?",
      points: 2,
      optionsLang: CHINESE,
      options: ["我昨天去了图书馆。", "我每天都去图书馆。", "我周末通常去图书馆。", "我想去图书馆。"],
      state: QUESTION_STATES.UNTOUCHED,
    },
    {
      id: "q4",
      number: 4,
      prompt: "",
      points: 2,
      optionsLang: CHINESE,
      options: [],
      state: QUESTION_STATES.UNTOUCHED,
    },
    {
      id: "q5",
      number: 5,
      prompt: "",
      points: 2,
      optionsLang: CHINESE,
      options: [],
      state: QUESTION_STATES.UNTOUCHED,
    },
    {
      id: "q6",
      number: 6,
      prompt: "",
      points: 2,
      optionsLang: CHINESE,
      options: [],
      state: QUESTION_STATES.UNTOUCHED,
    },
    {
      id: "q7",
      number: 7,
      prompt: "",
      points: 2,
      optionsLang: CHINESE,
      options: [],
      state: QUESTION_STATES.UNTOUCHED,
    },
    {
      id: "q8",
      number: 8,
      prompt: "",
      points: 2,
      optionsLang: CHINESE,
      options: [],
      state: QUESTION_STATES.FLAGGED,
    },
    {
      id: "q9",
      number: 9,
      prompt: "",
      points: 2,
      optionsLang: CHINESE,
      options: [],
      state: QUESTION_STATES.UNTOUCHED,
    },
    {
      id: "q10",
      number: 10,
      prompt: "",
      points: 2,
      optionsLang: CHINESE,
      options: [],
      state: QUESTION_STATES.UNTOUCHED,
    },
  ],
};

/** The question the mock opens on; the others carry no prompt. */
export const SAMPLE_ASSESSMENT_OPEN_QUESTION_ID = "q3";

/**
 * Policy numbers taken from the SRS's *proposed* defaults D-05..D-10. They are not approved, so
 * they live together here: when a decision is ratified, this block is the only thing that changes.
 */
export const PROPOSED_ASSESSMENT_POLICY: AssessmentPolicy = {
  maxAttempts: 2,
  timeLimitMinutes: 10,
  passScore: 80,
  gradingRule: GRADING_RULES.BEST,
  revealPolicy: REVEAL_POLICIES.AFTER_FINALIZE,
  assessmentRevision: "rev-7",
  gradingRuleRevision: "gr-2",
};

export const ATTEMPT_HISTORY: readonly AttemptHistoryRow[] = [
  {
    id: "attempt-1",
    number: 1,
    state: ATTEMPT_STATES.GRADED,
    startedAt: "2026-01-22T08:00:00Z",
    score: 72,
    isCountedTowardsGrade: true,
  },
  {
    id: "attempt-2",
    number: 2,
    state: ATTEMPT_STATES.GRADED,
    startedAt: "2026-01-26T13:30:00Z",
    score: 86,
    isCountedTowardsGrade: true,
  },
];

/** An attempt that was abandoned and timed out: shown so the "excluded" row is drawn from day one. */
export const EXPIRED_ATTEMPT: AttemptHistoryRow = {
  id: "attempt-0",
  number: 0,
  state: ATTEMPT_STATES.EXPIRED,
  startedAt: "2026-01-20T10:00:00Z",
  isCountedTowardsGrade: false,
};

export const ATTEMPT_RESULT: AttemptResult = {
  attemptId: "attempt-2",
  assessmentId: "chinese-i-unit-4",
  assessmentTitle: "Unit 4 — Language in everyday life",
  courseTitle: "Chinese I",
  number: 2,
  state: ATTEMPT_STATES.GRADED,
  submittedAt: "2026-01-26T13:38:00Z",
  score: 86,
  maxScore: 100,
  effectiveScore: 86,
  isPassed: true,
  policy: PROPOSED_ASSESSMENT_POLICY,
  adjustments: [
    {
      id: "adj-1",
      actor: "Instructor",
      reason: "Question 7 accepted a second correct word order.",
      fromScore: 84,
      toScore: 86,
      at: "2026-01-27T09:15:00Z",
    },
  ],
  questions: [
    {
      questionId: "q1",
      number: 1,
      prompt: "Choose the correct measure word for 书.",
      outcome: ANSWER_OUTCOMES.CORRECT,
      pointsEarned: 2,
      pointsPossible: 2,
      feedback: "本 is the measure word for bound volumes.",
    },
    {
      questionId: "q2",
      number: 2,
      prompt: "Which sentence asks about someone's weekend plans?",
      outcome: ANSWER_OUTCOMES.CORRECT,
      pointsEarned: 2,
      pointsPossible: 2,
      feedback: "打算 signals an intention rather than a fact.",
    },
    {
      questionId: "q3",
      number: 3,
      prompt: "Which Chinese sentence means “I usually go to the library on weekends”?",
      outcome: ANSWER_OUTCOMES.INCORRECT,
      pointsEarned: 0,
      pointsPossible: 2,
      feedback: "通常 marks a habit; 昨天 puts the sentence in the past.",
    },
    {
      questionId: "q4",
      number: 4,
      prompt: "Write one sentence about your daily routine.",
      outcome: ANSWER_OUTCOMES.PENDING,
      pointsEarned: 0,
      pointsPossible: 4,
      feedback: "",
    },
  ],
};

/**
 * The second submit of the same attempt. It is a separate fixture, not a timer or a race: the
 * point of BR-04 is that the server returns the *same* grade, which a mock can only state.
 */
export const ATTEMPT_RESULT_DUPLICATE_SUBMIT: AttemptResult = {
  ...ATTEMPT_RESULT,
  adjustments: [],
};

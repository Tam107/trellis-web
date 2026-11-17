import type {
  AnswerOutcome,
  AttemptState,
  CatalogSort,
  CourseArt,
  CourseFormat,
  CourseLanguage,
  CourseLevel,
  CourseSkill,
  EnrolmentPolicy,
  EnrolmentState,
  GradingRule,
  LessonKind,
  LessonLockReason,
  LessonState,
  LessonVisibility,
  PublishState,
  QuestionState,
  RevealPolicy,
} from "./learning.constants";

/**
 * Shapes for the learning screens. They are deliberately UI-shaped read models, not the backend's
 * entities: when `trellis-backend` publishes the learning-content contract, these get replaced by
 * the generated types and only this file changes.
 */

export type Learner = {
  name: string;
  /** Shown in the avatar; the mock has no uploaded images. */
  initials: string;
};

export type CourseSummary = {
  slug: string;
  title: string;
  description: string;
  language: CourseLanguage;
  level: CourseLevel;
  art: CourseArt;
  enrolment: EnrolmentState;
  lessonCount: number;
  /** Total length in minutes; formatted for display, never stored pre-formatted. */
  durationMinutes: number;
  isSaved: boolean;
};

/** A course the learner has started: the catalog card plus where they stopped. */
export type CourseInProgress = {
  slug: string;
  title: string;
  language: CourseLanguage;
  art: CourseArt;
  currentLessonNumber: number;
  currentLessonTitle: string;
  /** 0-100. */
  percentComplete: number;
};

export type CatalogFacet<V extends string> = {
  value: V;
  count: number;
};

export type CatalogFilters = {
  languages: readonly CatalogFacet<CourseLanguage>[];
  levels: readonly CatalogFacet<CourseLevel>[];
  skills: readonly CatalogFacet<CourseSkill>[];
  formats: readonly CatalogFacet<CourseFormat>[];
};

export type CatalogQuery = {
  search: string;
  languages: readonly CourseLanguage[];
  levels: readonly CourseLevel[];
  skills: readonly CourseSkill[];
  formats: readonly CourseFormat[];
  sort: CatalogSort;
};

/** One tile in the dashboard's progress strip. The label is an i18n key segment. */
export type LearningStat = {
  key: "coursesInProgress" | "lessonsCompleted" | "learningTime" | "progressVsLastMonth";
  value: string;
};

export type Achievement = {
  key: "consistentLearner" | "dayStreak" | "lessonMaster";
  icon: "trophy" | "flame" | "star";
};

export type WeeklyGoal = {
  key: "completeLessons" | "studyHours" | "reviewNotes" | "practiceSpeaking" | "takeQuiz";
  isDone: boolean;
};

export type WeeklyProgress = {
  percent: number;
  goalsDone: number;
  goalsTotal: number;
  /** ISO dates; formatted with the active locale at render time. */
  fromDate: string;
  toDate: string;
  goals: readonly WeeklyGoal[];
};

export type Lesson = {
  id: string;
  title: string;
  kind: LessonKind;
  state: LessonState;
  durationSeconds: number;
  /** Paragraphs of a reading lesson; empty for a video. */
  body?: readonly string[];
  /** Present only while `state` is `locked`, and it always says what unlocks it. */
  lock?: LessonLock;
};

export type CourseModule = {
  id: string;
  title: string;
  lessons: readonly Lesson[];
};

export type CourseGoal = {
  key: "completeAllLessons" | "buildVocabulary" | "holdConversation" | "takeQuiz";
  isDone: boolean;
};

export type CourseResource = {
  id: string;
  title: string;
  /** File size in bytes; formatted for display. */
  sizeBytes: number;
};

export type CourseDetail = {
  slug: string;
  title: string;
  level: CourseLevel;
  language: CourseLanguage;
  art: CourseArt;
  modules: readonly CourseModule[];
  /** The lesson the player opens on. */
  currentLessonId: string;
  currentLessonNumber: number;
  lessonCount: number;
  percentComplete: number;
  notes: readonly string[];
  goals: readonly CourseGoal[];
  resources: readonly CourseResource[];
};

export type StudioLesson = {
  id: string;
  /** Instructor-facing number, e.g. `1.1`; it is content, not an index. */
  number: string;
  title: string;
  kind: LessonKind;
  durationMinutes: number;
};

export type StudioModule = {
  id: string;
  number: number;
  title: string;
  lessons: readonly StudioLesson[];
  durationMinutes: number;
};

export type StudioLessonDraft = {
  id: string;
  number: string;
  title: string;
  kind: LessonKind;
  durationMinutes: number;
  description: string;
  objectives: readonly string[];
  mediaFileName: string;
  mediaSizeBytes: number;
  mediaDurationSeconds: number;
  visibility: LessonVisibility;
  tags: readonly string[];
};

export type StudioCourse = {
  slug: string;
  title: string;
  art: CourseArt;
  language: CourseLanguage;
  publishState: PublishState;
  /** Minutes since the autosave, so the mock does not go stale on screen. */
  savedMinutesAgo: number;
  modules: readonly StudioModule[];
  openLesson: StudioLessonDraft;
};

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

/* ------------------------------------------------------------------------------------------------
 * Batch A: enrolment, lesson gating and assessment attempts (plan 13, §2).
 * ---------------------------------------------------------------------------------------------- */

/** One run of a course that a learner can join. Enrolment pins the version (D-05). */
export type CourseEdition = {
  id: string;
  /** Course version this edition serves; an enrolment stays on it (BR-19). */
  version: string;
  label: string;
  policy: EnrolmentPolicy;
  seatsTaken: number;
  seatsTotal: number;
  isOpen: boolean;
};

/** A learning outcome on one scale. The two scales never convert into each other (BR-12). */
export type OutcomeDescriptor = {
  id: string;
  scale: "cefr" | "chineseCurriculum";
  /** Scale version, because a descriptor's wording changes between editions. */
  scaleVersion: string;
  label: string;
};

/** The public course page a visitor sees. Lesson bodies are not part of it (D-12). */
export type CoursePublicDetail = {
  slug: string;
  title: string;
  summary: string;
  language: CourseLanguage;
  level: CourseLevel;
  art: CourseArt;
  lessonCount: number;
  durationMinutes: number;
  outcomes: readonly OutcomeDescriptor[];
  /** Titles only: a visitor sees the shape of the course, not its content. */
  outlinePreview: readonly { id: string; title: string; lessonCount: number }[];
  editions: readonly CourseEdition[];
  enrolment: EnrolmentState;
};

export type MyCourseRow = {
  slug: string;
  title: string;
  language: CourseLanguage;
  art: CourseArt;
  /** The version this enrolment is pinned to, shown because it may trail the latest (BR-19). */
  pinnedVersion: string;
  percentComplete: number;
  lastActivityAt: string;
  dueAt?: string;
};

export type LessonLock = {
  reason: LessonLockReason;
  /** Title of the lesson that has to be finished first; empty for a pass-score lock. */
  requiredLessonTitle: string;
  requiredScore?: number;
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

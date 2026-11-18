/**
 * Courses, lessons and the catalogue, as the screens read them.
 */

import {
  type CatalogSort,
  type CourseArt,
  type CourseFormat,
  type CourseLanguage,
  type CourseLevel,
  type CourseSkill,
  type EnrolmentPolicy,
  type EnrolmentState,
  type LessonKind,
  type LessonLockReason,
  type LessonState,
} from "./learning.constants";

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

/**
 * What an instructor authors and publishes.
 */

import { type AssessmentPolicy } from "./assessment.types";
import { type OutcomeDescriptor } from "./course.types";
import {
  type CourseArt,
  type CourseLanguage,
  type EnrolmentPolicy,
  type LessonKind,
  type LevelFramework,
} from "./learning.constants";
import {
  type LessonVisibility,
  type PublishCheckState,
  type PublishState,
  type QuestionDifficulty,
  type QuestionKind,
} from "./studio.constants";

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

export type StudioCourseRow = {
  slug: string;
  title: string;
  language: CourseLanguage;
  art: CourseArt;
  publishState: PublishState;
  /** How many versions exist; a draft has none published yet. */
  versionCount: number;
  learnerCount: number;
  updatedAt: string;
};

/** What creating a course asks for. The framework decides which levels are offered (BR-12). */
export type CourseDraftInput = {
  title: string;
  language: CourseLanguage;
  framework: LevelFramework;
  level: string;
  summary: string;
};

export type StudioCourseDetails = {
  summary: string;
  outcomes: readonly OutcomeDescriptor[];
  enrolmentPolicy: EnrolmentPolicy;
  /** True once a version is published: the published snapshot is immutable (BR-03). */
  hasPublishedVersion: boolean;
};

/** One gate in front of publishing. The message is an i18n key segment, not a sentence. */
export type PublishCheck = {
  id: string;
  state: PublishCheckState;
  /** Extra detail the check found, e.g. the lesson that has no media. Empty when there is none. */
  detail: string;
};

/**
 * A revision of a question. Once an assessment references it, it is frozen: editing would change
 * what an already-graded attempt was marked against (BR-05).
 */
export type QuestionRevision = {
  id: string;
  number: number;
  createdAt: string;
  isFrozen: boolean;
  /** Assessments that cite this revision; a non-empty list is why it is frozen. */
  usedBy: readonly string[];
};

export type Question = {
  id: string;
  prompt: string;
  kind: QuestionKind;
  difficulty: QuestionDifficulty;
  points: number;
  language: CourseLanguage;
  revisions: readonly QuestionRevision[];
};

/** A quiz being assembled. Publishing it freezes the revisions it cites. */
export type AssessmentDraft = {
  id: string;
  title: string;
  courseTitle: string;
  publishState: PublishState;
  /** Question revision ids, in the order learners will see them. */
  selectedRevisionIds: readonly string[];
  policy: AssessmentPolicy;
  /** True when the policy itself has not been versioned yet (BR-16). */
  isPolicyUnversioned: boolean;
};

/** The learner's own things: saved items, notes, messages and a study plan. */
import type { CourseLanguage } from "./learning.constants";

export const SAVED_KINDS = { VOCABULARY: "vocabulary", GRAMMAR: "grammar", LESSON: "lesson" } as const;
export type SavedKind = (typeof SAVED_KINDS)[keyof typeof SAVED_KINDS];

export type SavedItem = {
  id: string;
  kind: SavedKind;
  /** The word, the pattern, or the lesson title. */
  term: string;
  meaning: string;
  sourceCourse: string;
  sourceLesson: string;
  language: CourseLanguage;
  savedAt: string;
  /** A saved item can outlive the lesson it came from, and the row has to say so. */
  isSourceAvailable: boolean;
};

export type LearnerNote = {
  id: string;
  courseTitle: string;
  lessonTitle: string;
  updatedAt: string;
  body: readonly string[];
};

export type MessageThread = {
  id: string;
  /** Who the learner is talking to. */
  correspondent: string;
  role: "instructor" | "support";
  courseTitle: string;
  lastMessage: string;
  lastMessageAt: string;
  unreadCount: number;
};

export const STUDY_SESSION_STATES = { DONE: "done", TODAY: "today", PLANNED: "planned" } as const;
export type StudySessionState = (typeof STUDY_SESSION_STATES)[keyof typeof STUDY_SESSION_STATES];

export type StudySession = {
  id: string;
  date: string;
  courseTitle: string;
  focus: string;
  minutes: number;
  state: StudySessionState;
};

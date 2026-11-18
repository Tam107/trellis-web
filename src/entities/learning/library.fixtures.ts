/** Sample saved items, notes, message threads and a planned week. */
import { COURSE_LANGUAGES } from "./learning.constants";
import {
  SAVED_KINDS,
  STUDY_SESSION_STATES,
  type LearnerNote,
  type MessageThread,
  type SavedItem,
  type StudySession,
} from "./library.types";

export const SAVED_ITEMS: readonly SavedItem[] = [
  {
    id: "saved-zhoumo",
    kind: SAVED_KINDS.VOCABULARY,
    term: "周末",
    meaning: "weekend",
    sourceCourse: "Chinese I: Foundations",
    sourceLesson: "Numbers and Dates",
    language: COURSE_LANGUAGES.CHINESE,
    savedAt: "2026-01-25T20:44:00Z",
    isSourceAvailable: true,
  },
  {
    id: "saved-tongchang",
    kind: SAVED_KINDS.GRAMMAR,
    term: "通常 + verb",
    meaning: "marks a habit: usually, as a rule",
    sourceCourse: "Chinese I: Foundations",
    sourceLesson: "Numbers and Dates",
    language: COURSE_LANGUAGES.CHINESE,
    savedAt: "2026-01-25T20:46:00Z",
    isSourceAvailable: true,
  },
  {
    id: "saved-making-plans",
    kind: SAVED_KINDS.LESSON,
    term: "Making Plans",
    meaning: "Suggesting a time, accepting and declining politely",
    sourceCourse: "English for Everyday Communication",
    sourceLesson: "Lesson 5",
    language: COURSE_LANGUAGES.ENGLISH,
    savedAt: "2026-01-24T09:20:00Z",
    isSourceAvailable: true,
  },
  {
    id: "saved-old-worksheet",
    kind: SAVED_KINDS.LESSON,
    term: "Ordering at a restaurant",
    meaning: "Saved from a lesson that has since been unpublished",
    sourceCourse: "Business Chinese",
    sourceLesson: "Lesson 2",
    language: COURSE_LANGUAGES.CHINESE,
    savedAt: "2025-12-18T11:05:00Z",
    isSourceAvailable: false,
  },
];

export const LEARNER_NOTES: readonly LearnerNote[] = [
  {
    id: "note-roadmap",
    courseTitle: "English & Chinese for Everyday Communication",
    lessonTitle: "Welcome & Course Roadmap",
    updatedAt: "2026-01-24T09:30:00Z",
    body: [
      "This course helps me build practical English and Chinese skills for daily life.",
      "Focus: vocabulary, real conversations, and cultural tips.",
      "My goal: handle greetings, shopping, dining, and travel.",
    ],
  },
  {
    id: "note-tones",
    courseTitle: "Chinese I: Foundations",
    lessonTitle: "Chinese Pronunciation (Pinyin)",
    updatedAt: "2026-01-21T18:12:00Z",
    body: [
      "Four tones: flat, rising, dipping, falling.",
      "The third tone is rarely said in full — it dips and stops.",
      "Practise tone pairs, not single syllables.",
    ],
  },
];

export const MESSAGE_THREADS: readonly MessageThread[] = [
  {
    id: "thread-ms-chen",
    correspondent: "Ms Chen",
    role: "instructor",
    courseTitle: "Chinese I: Foundations",
    lastMessage: "Your tone practice is improving. Try the Unit 4 recording before Friday.",
    lastMessageAt: "2026-01-26T14:02:00Z",
    unreadCount: 2,
  },
  {
    id: "thread-mr-hughes",
    correspondent: "Mr Hughes",
    role: "instructor",
    courseTitle: "English for Everyday Communication",
    lastMessage: "I have left feedback on your Lesson 5 writing task.",
    lastMessageAt: "2026-01-23T08:41:00Z",
    unreadCount: 0,
  },
  {
    id: "thread-support",
    correspondent: "Trellis support",
    role: "support",
    courseTitle: "Account",
    lastMessage: "Your certificate download should work now. Let us know if it does not.",
    lastMessageAt: "2026-01-14T16:20:00Z",
    unreadCount: 0,
  },
];

export const STUDY_SESSIONS: readonly StudySession[] = [
  {
    id: "plan-mon",
    date: "2026-01-26",
    courseTitle: "Chinese I: Foundations",
    focus: "Unit 4 vocabulary",
    minutes: 30,
    state: STUDY_SESSION_STATES.DONE,
  },
  {
    id: "plan-tue",
    date: "2026-01-27",
    courseTitle: "English for Everyday Communication",
    focus: "Lesson 5: Making Plans",
    minutes: 25,
    state: STUDY_SESSION_STATES.TODAY,
  },
  {
    id: "plan-wed",
    date: "2026-01-28",
    courseTitle: "Chinese I: Foundations",
    focus: "Tone pairs practice",
    minutes: 20,
    state: STUDY_SESSION_STATES.PLANNED,
  },
  {
    id: "plan-thu",
    date: "2026-01-29",
    courseTitle: "English for Everyday Communication",
    focus: "Listening: short dialogues",
    minutes: 30,
    state: STUDY_SESSION_STATES.PLANNED,
  },
  {
    id: "plan-fri",
    date: "2026-01-30",
    courseTitle: "Chinese I: Foundations",
    focus: "Unit 4 quiz",
    minutes: 15,
    state: STUDY_SESSION_STATES.PLANNED,
  },
];

/**
 * Sample authoring state: draft courses, publish checks, question bank.
 */

import { PROPOSED_ASSESSMENT_POLICY } from "./assessment.fixtures";
import {
  COURSE_ART,
  COURSE_LANGUAGES,
  ENROLMENT_POLICIES,
  LESSON_KINDS,
  LEVEL_FRAMEWORKS,
  type LevelFramework,
} from "./learning.constants";
import {
  LESSON_VISIBILITIES,
  PUBLISH_CHECK_STATES,
  PUBLISH_STATES,
  QUESTION_DIFFICULTIES,
  QUESTION_KINDS,
} from "./studio.constants";
import {
  type AssessmentDraft,
  type PublishCheck,
  type Question,
  type StudioCourse,
  type StudioCourseDetails,
  type StudioCourseRow,
} from "./studio.types";

const SECONDS_PER_MINUTE = 60;

export const STUDIO_COURSE: StudioCourse = {
  slug: "chinese-for-beginners",
  title: "Chinese for Beginners",
  art: COURSE_ART.BLOSSOM,
  language: COURSE_LANGUAGES.CHINESE,
  publishState: PUBLISH_STATES.DRAFT,
  savedMinutesAgo: 2,
  modules: [
    {
      id: "getting-started",
      number: 1,
      title: "Getting Started",
      durationMinutes: 45,
      lessons: [
        {
          id: "pinyin",
          number: "1.1",
          title: "Chinese Pronunciation (Pinyin)",
          kind: LESSON_KINDS.VIDEO,
          durationMinutes: 12,
        },
        {
          id: "greetings",
          number: "1.2",
          title: "Basic Greetings",
          kind: LESSON_KINDS.READING,
          durationMinutes: 15,
        },
        {
          id: "practice-greetings",
          number: "1.3",
          title: "Practice: Greetings",
          kind: LESSON_KINDS.PRACTICE,
          durationMinutes: 10,
        },
      ],
    },
    { id: "numbers-dates", number: 2, title: "Numbers & Dates", durationMinutes: 60, lessons: [] },
    {
      id: "everyday-conversation",
      number: 3,
      title: "Everyday Conversation",
      durationMinutes: 75,
      lessons: [],
    },
    { id: "culture-daily-life", number: 4, title: "Culture & Daily Life", durationMinutes: 50, lessons: [] },
  ],
  openLesson: {
    id: "pinyin",
    number: "1.1",
    title: "Chinese Pronunciation (Pinyin)",
    kind: LESSON_KINDS.VIDEO,
    durationMinutes: 12,
    description:
      "Learn the basics of Mandarin pronunciation, including pinyin, the four tones, and common pronunciation rules. By the end of this lesson, you will be able to read and pronounce simple Chinese words with confidence.",
    objectives: [
      "Understand what pinyin is and how it works.",
      "Learn and practice the four tones in Mandarin.",
      "Pronounce common syllables and simple words correctly.",
    ],
    mediaFileName: "pinyin-intro.mp4",
    mediaSizeBytes: 238_000_000,
    mediaDurationSeconds: 12 * SECONDS_PER_MINUTE + 8,
    visibility: LESSON_VISIBILITIES.VISIBLE,
    tags: ["Pinyin", "Pronunciation", "Mandarin"],
  },
};

/** Lesson counts for the studio modules whose lessons are not expanded. */
export const STUDIO_MODULE_LESSON_COUNTS: Readonly<Record<string, number>> = {
  "getting-started": 3,
  "numbers-dates": 4,
  "everyday-conversation": 5,
  "culture-daily-life": 3,
};

export const STUDIO_COURSES: readonly StudioCourseRow[] = [
  {
    slug: "chinese-for-beginners",
    title: "Chinese for Beginners",
    language: COURSE_LANGUAGES.CHINESE,
    art: COURSE_ART.BLOSSOM,
    publishState: PUBLISH_STATES.DRAFT,
    versionCount: 0,
    learnerCount: 0,
    updatedAt: "2026-01-27T10:02:00Z",
  },
  {
    slug: "english-everyday-communication",
    title: "English for Everyday Communication",
    language: COURSE_LANGUAGES.ENGLISH,
    art: COURSE_ART.LANDMARK,
    publishState: PUBLISH_STATES.PUBLISHED,
    versionCount: 4,
    learnerCount: 318,
    updatedAt: "2026-01-19T08:30:00Z",
  },
  {
    slug: "business-chinese",
    title: "Business Chinese",
    language: COURSE_LANGUAGES.CHINESE,
    art: COURSE_ART.SKYLINE,
    publishState: PUBLISH_STATES.PUBLISHED,
    versionCount: 2,
    learnerCount: 96,
    updatedAt: "2026-01-05T16:45:00Z",
  },
];

/** Levels offered per framework. The two lists never map onto each other (BR-12). */
export const FRAMEWORK_LEVELS: Readonly<Record<LevelFramework, readonly string[]>> = {
  [LEVEL_FRAMEWORKS.CEFR]: ["A1", "A2", "B1", "B2", "C1", "C2"],
  [LEVEL_FRAMEWORKS.CHINESE_CURRICULUM]: ["HSK 1", "HSK 2", "HSK 3", "HSK 4", "HSK 5", "HSK 6"],
};

export const STUDIO_COURSE_DETAILS: StudioCourseDetails = {
  summary:
    "A first course in Mandarin: pinyin, the four tones, everyday greetings and the vocabulary of daily life.",
  outcomes: [
    {
      id: "zh-hsk1",
      scale: "chineseCurriculum",
      scaleVersion: "HSK 3.0",
      label: "HSK 1 — 150 words, basic classroom Chinese",
    },
  ],
  enrolmentPolicy: ENROLMENT_POLICIES.FREE,
  hasPublishedVersion: false,
};

/**
 * The gate in front of publishing. A pending check blocks just as a failure does: an asset that
 * has not been scanned cannot be served, so letting it through would publish a broken course.
 */
export const PUBLISH_CHECKS: readonly PublishCheck[] = [
  { id: "hasTitle", state: PUBLISH_CHECK_STATES.PASS, detail: "" },
  { id: "hasSummary", state: PUBLISH_CHECK_STATES.PASS, detail: "" },
  { id: "hasOutcomes", state: PUBLISH_CHECK_STATES.PASS, detail: "" },
  { id: "everyModuleHasLesson", state: PUBLISH_CHECK_STATES.FAIL, detail: "Module 2: Numbers & Dates" },
  { id: "everyLessonHasMedia", state: PUBLISH_CHECK_STATES.FAIL, detail: "1.3 Practice: Greetings" },
  { id: "assetsScanned", state: PUBLISH_CHECK_STATES.PENDING, detail: "pinyin-intro.mp4" },
  { id: "assessmentsPublished", state: PUBLISH_CHECK_STATES.PASS, detail: "" },
];

export const QUESTION_BANK: readonly Question[] = [
  {
    id: "q-measure-word",
    prompt: "Choose the correct measure word for 书.",
    kind: QUESTION_KINDS.SINGLE_CHOICE,
    difficulty: QUESTION_DIFFICULTIES.EASY,
    points: 2,
    language: COURSE_LANGUAGES.CHINESE,
    revisions: [
      { id: "rev-1", number: 1, createdAt: "2025-11-02T09:00:00Z", isFrozen: true, usedBy: ["Unit 2 quiz"] },
      {
        id: "rev-2",
        number: 2,
        createdAt: "2026-01-08T09:00:00Z",
        isFrozen: true,
        usedBy: ["Unit 4 — Language in everyday life"],
      },
    ],
  },
  {
    id: "q-weekend-plans",
    prompt: "Which sentence asks about someone's weekend plans?",
    kind: QUESTION_KINDS.SINGLE_CHOICE,
    difficulty: QUESTION_DIFFICULTIES.MEDIUM,
    points: 2,
    language: COURSE_LANGUAGES.CHINESE,
    revisions: [
      {
        id: "rev-3",
        number: 1,
        createdAt: "2026-01-08T09:10:00Z",
        isFrozen: true,
        usedBy: ["Unit 4 — Language in everyday life"],
      },
    ],
  },
  {
    id: "q-library-habit",
    prompt: "Which Chinese sentence means “I usually go to the library on weekends”?",
    kind: QUESTION_KINDS.SINGLE_CHOICE,
    difficulty: QUESTION_DIFFICULTIES.MEDIUM,
    points: 2,
    language: COURSE_LANGUAGES.CHINESE,
    revisions: [{ id: "rev-4", number: 1, createdAt: "2026-01-09T11:00:00Z", isFrozen: false, usedBy: [] }],
  },
  {
    id: "q-daily-routine",
    prompt: "Write one sentence about your daily routine.",
    kind: QUESTION_KINDS.ESSAY,
    difficulty: QUESTION_DIFFICULTIES.HARD,
    points: 4,
    language: COURSE_LANGUAGES.CHINESE,
    revisions: [{ id: "rev-5", number: 1, createdAt: "2026-01-10T15:30:00Z", isFrozen: false, usedBy: [] }],
  },
  {
    id: "q-email-opening",
    prompt: "Which opening line suits a formal email to a new client?",
    kind: QUESTION_KINDS.SINGLE_CHOICE,
    difficulty: QUESTION_DIFFICULTIES.MEDIUM,
    points: 2,
    language: COURSE_LANGUAGES.ENGLISH,
    revisions: [{ id: "rev-6", number: 1, createdAt: "2026-01-12T10:00:00Z", isFrozen: false, usedBy: [] }],
  },
];

export const ASSESSMENT_DRAFT: AssessmentDraft = {
  id: "chinese-i-unit-5",
  title: "Unit 5 — Shopping and prices",
  courseTitle: "Chinese I: Foundations",
  publishState: PUBLISH_STATES.DRAFT,
  selectedRevisionIds: ["rev-2", "rev-3"],
  policy: PROPOSED_ASSESSMENT_POLICY,
  isPolicyUnversioned: true,
};

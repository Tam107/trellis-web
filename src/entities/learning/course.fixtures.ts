/**
 * Sample courses, lessons and catalogue facets.
 */

import {
  type CatalogFilters,
  type CatalogQuery,
  type CourseDetail,
  type CourseInProgress,
  type CoursePublicDetail,
  type CourseSummary,
  type MyCourseRow,
} from "./course.types";
import {
  CATALOG_SORTS,
  COURSE_ART,
  COURSE_FORMATS,
  COURSE_LANGUAGES,
  COURSE_LEVELS,
  COURSE_SKILLS,
  ENROLMENT_POLICIES,
  ENROLMENT_STATES,
  LESSON_KINDS,
  LESSON_LOCK_REASONS,
  LESSON_STATES,
} from "./learning.constants";

const MINUTES_PER_HOUR = 60;
const SECONDS_PER_MINUTE = 60;

export const CATALOG_COURSES: readonly CourseSummary[] = [
  {
    slug: "english-everyday-communication",
    title: "English for Everyday Communication",
    description: "Build practical English for daily life, travel, and real conversations.",
    language: COURSE_LANGUAGES.ENGLISH,
    level: COURSE_LEVELS.BEGINNER,
    art: COURSE_ART.LANDMARK,
    enrolment: ENROLMENT_STATES.NOT_ENROLLED,
    lessonCount: 12,
    durationMinutes: 3 * MINUTES_PER_HOUR + 40,
    isSaved: false,
  },
  {
    slug: "chinese-i-foundations",
    title: "Chinese I: Foundations",
    description: "Start your Chinese journey with pinyin, essential vocabulary, and basic conversation.",
    language: COURSE_LANGUAGES.CHINESE,
    level: COURSE_LEVELS.BEGINNER,
    art: COURSE_ART.BLOSSOM,
    enrolment: ENROLMENT_STATES.ENROLLED,
    lessonCount: 15,
    durationMinutes: 4 * MINUTES_PER_HOUR + 20,
    isSaved: true,
  },
  {
    slug: "english-academic-purposes",
    title: "English for Academic Purposes",
    description: "Develop the English skills you need for study, research, and academic life.",
    language: COURSE_LANGUAGES.ENGLISH,
    level: COURSE_LEVELS.INTERMEDIATE,
    art: COURSE_ART.CAMPUS,
    enrolment: ENROLMENT_STATES.NOT_ENROLLED,
    lessonCount: 20,
    durationMinutes: 6 * MINUTES_PER_HOUR,
    isSaved: false,
  },
  {
    slug: "chinese-ii-daily-life",
    title: "Chinese II: Daily Life",
    description:
      "Expand your vocabulary and communication for real-life situations, from shopping to travel.",
    language: COURSE_LANGUAGES.CHINESE,
    level: COURSE_LEVELS.INTERMEDIATE,
    art: COURSE_ART.LANTERN,
    enrolment: ENROLMENT_STATES.ENROLLED,
    lessonCount: 15,
    durationMinutes: 5 * MINUTES_PER_HOUR,
    isSaved: false,
  },
  {
    slug: "business-chinese",
    title: "Business Chinese",
    description: "Learn key Chinese for the workplace, including professional communication and meetings.",
    language: COURSE_LANGUAGES.CHINESE,
    level: COURSE_LEVELS.ADVANCED,
    art: COURSE_ART.SKYLINE,
    enrolment: ENROLMENT_STATES.NOT_ENROLLED,
    lessonCount: 14,
    durationMinutes: 4 * MINUTES_PER_HOUR + 30,
    isSaved: false,
  },
  {
    slug: "english-professional-success",
    title: "English for Professional Success",
    description: "Improve your English for the global workplace: presentations, emails, and networking.",
    language: COURSE_LANGUAGES.ENGLISH,
    level: COURSE_LEVELS.INTERMEDIATE,
    art: COURSE_ART.CITY,
    enrolment: ENROLMENT_STATES.ENROLLED,
    lessonCount: 16,
    durationMinutes: 5 * MINUTES_PER_HOUR + 20,
    isSaved: false,
  },
];

/** The counts the catalogue advertises, including the courses past the first page. */
export const CATALOG_TOTAL_COURSES = 14;

export const CATALOG_FILTERS: CatalogFilters = {
  languages: [
    { value: COURSE_LANGUAGES.ENGLISH, count: 8 },
    { value: COURSE_LANGUAGES.CHINESE, count: 6 },
  ],
  levels: [
    { value: COURSE_LEVELS.BEGINNER, count: 5 },
    { value: COURSE_LEVELS.INTERMEDIATE, count: 6 },
    { value: COURSE_LEVELS.ADVANCED, count: 3 },
  ],
  skills: [
    { value: COURSE_SKILLS.SPEAKING, count: 7 },
    { value: COURSE_SKILLS.LISTENING, count: 8 },
    { value: COURSE_SKILLS.READING, count: 6 },
    { value: COURSE_SKILLS.WRITING, count: 5 },
    { value: COURSE_SKILLS.GRAMMAR, count: 4 },
    { value: COURSE_SKILLS.VOCABULARY, count: 7 },
  ],
  formats: [
    { value: COURSE_FORMATS.SELF_PACED, count: 10 },
    { value: COURSE_FORMATS.LIVE_CLASS, count: 3 },
    { value: COURSE_FORMATS.COHORT, count: 2 },
  ],
};

export const INITIAL_CATALOG_QUERY: CatalogQuery = {
  search: "",
  languages: [COURSE_LANGUAGES.ENGLISH, COURSE_LANGUAGES.CHINESE],
  levels: [],
  skills: [],
  formats: [],
  sort: CATALOG_SORTS.POPULAR,
};

export const CONTINUE_LEARNING: readonly CourseInProgress[] = [
  {
    slug: "english-everyday-communication",
    title: "English for Everyday Communication",
    language: COURSE_LANGUAGES.ENGLISH,
    art: COURSE_ART.LANDMARK,
    currentLessonNumber: 5,
    currentLessonTitle: "Making Plans",
    percentComplete: 40,
  },
  {
    slug: "chinese-i-foundations",
    title: "Chinese I: Foundations",
    language: COURSE_LANGUAGES.CHINESE,
    art: COURSE_ART.BLOSSOM,
    currentLessonNumber: 4,
    currentLessonTitle: "Numbers and Dates",
    percentComplete: 60,
  },
];

/** Courses the dashboard recommends: the two the learner has not started. */
export const RECOMMENDED_SLUGS: readonly string[] = ["english-academic-purposes", "chinese-ii-daily-life"];

export const COURSE_DETAIL: CourseDetail = {
  slug: "english-everyday-communication",
  title: "English & Chinese for Everyday Communication",
  level: COURSE_LEVELS.BEGINNER,
  language: COURSE_LANGUAGES.ENGLISH,
  art: COURSE_ART.BLOSSOM,
  currentLessonId: "welcome-roadmap",
  currentLessonNumber: 1,
  lessonCount: 12,
  percentComplete: 40,
  modules: [
    {
      id: "getting-started",
      title: "Getting Started",
      lessons: [
        {
          id: "welcome-roadmap",
          title: "Welcome & Course Roadmap",
          kind: LESSON_KINDS.VIDEO,
          state: LESSON_STATES.IN_PROGRESS,
          durationSeconds: 6 * SECONDS_PER_MINUTE + 12,
        },
        {
          id: "how-to-learn",
          title: "How to Learn English & Chinese Effectively",
          kind: LESSON_KINDS.VIDEO,
          state: LESSON_STATES.COMPLETED,
          durationSeconds: 8 * SECONDS_PER_MINUTE + 20,
        },
        {
          id: "tools-resources",
          title: "Tools & Learning Resources",
          kind: LESSON_KINDS.READING,
          state: LESSON_STATES.NOT_STARTED,
          durationSeconds: 5 * SECONDS_PER_MINUTE + 40,
          body: [
            "A dictionary you trust matters more than a dictionary that is popular. Pick one that shows example sentences, not just glosses.",
            "Keep one notebook for words and a separate one for sentences. Words you will forget; sentences carry the grammar with them.",
            "Review on the days you do not feel like studying. Ten minutes on a bad day beats an hour on a good one.",
          ],
        },
      ],
    },
    { id: "daily-life-vocabulary", title: "Daily Life Vocabulary", lessons: [] },
    { id: "everyday-conversations", title: "Everyday Conversations", lessons: [] },
    {
      id: "ordering-food",
      title: "Ordering Food & Dining",
      lessons: [
        {
          id: "ordering-food-intro",
          title: "Reading a Menu",
          kind: LESSON_KINDS.VIDEO,
          state: LESSON_STATES.LOCKED,
          durationSeconds: 7 * SECONDS_PER_MINUTE + 5,
          lock: {
            reason: LESSON_LOCK_REASONS.PREREQUISITE,
            requiredLessonTitle: "Tools & Learning Resources",
          },
        },
      ],
    },
    { id: "travel-transport", title: "Travel & Transportation", lessons: [] },
    { id: "review-next-steps", title: "Review & Next Steps", lessons: [] },
  ],
  notes: [
    "This course helps me build practical English and Chinese skills for daily life.",
    "Focus: vocabulary, real conversations, and cultural tips.",
    "My goal: be able to handle common situations like greetings, shopping, dining, and travel.",
  ],
  goals: [
    { key: "completeAllLessons", isDone: true },
    { key: "buildVocabulary", isDone: false },
    { key: "holdConversation", isDone: false },
    { key: "takeQuiz", isDone: false },
  ],
  resources: [
    { id: "syllabus", title: "Course Syllabus", sizeBytes: 1_200_000 },
    { id: "vocabulary-list", title: "Vocabulary List (EN-ZH)", sizeBytes: 2_800_000 },
    { id: "practice-worksheets", title: "Practice Worksheets", sizeBytes: 1_500_000 },
  ],
};

/** Lessons each empty module advertises, so the outline shows a count without listing lessons. */
export const COURSE_MODULE_LESSON_COUNTS: Readonly<Record<string, number>> = {
  "getting-started": 3,
  "daily-life-vocabulary": 4,
  "everyday-conversations": 3,
  "ordering-food": 3,
  "travel-transport": 3,
  "review-next-steps": 2,
};

export const PUBLIC_COURSE: CoursePublicDetail = {
  slug: "chinese-i-foundations",
  title: "Chinese I: Foundations",
  summary:
    "Start your Chinese journey with pinyin, essential vocabulary, and the conversations you need in your first weeks.",
  language: COURSE_LANGUAGES.CHINESE,
  level: COURSE_LEVELS.BEGINNER,
  art: COURSE_ART.BLOSSOM,
  lessonCount: 15,
  durationMinutes: 4 * MINUTES_PER_HOUR + 20,
  enrolment: ENROLMENT_STATES.NOT_ENROLLED,
  outcomes: [
    { id: "cefr-a1", scale: "cefr", scaleVersion: "2020", label: "CEFR A1 — can introduce themselves" },
    {
      id: "zh-hsk1",
      scale: "chineseCurriculum",
      scaleVersion: "HSK 3.0",
      label: "HSK 1 — 150 words, basic classroom Chinese",
    },
  ],
  outlinePreview: [
    { id: "getting-started", title: "Getting Started", lessonCount: 3 },
    { id: "numbers-dates", title: "Numbers & Dates", lessonCount: 4 },
    { id: "everyday-conversation", title: "Everyday Conversation", lessonCount: 5 },
    { id: "culture-daily-life", title: "Culture & Daily Life", lessonCount: 3 },
  ],
  editions: [
    {
      id: "2026-spring",
      version: "v3",
      label: "Spring 2026",
      policy: ENROLMENT_POLICIES.FREE,
      seatsTaken: 212,
      seatsTotal: 300,
      isOpen: true,
    },
    {
      id: "2025-autumn",
      version: "v2",
      label: "Autumn 2025",
      policy: ENROLMENT_POLICIES.FREE,
      seatsTaken: 300,
      seatsTotal: 300,
      isOpen: false,
    },
  ],
};

export const MY_COURSES: readonly MyCourseRow[] = [
  {
    slug: "english-everyday-communication",
    title: "English for Everyday Communication",
    language: COURSE_LANGUAGES.ENGLISH,
    art: COURSE_ART.LANDMARK,
    pinnedVersion: "v4",
    percentComplete: 40,
    lastActivityAt: "2026-01-24T09:12:00Z",
  },
  {
    slug: "chinese-i-foundations",
    title: "Chinese I: Foundations",
    language: COURSE_LANGUAGES.CHINESE,
    art: COURSE_ART.BLOSSOM,
    pinnedVersion: "v2",
    percentComplete: 60,
    lastActivityAt: "2026-01-25T20:40:00Z",
    dueAt: "2026-02-10T00:00:00Z",
  },
  {
    slug: "english-professional-success",
    title: "English for Professional Success",
    language: COURSE_LANGUAGES.ENGLISH,
    art: COURSE_ART.CITY,
    pinnedVersion: "v1",
    percentComplete: 0,
    lastActivityAt: "2026-01-11T14:05:00Z",
  },
];

/** Lesson the player opens when the outline's locked row is selected. */
export const LOCKED_LESSON_ID = "ordering-food-intro";

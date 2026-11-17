import {
  ANSWER_OUTCOMES,
  ATTEMPT_STATES,
  CATALOG_SORTS,
  COURSE_ART,
  COURSE_FORMATS,
  COURSE_LANGUAGES,
  COURSE_LEVELS,
  COURSE_SKILLS,
  ENROLMENT_POLICIES,
  ENROLMENT_STATES,
  GRADING_RULES,
  LESSON_KINDS,
  LESSON_LOCK_REASONS,
  LESSON_STATES,
  LESSON_VISIBILITIES,
  PUBLISH_STATES,
  QUESTION_STATES,
  REVEAL_POLICIES,
} from "./learning.constants";
import type {
  Achievement,
  Assessment,
  AssessmentPolicy,
  AttemptHistoryRow,
  AttemptResult,
  CatalogFilters,
  CatalogQuery,
  CourseDetail,
  CourseInProgress,
  CoursePublicDetail,
  CourseSummary,
  Learner,
  LearningStat,
  MyCourseRow,
  StudioCourse,
  WeeklyProgress,
} from "./learning.types";

/**
 * Sample content for the mock screens. It lives in the entity because every feature screen reads
 * the same catalogue, and it is a fixture rather than a mock HTTP handler on purpose: these pages
 * are a UI mock with no backend behind them yet (there is no learning endpoint to answer).
 * Course titles stay in their own language — they are content, not UI copy, so they do not move
 * into the i18n namespace.
 */

const MINUTES_PER_HOUR = 60;

export const SAMPLE_LEARNER: Learner = { name: "Lisa N", initials: "LN" };

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

export const LEARNING_STATS: readonly LearningStat[] = [
  { key: "coursesInProgress", value: "6" },
  { key: "lessonsCompleted", value: "14" },
  { key: "learningTime", value: "7.8" },
  { key: "progressVsLastMonth", value: "+22%" },
];

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

export const ACHIEVEMENTS: readonly Achievement[] = [
  { key: "consistentLearner", icon: "trophy" },
  { key: "dayStreak", icon: "flame" },
  { key: "lessonMaster", icon: "star" },
];

export const WEEKLY_PROGRESS: WeeklyProgress = {
  percent: 80,
  goalsDone: 4,
  goalsTotal: 5,
  fromDate: "2026-01-20",
  toDate: "2026-01-26",
  goals: [
    { key: "completeLessons", isDone: true },
    { key: "studyHours", isDone: true },
    { key: "reviewNotes", isDone: true },
    { key: "practiceSpeaking", isDone: true },
    { key: "takeQuiz", isDone: false },
  ],
};

/** Courses the dashboard recommends: the two the learner has not started. */
export const RECOMMENDED_SLUGS: readonly string[] = ["english-academic-purposes", "chinese-ii-daily-life"];

const SECONDS_PER_MINUTE = 60;

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

/* ------------------------------------------------------------------------------------------------
 * Batch A fixtures (plan 13, §2).
 * ---------------------------------------------------------------------------------------------- */

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

/** Lesson the player opens when the outline's locked row is selected. */
export const LOCKED_LESSON_ID = "ordering-food-intro";

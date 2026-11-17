/**
 * The learner and what the dashboard says about their week.
 */

export type Learner = {
  name: string;
  /** Shown in the avatar; the mock has no uploaded images. */
  initials: string;
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

/**
 * The progress screen reads a projection, not the truth. `asOf` is on the type because the figure
 * is meaningless without it: a number that looks live but trails by minutes teaches the wrong thing
 * (BR-07).
 */
export type ProgressSummary = {
  asOf: string;
  coursesEnrolled: number;
  lessonsCompleted: number;
  lessonsTotal: number;
  studyMinutes: number;
  currentStreakDays: number;
};

export type CourseProgressRow = {
  slug: string;
  title: string;
  percentComplete: number;
  lessonsCompleted: number;
  lessonsTotal: number;
  /** Official grade, read from the truth rather than the projection; absent until graded. */
  grade?: number;
  gradeRule: string;
};

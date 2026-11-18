/**
 * Sample learner and dashboard figures.
 */

import {
  type Achievement,
  type CourseProgressRow,
  type Learner,
  type LearningStat,
  type ProgressSummary,
  type WeeklyProgress,
} from "./progress.types";

export const SAMPLE_LEARNER: Learner = { name: "Lisa N", initials: "LN" };

export const LEARNING_STATS: readonly LearningStat[] = [
  { key: "coursesInProgress", value: "6" },
  { key: "lessonsCompleted", value: "14" },
  { key: "learningTime", value: "7.8" },
  { key: "progressVsLastMonth", value: "+22%" },
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

export const PROGRESS_SUMMARY: ProgressSummary = {
  asOf: "2026-01-27T09:52:00Z",
  coursesEnrolled: 3,
  lessonsCompleted: 14,
  lessonsTotal: 43,
  studyMinutes: 468,
  currentStreakDays: 7,
};

export const COURSE_PROGRESS: readonly CourseProgressRow[] = [
  {
    slug: "english-everyday-communication",
    title: "English for Everyday Communication",
    percentComplete: 40,
    lessonsCompleted: 5,
    lessonsTotal: 12,
    gradeRule: "best",
  },
  {
    slug: "chinese-i-foundations",
    title: "Chinese I: Foundations",
    percentComplete: 60,
    lessonsCompleted: 9,
    lessonsTotal: 15,
    grade: 86,
    gradeRule: "best",
  },
  {
    slug: "english-professional-success",
    title: "English for Professional Success",
    percentComplete: 0,
    lessonsCompleted: 0,
    lessonsTotal: 16,
    gradeRule: "best",
  },
];

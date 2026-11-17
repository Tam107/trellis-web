/**
 * Sample learner and dashboard figures.
 */

import { type Achievement, type Learner, type LearningStat, type WeeklyProgress } from "./progress.types";

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

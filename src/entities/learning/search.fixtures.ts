/** Sample search results, including one hit the learner may not open. */
import { COURSE_LANGUAGES } from "./learning.constants";
import { SEARCH_HIT_KINDS, type SearchHit } from "./search.types";

export const SAMPLE_QUERY = "weekend";

export const SEARCH_HITS: readonly SearchHit[] = [
  {
    id: "lesson-weekend-plans",
    kind: SEARCH_HIT_KINDS.LESSON,
    title: "Making Plans",
    context: "English for Everyday Communication · Lesson 5",
    highlight: "…asking about someone's weekend plans and suggesting a time to meet…",
    language: COURSE_LANGUAGES.ENGLISH,
    isOpenable: true,
  },
  {
    id: "lesson-time-words",
    kind: SEARCH_HIT_KINDS.LESSON,
    title: "Numbers and Dates",
    context: "Chinese I: Foundations · Lesson 4",
    highlight: "…周末 means weekend; it goes before the verb, not after it…",
    language: COURSE_LANGUAGES.CHINESE,
    isOpenable: true,
  },
  {
    id: "course-daily-life",
    kind: SEARCH_HIT_KINDS.COURSE,
    title: "Chinese II: Daily Life",
    context: "Course · 15 lessons",
    highlight: "…shopping, dining and weekend routines in everyday Mandarin…",
    language: COURSE_LANGUAGES.CHINESE,
    isOpenable: true,
  },
  {
    id: "resource-weekend-worksheet",
    kind: SEARCH_HIT_KINDS.RESOURCE,
    title: "Weekend Routines worksheet",
    context: "Business Chinese · Resources",
    highlight: "…practice sheet covering weekend vocabulary and time expressions…",
    language: COURSE_LANGUAGES.CHINESE,
    isOpenable: false,
  },
];

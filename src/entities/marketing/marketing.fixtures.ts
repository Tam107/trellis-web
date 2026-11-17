import { COURSE_ART, COURSE_LANGUAGES, COURSE_LEVELS } from "@/entities/learning/learning.constants";
import type { FeaturedCourse, MarketingFeature, MarketingStat } from "./marketing.types";

/** Figures the landing page claims. They are marketing copy with numbers in, not live counts. */
export const MARKETING_STATS: readonly MarketingStat[] = [
  { key: "learners", value: "10,000+" },
  { key: "courses", value: "200+" },
  { key: "educators", value: "50+" },
  { key: "rating", value: "4.8/5" },
];

export const MARKETING_FEATURES: readonly MarketingFeature[] = [
  { key: "structured" },
  { key: "aiPractice" },
  { key: "progress" },
  { key: "teach" },
];

/** Progress shown on the floating hero card. */
export const HERO_PROGRESS_PERCENT = 62;

/** The lesson still shown in the hero's player card. */
export const HERO_VIDEO = { durationSeconds: 372, playedSeconds: 124 };

export const FEATURED_COURSES: readonly FeaturedCourse[] = [
  {
    slug: "chinese-i-foundations",
    title: "Chinese I: Foundation",
    level: COURSE_LEVELS.BEGINNER,
    weeks: 8,
    rating: 4.8,
    ratingCount: "2.1k",
    art: COURSE_ART.BLOSSOM,
    language: COURSE_LANGUAGES.CHINESE,
  },
  {
    slug: "english-everyday-communication",
    title: "English for Work",
    level: COURSE_LEVELS.INTERMEDIATE,
    weeks: 6,
    rating: 4.7,
    ratingCount: "1.5k",
    art: COURSE_ART.LANDMARK,
    language: COURSE_LANGUAGES.ENGLISH,
  },
  {
    slug: "english-academic-purposes",
    title: "Academic Writing",
    level: COURSE_LEVELS.INTERMEDIATE,
    weeks: 4,
    rating: 4.8,
    ratingCount: "980",
    art: COURSE_ART.CAMPUS,
    language: COURSE_LANGUAGES.ENGLISH,
  },
  {
    slug: "business-chinese",
    title: "Data Literacy",
    level: COURSE_LEVELS.BEGINNER,
    weeks: 5,
    rating: 4.6,
    ratingCount: "1.2k",
    art: COURSE_ART.CITY,
    language: COURSE_LANGUAGES.ENGLISH,
  },
];

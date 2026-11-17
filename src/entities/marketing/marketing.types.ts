import type { CourseArt, CourseLanguage, CourseLevel } from "@/entities/learning/learning.constants";

/**
 * Landing-page content. It is a domain of its own: these figures are claims the product makes
 * about itself, not read models of courses, and they change for different reasons.
 */

export type MarketingStat = {
  key: "learners" | "courses" | "educators" | "rating";
  value: string;
};

export type MarketingFeature = {
  key: "structured" | "aiPractice" | "progress" | "teach";
};

export type FeaturedCourse = {
  slug: string;
  title: string;
  level: CourseLevel;
  /** Course length as the catalogue advertises it. */
  weeks: number;
  /** 0-5, one decimal. */
  rating: number;
  /** Already abbreviated, e.g. `2.1k`: the index supplies it, the UI does not round. */
  ratingCount: string;
  art: CourseArt;
  language: CourseLanguage;
};

export type HeroHighlight = {
  key: "progress" | "tutor";
};

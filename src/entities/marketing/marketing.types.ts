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
  /** Total video length, shown on the thumbnail the way a video site shows it. */
  durationMinutes: number;
  /**
   * The two-to-four word line printed over the thumbnail. Course content, like the title, so it
   * stays in the course's own language and out of i18n.
   */
  thumbnailHook: string;
  /** 0-5, one decimal. */
  rating: number;
  /** Already abbreviated, e.g. `2.1k`: the index supplies it, the UI does not round. */
  ratingCount: string;
  art: CourseArt;
  language: CourseLanguage;
  /** Shown under the title the way a course catalogue credits its teacher. */
  instructor: string;
  /** Marks the small badge over the thumbnail; at most a few courses carry it. */
  isBestseller?: boolean;
};

export type HeroHighlight = {
  key: "progress" | "tutor";
};

/** Catalogue filters. A topic groups courses the way the catalogue page offers them. */
export type CatalogTopic = "language" | "business" | "academic" | "data";

export type CatalogCourse = FeaturedCourse & {
  topic: CatalogTopic;
  /** Already abbreviated, like `ratingCount`. */
  learners: string;
};

/** What a plan grants. The label for each lives in `marketing.pricing.features`. */
export type PricingFeature =
  | "catalogue"
  | "progress"
  | "aiPractice"
  | "certificates"
  | "authoring"
  | "analytics"
  | "grading"
  | "sso"
  | "support";

export type PricingPlan = {
  key: "free" | "pro" | "team";
  /** Formatted for display; the mock does not do currency maths. */
  price: string;
  /** False for the free plan, which has no billing period to show. */
  hasPeriod: boolean;
  isFeatured: boolean;
  features: readonly PricingFeature[];
};

export type ResourceKind = "guide" | "article" | "webinar" | "template";

export type ResourceItem = {
  key: "gettingStarted" | "courseDesign" | "assessmentDesign" | "aiTutor" | "analytics" | "accessibility";
  kind: ResourceKind;
  readMinutes: number;
};

/** The four steps the educators page walks through, in order. */
export type EducatorStep = { key: "design" | "publish" | "teach" | "measure" };

export type EducatorProof = { key: "setup" | "reach" | "insight"; value: string };

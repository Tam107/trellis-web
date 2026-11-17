/**
 * Search results. Elasticsearch is the index, not the authority: what a learner may open is
 * decided by the backend, so a hit carries only what is safe to show before that check.
 */
import type { CourseLanguage } from "./learning.constants";

export const SEARCH_HIT_KINDS = { COURSE: "course", LESSON: "lesson", RESOURCE: "resource" } as const;
export type SearchHitKind = (typeof SEARCH_HIT_KINDS)[keyof typeof SEARCH_HIT_KINDS];

export type SearchHit = {
  id: string;
  kind: SearchHitKind;
  title: string;
  /** Where the hit sits, e.g. the course a lesson belongs to. */
  context: string;
  /** The matching sentence. The index produces it; the UI never builds one. */
  highlight: string;
  language: CourseLanguage;
  /** False when the learner is not enrolled: only metadata is shown (D-12). */
  isOpenable: boolean;
};

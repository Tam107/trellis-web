/** What an instructor looks at across their learners. */
import type { CourseLanguage } from "./learning.constants";

export type StudentRow = {
  id: string;
  name: string;
  initials: string;
  courseTitle: string;
  percentComplete: number;
  lastActivityAt: string;
  /** Flagged by a rule, never a verdict: FR-044 forbids automatic penalties. */
  isAtRisk: boolean;
};

export const SUBMISSION_STATES = { WAITING: "waiting", MARKED: "marked" } as const;
export type SubmissionState = (typeof SUBMISSION_STATES)[keyof typeof SUBMISSION_STATES];

export type SubmissionRow = {
  id: string;
  studentName: string;
  assessmentTitle: string;
  questionPrompt: string;
  submittedAt: string;
  state: SubmissionState;
  pointsPossible: number;
  pointsAwarded?: number;
};

export type SkillGapRow = {
  skill: string;
  /** 0-100; the share of learners who met the outcome. */
  attainment: number;
  cohortSize: number;
  /** Below this the figure is withheld, because a small group is identifiable. */
  isTooSmallToShow: boolean;
};

export type AssignmentRow = {
  id: string;
  title: string;
  courseTitle: string;
  dueAt: string;
  submitted: number;
  cohortSize: number;
};

export type CertificateRow = {
  id: string;
  studentName: string;
  courseTitle: string;
  issuedAt: string;
  serial: string;
};

export const SCAN_STATES = { PENDING: "pending", CLEAN: "clean", REJECTED: "rejected" } as const;
export type ScanState = (typeof SCAN_STATES)[keyof typeof SCAN_STATES];

export type AssetRow = {
  id: string;
  fileName: string;
  mimeType: string;
  sizeBytes: number;
  uploadedAt: string;
  scanState: ScanState;
  /** Why a rejected file was rejected; empty otherwise. */
  rejectedReason: string;
  language: CourseLanguage;
};

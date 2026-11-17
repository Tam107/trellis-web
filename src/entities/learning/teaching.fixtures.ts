/** Sample teaching data: learners, the marking queue, skill gaps, assignments, assets. */
import { COURSE_LANGUAGES } from "./learning.constants";
import {
  SCAN_STATES,
  SUBMISSION_STATES,
  type AssetRow,
  type AssignmentRow,
  type CertificateRow,
  type SkillGapRow,
  type StudentRow,
  type SubmissionRow,
} from "./teaching.types";

export const STUDENTS: readonly StudentRow[] = [
  {
    id: "s-1",
    name: "Minh Pham",
    initials: "MP",
    courseTitle: "Chinese for Beginners",
    percentComplete: 82,
    lastActivityAt: "2026-01-27T07:40:00Z",
    isAtRisk: false,
  },
  {
    id: "s-2",
    name: "Dana Okafor",
    initials: "DO",
    courseTitle: "Chinese for Beginners",
    percentComplete: 64,
    lastActivityAt: "2026-01-26T19:05:00Z",
    isAtRisk: false,
  },
  {
    id: "s-3",
    name: "Tomas Varga",
    initials: "TV",
    courseTitle: "Chinese for Beginners",
    percentComplete: 18,
    lastActivityAt: "2026-01-09T10:15:00Z",
    isAtRisk: true,
  },
  {
    id: "s-4",
    name: "Aiko Tanaka",
    initials: "AT",
    courseTitle: "Business Chinese",
    percentComplete: 91,
    lastActivityAt: "2026-01-27T06:02:00Z",
    isAtRisk: false,
  },
];

export const SUBMISSIONS: readonly SubmissionRow[] = [
  {
    id: "sub-1",
    studentName: "Minh Pham",
    assessmentTitle: "Unit 4 — Language in everyday life",
    questionPrompt: "Write one sentence about your daily routine.",
    submittedAt: "2026-01-26T13:38:00Z",
    state: SUBMISSION_STATES.WAITING,
    pointsPossible: 4,
  },
  {
    id: "sub-2",
    studentName: "Dana Okafor",
    assessmentTitle: "Unit 4 — Language in everyday life",
    questionPrompt: "Write one sentence about your daily routine.",
    submittedAt: "2026-01-26T15:10:00Z",
    state: SUBMISSION_STATES.WAITING,
    pointsPossible: 4,
  },
  {
    id: "sub-3",
    studentName: "Aiko Tanaka",
    assessmentTitle: "Unit 3 — Meetings",
    questionPrompt: "Summarise the meeting in three sentences.",
    submittedAt: "2026-01-22T09:00:00Z",
    state: SUBMISSION_STATES.MARKED,
    pointsPossible: 6,
    pointsAwarded: 5,
  },
];

/** `asOf` is the projection's timestamp, deliberately a few minutes behind (BR-07). */
export const ANALYTICS_AS_OF = "2026-01-27T09:52:00Z";

export const SKILL_GAPS: readonly SkillGapRow[] = [
  { skill: "Pronunciation", attainment: 78, cohortSize: 42, isTooSmallToShow: false },
  { skill: "Listening", attainment: 64, cohortSize: 42, isTooSmallToShow: false },
  { skill: "Vocabulary", attainment: 71, cohortSize: 42, isTooSmallToShow: false },
  { skill: "Writing", attainment: 0, cohortSize: 4, isTooSmallToShow: true },
];

export const ASSIGNMENTS: readonly AssignmentRow[] = [
  {
    id: "a-1",
    title: "Unit 4 quiz",
    courseTitle: "Chinese for Beginners",
    dueAt: "2026-01-31T00:00:00Z",
    submitted: 28,
    cohortSize: 42,
  },
  {
    id: "a-2",
    title: "Self-introduction recording",
    courseTitle: "Chinese for Beginners",
    dueAt: "2026-02-07T00:00:00Z",
    submitted: 4,
    cohortSize: 42,
  },
  {
    id: "a-3",
    title: "Meeting summary",
    courseTitle: "Business Chinese",
    dueAt: "2026-01-24T00:00:00Z",
    submitted: 19,
    cohortSize: 19,
  },
];

export const CERTIFICATES: readonly CertificateRow[] = [
  {
    id: "c-1",
    studentName: "Aiko Tanaka",
    courseTitle: "Business Chinese",
    issuedAt: "2026-01-20T10:00:00Z",
    serial: "TRL-BC-000412",
  },
  {
    id: "c-2",
    studentName: "Minh Pham",
    courseTitle: "Chinese for Beginners",
    issuedAt: "2026-01-12T10:00:00Z",
    serial: "TRL-CB-000287",
  },
];

export const ASSETS: readonly AssetRow[] = [
  {
    id: "asset-1",
    fileName: "pinyin-intro.mp4",
    mimeType: "video/mp4",
    sizeBytes: 238_000_000,
    uploadedAt: "2026-01-27T09:48:00Z",
    scanState: SCAN_STATES.PENDING,
    rejectedReason: "",
    language: COURSE_LANGUAGES.CHINESE,
  },
  {
    id: "asset-2",
    fileName: "vocabulary-list-en-zh.pdf",
    mimeType: "application/pdf",
    sizeBytes: 2_800_000,
    uploadedAt: "2026-01-26T11:20:00Z",
    scanState: SCAN_STATES.CLEAN,
    rejectedReason: "",
    language: COURSE_LANGUAGES.CHINESE,
  },
  {
    id: "asset-3",
    fileName: "practice-worksheets.zip",
    mimeType: "application/zip",
    sizeBytes: 1_500_000,
    uploadedAt: "2026-01-25T16:02:00Z",
    scanState: SCAN_STATES.REJECTED,
    rejectedReason: "Archive contains an executable file",
    language: COURSE_LANGUAGES.ENGLISH,
  },
];

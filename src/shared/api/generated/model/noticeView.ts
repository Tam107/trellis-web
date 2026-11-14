/**
 * GENERATED from the Trellis API contracts by the backend toolchain. DO NOT EDIT. Replaced by the @trellis/contracts package (decision T22); see scripts/check-contracts.mjs.
 */
import type { NoticeViewAudience } from './noticeViewAudience';
import type { NoticeViewSeverity } from './noticeViewSeverity';
import type { NoticeViewStatus } from './noticeViewStatus';

export interface NoticeView {
  archivedAt?: string;
  audience: NoticeViewAudience;
  body: string;
  code: string;
  createdAt: string;
  publishedAt?: string;
  severity: NoticeViewSeverity;
  status: NoticeViewStatus;
  title: string;
  updatedAt: string;
  version: number;
}

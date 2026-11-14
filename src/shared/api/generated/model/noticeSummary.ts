/**
 * GENERATED from the Trellis API contracts by the backend toolchain. DO NOT EDIT. Replaced by the @trellis/contracts package (decision T22); see scripts/check-contracts.mjs.
 */
import type { NoticeSummaryAudience } from './noticeSummaryAudience';
import type { NoticeSummarySeverity } from './noticeSummarySeverity';
import type { NoticeSummaryStatus } from './noticeSummaryStatus';

export interface NoticeSummary {
  audience: NoticeSummaryAudience;
  code: string;
  createdAt: string;
  publishedAt?: string;
  severity: NoticeSummarySeverity;
  status: NoticeSummaryStatus;
  title: string;
}

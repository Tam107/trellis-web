/**
 * GENERATED from the Trellis API contracts by the backend toolchain. DO NOT EDIT. Replaced by the @trellis/contracts package (decision T22); see scripts/check-contracts.mjs.
 */
import type { Violation } from './violation';

/**
 * RFC 7807 problem details plus Trellis extensions
 */
export interface Problem {
  code: string;
  correlationId?: string;
  detail?: string;
  errors?: Violation[];
  instance?: string;
  status: number;
  title: string;
  traceId?: string;
  type: string;
}

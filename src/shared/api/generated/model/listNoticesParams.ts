/**
 * GENERATED from the Trellis API contracts by the backend toolchain. DO NOT EDIT. Replaced by the @trellis/contracts package (decision T22); see scripts/check-contracts.mjs.
 */
import type { ListNoticesAudience } from './listNoticesAudience';

export type ListNoticesParams = {
first?: number;
after?: string;
audience?: ListNoticesAudience;
query?: string;
};

/**
 * GENERATED from the Trellis API contracts by the backend toolchain. DO NOT EDIT. Replaced by the @trellis/contracts package (decision T22); see scripts/check-contracts.mjs.
 */
import type {
  RebuildResponse
} from './model/rebuildResponse';

import type {
  ReplayParams
} from './model/replayParams';

import type {
  ReplayResponse
} from './model/replayResponse';

import { apiRequest } from '../apiRequest';



type SecondParameter<T extends (...args: never) => unknown> = Parameters<T>[1];


  export const replay = (
    eventType: string,
    params?: ReplayParams,
 options?: SecondParameter<typeof apiRequest<ReplayResponse>>,) => {
      return apiRequest<ReplayResponse>(
      {url: `/api/ops/events/${eventType}/dlq/replay`, method: 'POST',
        params
    },
      options);
    }
  export const readModels = (

 options?: SecondParameter<typeof apiRequest<string[]>>,) => {
      return apiRequest<string[]>(
      {url: `/api/ops/read-models`, method: 'GET'
    },
      options);
    }
  export const rebuild = (
    name: string,
 options?: SecondParameter<typeof apiRequest<RebuildResponse>>,) => {
      return apiRequest<RebuildResponse>(
      {url: `/api/ops/read-models/${name}/rebuild`, method: 'POST'
    },
      options);
    }
  export type ReplayResult = NonNullable<Awaited<ReturnType<typeof replay>>>
export type ReadModelsResult = NonNullable<Awaited<ReturnType<typeof readModels>>>
export type RebuildResult = NonNullable<Awaited<ReturnType<typeof rebuild>>>

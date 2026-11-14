/**
 * GENERATED from the Trellis API contracts by the backend toolchain. DO NOT EDIT. Replaced by the @trellis/contracts package (decision T22); see scripts/check-contracts.mjs.
 */
import type {
  AppConfig
} from './model/appConfig';

import { apiRequest } from '../apiRequest';



type SecondParameter<T extends (...args: never) => unknown> = Parameters<T>[1];


  export const appConfig = (

 options?: SecondParameter<typeof apiRequest<AppConfig>>,) => {
      return apiRequest<AppConfig>(
      {url: `/api/app-config`, method: 'GET'
    },
      options);
    }
  export type AppConfigResult = NonNullable<Awaited<ReturnType<typeof appConfig>>>

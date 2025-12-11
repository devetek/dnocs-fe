import type { AxiosError } from 'axios';

import type { AdapterError, BaseResponseError } from '../lib/error';

export interface BaseResponse<D> {
  code: number;
  data?: D;
  status: string;
  error: string;
}

export type ApiClientResponse<D> =
  | ({ $status: 'success'; $statusCode: number } & D)
  | ({ $status: 'failed'; $statusCode?: number } & ResponseError);

// =============================================================================
//   Response Unit
// =============================================================================

export type PureResponse<D> =
  | ({ $status: 'success' } & D)
  | ({ $status: 'failed' } & ResponseError);

export type Response<D> =
  | { $status: 'initial' }
  | { $status: 'loading'; prevData?: D; prevError?: ResponseError }
  | PureResponse<D>;

export type ResponseError =
  | { kind: 'api'; error: AxiosError | BaseResponseError }
  | { kind: 'adapter'; error: AdapterError }
  | { kind: 'general'; error: Error };

export type Adapter<Raw, Data> = (raw: Raw) => Data;

// =============================================================================
//   Request Recipe
// =============================================================================

export interface BaseRequestRecipe {
  url: string;
}

export type GetRequestRecipe = BaseRequestRecipe;

export interface DoRequestRecipe extends BaseRequestRecipe {
  method: 'POST' | 'DELETE';
  data?: unknown;
}

// =============================================================================
//   useApiGet
// =============================================================================

export interface UseApiGetOptions {
  skip?: boolean;
  autoRetryWhenFails?: boolean;
  refreshIntervalMs?: number;
}

export type WithApiGetOptions<T = unknown> = T & {
  options?: UseApiGetOptions;
};

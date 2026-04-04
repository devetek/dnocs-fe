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

export type PureResponse<D, E = ResponseError> =
  | ({ $status: 'success' } & D)
  | ({ $status: 'failed' } & E);

export type Response<D, E = ResponseError> =
  | { $status: 'initial' }
  | { $status: 'loading'; prevData?: D; prevError?: E }
  | PureResponse<D, E>;

export type ResponseError =
  | { kind: 'api'; error: AxiosError | BaseResponseError }
  | { kind: 'adapter'; error: AdapterError }
  | { kind: 'general'; error: Error };

export type ResponseErrors =
  | ResponseError
  | {
      kind: 'aggregate';
      errors: ResponseError[];
    };

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

// =============================================================================
//   useApiGetWhen
// =============================================================================

export interface UseApiGetWhenParams {
  config?: GetRequestRecipe;
  options?: UseApiGetOptions;
}

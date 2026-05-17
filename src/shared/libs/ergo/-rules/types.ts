/** biome-ignore-all lint/complexity/noBannedTypes: YOLO */

import type { ComponentType } from 'react';

import type {
  LoadingFrom,
  ResponseError,
} from '@/shared/libs/api-client/rules/types';

import type { Builtin, Primitive } from '../../types/intrinsic';

export type {
  Response,
  ResponseError,
} from '@/shared/libs/api-client/rules/types';

export type Ergoed<T> = Accessor<T> &
  (T extends Primitive | Builtin
    ? {}
    : T extends object
      ? { [K in keyof T]: Ergoed<T[K]> }
      : {});

export type Accessor<T> = {
  $: Accessor$Response<T>;
  _: Accessor_Response<T>;
};

export type Accessor$Response<T> =
  | { $: 'success'; (): T }
  | { $: 'failed'; (): ResponseError }
  | { $: 'loading'; from: LoadingFrom; (): T | undefined }
  | { $: 'initial' };

type Accessor_ResponseGetter<T> = () => T;

export type Accessor_Response<T> = Accessor_ResponseGetter<T> &
  ({ stale: false } | { stale: `from-${LoadingFrom}` });

export interface OnUpdateParams {
  getMetadata: () => OnUpdateMetadata;
}

export type OnUpdateMetadata =
  | { $: 'data' }
  | { $: 'error'; error: ResponseError }
  | { $: 'loading' };

export interface WithErgoViewStates {
  error?: ComponentType<ResponseError>;
  loading?: ComponentType<unknown>;
}

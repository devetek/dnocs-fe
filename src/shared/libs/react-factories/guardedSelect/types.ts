import type { Response } from '../../api-client/rules/types';

export type Selector<S, R> = (store: S) => R;

export type UseModelSelector<S> = <R>(selector: Selector<S, R>) => R;

export type InferStore<H> = H extends UseModelSelector<infer S> ? S : never;

export type CoupleConstraint<M extends UseModelSelector<any>> = readonly [
  M,

  Selector<InferStore<M>, Response<any>>,
];

export type MappedDataHooks<H> = {
  [K in keyof H]: H[K] extends readonly [
    UseModelSelector<any>,

    (s: any) => Response<infer D>,
  ]
    ? <X>(selector: (data: D, isRefetching: boolean) => X) => X
    : never;
};

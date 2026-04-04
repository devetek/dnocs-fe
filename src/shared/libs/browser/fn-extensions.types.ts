import type { UIEvent } from 'react';

import type { TupleSplitSkipFirst } from '../slice-setter/types';

type AnyHandler = (...args: any[]) => void;

type Maybe<T> = T | undefined;

type Args<R, F extends AnyHandler> =
  R extends Maybe<(...args: infer RA) => void>
    ? RA extends []
      ? F extends Maybe<(...args: infer FArgs) => void>
        ? FArgs
        : never
      : RA extends [e: infer E]
        ? E extends UIEvent
          ? F extends Maybe<(e: infer FE, ...args: any[]) => void>
            ? FE extends UIEvent
              ? TupleSplitSkipFirst<Parameters<F>, 1>
              : unknown extends FE
                ? TupleSplitSkipFirst<Parameters<F>, 1>
                : never
            : never
          : never
        : never
    : never;

export type IntoEvent = {
  <R, F extends AnyHandler>(this: F, ...args: Args<R, F>): R;
};

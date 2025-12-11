/**
 * This is a utility type to split a tuple and skip the first element.
 *
 * For example:
 * ```ts
 * type MyTuple = [string, number, boolean];
 * type MyTupleWithoutFirst = TupleSplitSkipFirst<MyTuple, 1>; // [number, boolean]
 * ```
 */
export type TupleSplitSkipFirst<
  T extends unknown[],
  N extends number,
  R extends unknown[] = [],
> = R['length'] extends N
  ? T
  : T extends [unknown, ...infer U]
    ? TupleSplitSkipFirst<U, N, [...R, unknown]>
    : [];

export type SetterCb<TState> = (prevState: TState) => TState;
export type SetState<TState> = (fn: SetterCb<TState> | TState) => void;

/**
 * Explanation: For `extends` clause, it's okay to use `any` since it
 * merely acts as 'guarding' the shape of our generics while wanting
 * to allow others (in this case, we want it to be an array that can be
 * filled with any type).
 */

export type ActionHandler<TState, TParams extends any[] = any[]> = (
  prevState: TState,
  ...params: TParams
) => TState;

export type ActionRegistry<TState> = Record<string, ActionHandler<TState>>;

export type DispatcherParams<
  TState,
  T extends ActionHandler<TState>,
> = TupleSplitSkipFirst<Parameters<T>, 1>;

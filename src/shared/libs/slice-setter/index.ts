import { useMemo, useState } from 'react';

import type { ActionRegistry, SetState } from './types';
import { createDispatcher, mapSettersAsCallbacks } from './utils';

/**
 * A variation of `useReducer`, where instead of having to dispatch
 * action payloads, here we instead return a collection of callbacks
 * that were mapped and transformed from the given setters to help
 * modify its state.
 *
 * For example, given
 * ```ts
 * const INITIAL_STATE: State = { ... };
 *
 * const SETTERS = {
 *   setFieldA: (state: State, newValue: State['A']): State => { ... },
 *   setFieldB: (state: State, newValue: State['B']): State => { ... },
 * }
 * ```
 *
 * When `INITIAL_STATE` and `SETTERS` are passed to `useSetter`, this hook
 * will return a tuple of `[state, callbacks]`:
 * ```ts
 *   const [state, callbacks] = useSetter(INITIAL_STATE, SETTERS);
 *
 *   const {
 *     setFieldA, // (newValue: State['A']) => void;
 *     setFieldB, // (newValue: State['B']) => void;
 *   } = callbacks;
 * ```
 *
 * @author arudei-dev
 */
export function useSetter<
  TState,
  TSetterRegistry extends ActionRegistry<TState>,
>(initialState: TState, setterRegistry: TSetterRegistry) {
  const [state, setState] = useState(() => initialState);

  const callbacks = useMemo(
    () => mapSettersAsCallbacks(setState, setterRegistry),
    [setterRegistry],
  );

  return [state, callbacks, setState] as const;
}

/**
 * This is a variant of `useSlice`, however you'll need to pass your own state management
 * to it.
 *
 * This hooks contains only the part of `useSlice` where it'll register your actions into
 * one stable dispatcher function. Simply pass the `setState` function (make sure that it
 * has a stable reference -- for example with the one returned by `useState`) of your state
 * management system and your action registry, and it will returns said dispatcher.
 *
 * The benefit of using this over the ordinary `useSlice` is, you can define your actions
 * anywhere as long as you have access to the intended `setState` (for example, inside of
 * a context), making it portable accross your code.
 */
export function useSliceAction<
  TState,
  TActionRegistry extends ActionRegistry<TState>,
>(setterFn: SetState<TState>, actionRegistry: TActionRegistry) {
  return useMemo(
    () => createDispatcher(setterFn, actionRegistry),
    [setterFn, actionRegistry],
  );
}

/**
 * Similar to `useReducer` and other redux-like pattern, this hook
 * lets you modify your state using `dispatch`. However, instead of
 * using action payload and `switch` cases on the reducer function,
 * it accepts an object containing multiple setters mapped to each
 * action names.
 *
 * For example:
 * ```ts
 * const INITIAL_STATE: State = { ... };
 *
 * const ACTIONS = {
 *   RESET: () => { ... },
 *   SET_A: (state: State, payload: string): State => { ... },
 *   SET_B: (state: State, payload: number): State => { ... },
 * }
 * ```
 *
 * When `INITIAL_STATE` and `ACTIONS` are passed to `useSlice`, this hook
 * will return a tuple of `[state, dispatch]` similar to `useReducer`,
 * complete with the type inferrence.
 *
 * ```ts
 * const [state, dispatch] = useSlice(INITIAL_STATE, ACTIONS);
 * // ...
 * dispatch('SET_A', 'payload');
 * dispatch('SET_B', 0);
 *
 * // dispatch('RESET', 0); -- Error ts(2554): Expected 1 arguments, but got 2.
 * // dispatch('SET_C'); -- Error ts(2345): Argument of type '"SET_C"' is not assignable to parameter of type '"RESET" | "SET_A" | "SET_B"'.
 * ```
 *
 * Notice that you can only input `SET_A` and `SET_B` on the first parameter,
 * while the rest will follow the type signature given for each actions. Not only
 * that, it'll also allows you to have many number of arguments and it'll still able
 * to infer it to the dispatcher:
 *
 * ```ts
 * const ACTIONS = {
 *   RESET: () => { ... },
 *   SET_A_B: (state: State, a: string, b: number): State => { ... },
 * }
 * // ...
 * dispatch('SET_A_B', 'payload', 0);
 * ```
 *
 * @author arudei-dev
 */
export function useSlice<
  TState,
  TActionRegistry extends ActionRegistry<TState>,
>(initialState: TState, actionRegistry: TActionRegistry) {
  const [state, setState] = useState<TState>(() => initialState);

  const dispatch = useSliceAction(setState, actionRegistry);

  return [state, dispatch] as const;
}

/**
 * This is the combination of `useSlice` and `useSetter`.
 * @see {@link useSetter}
 * @see {@link useSlice}
 */
export function useSliceSetter<
  TState,
  TActionRegistry extends ActionRegistry<TState>,
  TSetterRegistry extends ActionRegistry<TState>,
>(
  initialState: TState,
  actionRegistry: TActionRegistry,
  setterRegistry: TSetterRegistry,
) {
  const [state, setState] = useState<TState>(() => initialState);

  const callbacks = useMemo(
    () => mapSettersAsCallbacks(setState, setterRegistry),
    [setterRegistry],
  );
  const dispatch = useMemo(
    () => createDispatcher(setState, actionRegistry),
    [actionRegistry],
  );

  return [state, { dispatch, ...callbacks }] as const;
}

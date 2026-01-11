import type { ActionRegistry, DispatcherParams, SetState } from './types';

/**
 * From a given set of actions registry (we call it 'slice'), this will create a
 * dispatcher that maps the given action name as its type and produces a dispatcher
 * callback.
 *
 * For example, given
 * ```ts
 * const ACTIONS = {
 *   SET_A: (state: State, payload: string): State => { ... },
 *   SET_B: (state: State, payload: number): State => { ... },
 * }
 * ```
 *
 * using `createDispatcher`, this will give a dispatcher that can be called like these:
 * ```ts
 * dispatch('SET_A', 'payload');
 * dispatch('SET_B', 0);
 * ```
 *
 * Note that you'll still be required to pass the `setStateHandler` yourself -- this has
 * the same function signature and are usually paired with the `setState` that is returned
 * by the `useState` hook.
 *
 * @author arudei-dev
 */
export function createDispatcher<
  TState,
  TActionRegistry extends ActionRegistry<TState>,
>(setStateHandler: SetState<TState>, actionRegistry: TActionRegistry) {
  const dispatcher = <K extends keyof TActionRegistry>(
    type: K,
    ...rest: DispatcherParams<TState, TActionRegistry[K]>
  ) => {
    setStateHandler((prevState) => {
      const origAction = actionRegistry[type];
      if (!origAction) return prevState;
      return origAction(prevState, ...rest);
    });
  };

  return dispatcher;
}

/**
 * This function will map an object containing `setters` and transforming it into
 * a callable function.
 *
 * For example, given
 * ```ts
 * const SETTER = {
 *   setFieldA: (state: State, newValue: State['A']): State => { ... },
 *   setFieldB: (state: State, newValue: State['B']): State => { ... },
 * }
 * ```
 *
 * It will map `SETTER` and transforming it into
 * ```ts
 *   typeof setFieldA // (newValue: State['A']) => void;
 *   typeof setFieldB // (newValue: State['B']) => void;
 * ```
 *
 * Notice that the resulting callbacks are missing the first parameter and now returns
 * a void. This is because in the original `SETTER` object, these information are used
 * to inject a `setStateHandler` that'll set the current state directly -- this is what
 * happens behind the scene:
 * ```
 * const setFieldA = (newValue: State['A']) => {
 *   setStateHandler(prevState => {
 *     return SETTER.setFieldA(prevState, newValue);
 *   });
 * }
 * ```
 *
 * Note that you'll still be required to pass the `setStateHandler` yourself -- this has
 * the same function signature and are usually paired with the `setState` that is returned
 * by the `useState` hook.
 *
 * @author arudei-dev
 */
export function mapSettersAsCallbacks<
  TState,
  TSetterRegistry extends ActionRegistry<TState>,
>(setStateHandler: SetState<TState>, setterRegistry: TSetterRegistry) {
  /**
   * SAFETY:
   * This type cannot be verified at compile time due to the limitation of Typescript,
   * however it will be valid at runtime. We can use the combination of `map` and `reduce`,
   * however this would mean that we have to iterate it 2 times instead of just having it once
   * imperatively (using index operator to directly fill the specified key).
   */
  // @ts-expect-error: aldey.putra@tokopedia.com see notes above
  const registeredSetters: {
    // This is defined inline to allow full type description on our output.
    [K in keyof TSetterRegistry]: (
      ...params: DispatcherParams<TState, TSetterRegistry[K]>
    ) => void;
  } = {};

  for (const [actionKey, actionCb] of Object.entries(setterRegistry)) {
    registeredSetters[actionKey as keyof typeof registeredSetters] = (
      ...rest: DispatcherParams<TState, typeof actionCb>
    ) => {
      setStateHandler((prevState) => {
        return actionCb(prevState, ...rest);
      });
    };
  }

  return registeredSetters;
}

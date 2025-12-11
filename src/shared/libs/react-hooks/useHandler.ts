import { useCallback, useRef } from 'react';

import { useIsomorphicEffect } from './useIsomorphicEffect';

/**
 * A custom hook that returns a stable version of the provided function.
 * The returned function maintains the same reference across renders,
 * ensuring that it does not trigger unnecessary re-renders when used
 * as a dependency in other hooks.
 *
 * Note: This hook should not be used with "reactive" functions, i.e.,
 * functions that need to be re-triggered when their dependencies change.
 *
 * @template F - The type of the function to be stabilized.
 * @param {F} fn - The function to be stabilized.
 * @returns {F} - A stable version of the provided function.
 *
 * @example
 * ```typescript
 * const stableHandler = useHandler((event) => {
 *   console.log(event);
 * });
 * ```
 */
// DESC: Any is valid for generic constraints.

export default function useHandler<F extends (...params: any[]) => any>(
  fn: F,
): F {
  const refFn = useRef(fn);

  useIsomorphicEffect(() => {
    refFn.current = fn;
  });

  const stableFn = useCallback((...params: Parameters<F>) => {
    return refFn.current(...params);
  }, []);

  return stableFn as F;
}

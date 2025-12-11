import { useState } from 'react';

/**
 * A custom hook that allows state to be overridden by an external value.
 *
 * This is effectively a pattern for handling "controlled" vs "uncontrolled" components.
 * If the `value` argument is provided (not null or undefined), it takes precedence
 * over the internal state.
 *
 * @param value - The external value. If this is defined, it will be returned instead of the internal state.
 * @returns A tuple containing the current effective value (external or internal) and the state setter function.
 */
export default function useStateOr<V>(value?: V) {
  const [state, setState] = useState<V>();

  return [value ?? state, setState] as const;
}

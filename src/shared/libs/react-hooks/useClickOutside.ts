import type { RefObject } from 'react';
import { useEffect } from 'react';

import useHandler from './useHandler';

type Event = MouseEvent | TouchEvent;

/**
 * Custom hook that triggers a handler function when a click is detected outside of the specified element.
 *
 * @template T - The type of the HTML element, defaults to HTMLElement.
 * @param ref - A React ref object pointing to the element to detect outside clicks for.
 * @param handler - A function to be called when a click outside the referenced element is detected.
 *
 * @example
 * const ref = useRef(null);
 * useClickOutside(ref, () => {
 *   console.log('Clicked outside');
 * });
 *
 * @returns
 */
function useClickOutside<T extends HTMLElement = HTMLElement>(
  ref: RefObject<T | null>,
  handler: (event: Event) => void,
): void {
  const stableHandler = useHandler(handler);

  useEffect(() => {
    const listener = (event: Event) => {
      // Do nothing if clicking ref's element or descendent elements
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      stableHandler(event);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, stableHandler]);
}

export default useClickOutside;

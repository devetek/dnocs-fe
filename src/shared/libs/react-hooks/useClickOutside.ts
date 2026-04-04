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
  ref: RefObject<T | null> | Array<RefObject<T | null>>,
  handler: (event: Event) => void,
): void {
  const stableHandler = useHandler(handler);

  useEffect(() => {
    const listener = (event: Event) => {
      const refs = Array.isArray(ref) ? ref : [ref];

      if (!refs.some((r) => r.current)) return;

      // Check if the click target is inside ANY of the provided refs
      const isInside = refs.some((refItem) =>
        refItem.current?.contains(event.target as Node),
      );

      // If it's not inside any of them, it's an "outside" click
      if (!isInside) {
        stableHandler(event);
      }
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

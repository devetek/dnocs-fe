import type { RefObject } from 'react';
import { useEffect, useRef } from 'react';

import useHandler from './useHandler';

export default function useResizeObserver<T extends HTMLElement>(
  callback: ResizeObserverCallback,
) {
  const ref = useRef<T>(null);

  useResizeObserverOf({ ref, callback });

  return ref;
}

interface Options<T extends HTMLElement> {
  ref: RefObject<T | null>;
  callback: ResizeObserverCallback;
  skip?: boolean;
}

export function useResizeObserverOf<T extends HTMLElement>(
  options: Options<T>,
) {
  const { callback, ref, skip } = options;

  const stableCallback = useHandler(callback);

  useEffect(() => {
    if (!ref.current || skip) return;

    const observer = new ResizeObserver(stableCallback);
    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, [ref, stableCallback, skip]);

  return ref;
}

import { useEffect, useRef } from 'react';

import useHandler from './useHandler';

export default function useResizeObserver<T extends HTMLElement>(
  callback: ResizeObserverCallback,
) {
  const ref = useRef<T>(null);

  const stableCallback = useHandler(callback);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new ResizeObserver(stableCallback);
    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, [stableCallback]);

  return ref;
}

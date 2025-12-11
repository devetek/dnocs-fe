import { useEffect, useState } from 'react';

export function useDebounceValue<V>(value: V, delayMs = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  const [isDebouncing, setIsDebouncing] = useState(false);

  if (value !== debouncedValue && !isDebouncing) {
    setIsDebouncing(true);
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
      setIsDebouncing(false);
    }, delayMs);

    return () => {
      clearTimeout(timer);
    };
  }, [delayMs, value]);

  return [debouncedValue, isDebouncing] as const;
}

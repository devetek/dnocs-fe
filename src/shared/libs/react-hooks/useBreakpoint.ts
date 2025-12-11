import { useState } from 'react';

import { isBrowser } from '../browser/environment';

import { useIsomorphicEffect } from './useIsomorphicEffect';

// import { isBrowser, useIsomorphicEffect } from "../react-utils";

const CONFIG = {
  sm: '--breakpoint-sm',
  md: '--breakpoint-md',
  lg: '--breakpoint-lg',
  xl: '--breakpoint-xl',
} as const;

// Forked from https://github.com/kodingdotninja/use-tailwind-breakpoint
export function useBreakpoint(
  breakpoint: keyof typeof CONFIG,
  defaultValue = false,
) {
  const [match, setMatch] = useState(() => defaultValue);

  useIsomorphicEffect(() => {
    if (!(isBrowser() && 'matchMedia' in window)) {
      return;
    }

    const style = window.getComputedStyle(document.body);
    const value = style.getPropertyValue(CONFIG[breakpoint]);

    const query = window.matchMedia(`(min-width: ${value})`);

    function listener(event: MediaQueryListEvent) {
      setMatch(event.matches);
    }

    setMatch(query.matches);

    query.addEventListener('change', listener);
    return () => query.removeEventListener('change', listener);
  }, [breakpoint, defaultValue]);

  return match;
}

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

type BreakpointKey = keyof typeof CONFIG;

export function useBreakpointValues() {
  const [currentBreakpoint, setCurrentBreakpoint] = useState<
    BreakpointKey | 'xs'
  >();

  useIsomorphicEffect(() => {
    const style = window.getComputedStyle(document.documentElement);

    // Convert CSS variables to raw numbers (assuming rem)
    const getVal = (v: string) => {
      const result = parseInt(style.getPropertyValue(v), 10);

      return (
        result * parseFloat(getComputedStyle(document.documentElement).fontSize)
      );
    };

    const specs = [
      { key: 'xs', query: `(max-width: ${getVal(CONFIG.sm) - 0.1}px)` },
      {
        key: 'sm',
        query: `(min-width: ${getVal(CONFIG.sm)}px) and (max-width: ${getVal(CONFIG.md) - 0.1}px)`,
      },
      {
        key: 'md',
        query: `(min-width: ${getVal(CONFIG.md)}px) and (max-width: ${getVal(CONFIG.lg) - 0.1}px)`,
      },
      {
        key: 'lg',
        query: `(min-width: ${getVal(CONFIG.lg)}px) and (max-width: ${getVal(CONFIG.xl) - 0.1}px)`,
      },
      { key: 'xl', query: `(min-width: ${getVal(CONFIG.xl)}px)` },
    ];

    const mqls = specs.map((spec) => ({
      key: spec.key,
      mql: window.matchMedia(spec.query),
    }));

    const update = () => {
      const active = mqls.find((m) => m.mql.matches);

      setCurrentBreakpoint(active?.key as BreakpointKey | 'xs');
    };

    // Initialize and Listen
    update();
    mqls.forEach((m) => m.mql.addEventListener('change', update));

    return () =>
      mqls.forEach((m) => m.mql.removeEventListener('change', update));
  }, []);

  return [currentBreakpoint] as const;
}

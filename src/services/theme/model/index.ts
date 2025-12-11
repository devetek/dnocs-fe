import { useMemo, useState } from 'react';

import { useRouter } from '@tanstack/react-router';
import Cookies from 'js-cookie';

import { isSSR } from '@/shared/libs/browser/environment';
import { buildContext } from '@/shared/libs/react-factories/buildContext';
import useHandler from '@/shared/libs/react-hooks/useHandler';
import { useIsomorphicEffect } from '@/shared/libs/react-hooks/useIsomorphicEffect';

import type { Theme } from '../config';
import { SUPPORTED_THEME, THEME_COOKIE } from '../config';

export const [DevetekThemeModel, useDevetekThemeModel] = buildContext(
  'DevetekThemeModel',
  () => {
    const [userTheme, setUserThemeInternal] = useState((): Theme | null => {
      try {
        const storedTheme: string | undefined = Cookies.get()[THEME_COOKIE];

        if (!storedTheme) {
          throw Error('No user defined theme set yet');
        }

        if (!SUPPORTED_THEME.includes(storedTheme as Theme)) {
          throw Error('Unknown saved theme');
        }

        return storedTheme as Theme;
      } catch {
        return null;
      }
    });

    const systemTheme = useMemo((): Theme => {
      if (isSSR()) return 'light';

      return window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
    }, []);

    const router = useRouter();

    useIsomorphicEffect(() => {
      const root = window.document.documentElement;

      root.classList.remove(...SUPPORTED_THEME);

      if (!userTheme) {
        root.classList.add(systemTheme);
        return;
      }

      root.classList.add(userTheme);
    }, [systemTheme, userTheme]);

    const setUserTheme = useHandler((newTheme?: Theme | null) => {
      if (!newTheme) {
        Cookies.remove(THEME_COOKIE);
      } else {
        Cookies.set(THEME_COOKIE, newTheme, { expires: 365 });
      }

      setUserThemeInternal(newTheme || null);
      router.invalidate();
    });

    return {
      isSystem: !userTheme,
      systemTheme,
      userTheme,
      setUserTheme,
    };
  },
);

export function useTheme() {
  const { isSystem, setUserTheme, systemTheme, userTheme } =
    useDevetekThemeModel();

  return [
    userTheme || systemTheme,
    { setTheme: setUserTheme, isSystem },
  ] as const;
}

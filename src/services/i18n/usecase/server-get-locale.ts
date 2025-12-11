import { createServerFn } from '@tanstack/react-start';
import { getRequest } from '@tanstack/react-start/server';
import { parse } from 'cookie';

import type { Locale } from '../config';
import { DEFAULT_LOCALE, LOCALE_COOKIE, REGISTERED_LOCALES } from '../config';

export const getServerLocale = createServerFn({ method: 'GET' }).handler(() => {
  try {
    const request = getRequest();
    const cookieHeader = request.headers.get('cookie') || '';

    // Use the 'cookie' library to parse safely
    const cookies = parse(cookieHeader);
    const value = cookies[LOCALE_COOKIE];

    if (value && REGISTERED_LOCALES.includes(value as Locale)) {
      return value as Locale;
    }
  } catch (error) {
    console.error('Failed to retrieve server locale:', error);
  }

  return DEFAULT_LOCALE;
});

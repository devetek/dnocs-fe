import Cookies from 'js-cookie';

import type { Locale } from '../config';
import { DEFAULT_LOCALE, LOCALE_COOKIE, REGISTERED_LOCALES } from '../config';

export async function loadMessages(locale: Locale) {
  // Vite automatically splits this into chunks
  return (await import(`@/services/i18n/config/dict-${locale}.json`)).default;
}

export async function getLocale(): Promise<Locale> {
  // A. Client Side: Read directly from browser (Fast, no network request)
  if (typeof document !== 'undefined') {
    const value = Cookies.get(LOCALE_COOKIE);

    return value && REGISTERED_LOCALES.includes(value as Locale)
      ? (value as Locale)
      : DEFAULT_LOCALE;
  }

  // B. Server Side: Call the server function
  const getServerLocale = (await import('./server-get-locale')).getServerLocale;
  return await getServerLocale();
}

export function setLocale(locale: Locale) {
  // Set cookie for 1 year
  Cookies.set(LOCALE_COOKIE, locale, { expires: 365 });
}

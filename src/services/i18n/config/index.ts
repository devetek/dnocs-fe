export const REGISTERED_LOCALES = ['en', 'id'] as const;
export type Locale = (typeof REGISTERED_LOCALES)[number];

export const DEFAULT_LOCALE: Locale = 'en';
export const LOCALE_COOKIE = 'devetek-locale';

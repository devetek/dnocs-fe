export const SUPPORTED_THEME = ['light', 'dark'] as const;

export type Theme = (typeof SUPPORTED_THEME)[number];

export const THEME_COOKIE = 'devetek-theme';

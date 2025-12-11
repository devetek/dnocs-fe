import { isBrowser } from './environment';

export function isOnline(defaultValue = true) {
  if (!isBrowser()) return defaultValue;

  return navigator.onLine;
}

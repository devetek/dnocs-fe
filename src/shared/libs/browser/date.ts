import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import utc from 'dayjs/plugin/utc';
import type { Locale } from 'use-intl';
import 'dayjs/locale/id';

dayjs.extend(relativeTime);
dayjs.extend(utc);

/**
 * Truncates the fractional seconds to three digits, parses the date with UTC+7 offset, and returns the relative time from now.
 * @param dateStr - The date string to be parsed. Expected format: "YYYY-MM-DD HH:mm:ss.SSSSSS +ZZZZ WIB"
 * @returns string - Human-readable relative time from now (e.g., "just now", "a minute ago")
 */
export function getDistanceFromNow(
  dateStr: string | Date,
  locale: Locale = 'en',
): string {
  if (typeof dateStr === 'string') {
    const modifiedDateStr = dateStr
      .replace(/\.(\d{3})\d+/, '.$1')
      .replace(/ WIB$/, '');

    const parsedDate = dayjs(
      modifiedDateStr,
      'YYYY-MM-DD HH:mm:ss.SSS ZZ',
      true,
    ).utcOffset(420);

    return parsedDate.locale(locale).fromNow();
  }

  return dayjs(dateStr).locale(locale).fromNow();
}

/**
 * Converts a given number of seconds into a human-readable string format (e.g., "1h 2m 3s", "2m 3s", "3s").
 * @param seconds - The total number of seconds to be converted.
 * @returns string - Human-readable time string.
 */
export function humanizeSeconds(seconds: number): string {
  if (seconds < 0) {
    return '';
  }

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  const parts: string[] = [];
  if (hours > 0) {
    parts.push(`${hours}h`);
  }
  if (minutes > 0) {
    parts.push(`${minutes}m`);
  }
  if (remainingSeconds > 0 || (hours === 0 && minutes === 0)) {
    // Always show seconds if it's the only unit or if it's 0 and no other units are present
    parts.push(`${remainingSeconds}s`);
  }

  return parts.join(' ');
}

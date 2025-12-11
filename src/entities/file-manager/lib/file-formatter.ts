const UNITS = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB'];
const STEP = 1024;
const LOG_STEP = Math.log2(STEP);

export function formatFileSize(bytes: number): string {
  if (!Number.isFinite(bytes) || bytes <= 0) {
    return '0 bytes';
  }

  if (bytes < STEP) {
    return `${Math.round(bytes)} bytes`;
  }

  const unitIndex = Math.min(
    UNITS.length - 1,
    Math.floor(Math.log2(bytes) / LOG_STEP),
  );
  const value = bytes / STEP ** unitIndex;
  const precision = value >= 10 ? 1 : 2;
  const factor = precision === 1 ? 10 : 100;
  const rounded = Math.round(value * factor) / factor;
  const display = Number.isInteger(rounded)
    ? String(rounded)
    : rounded.toFixed(precision);

  return `${display} ${UNITS[unitIndex]}`;
}

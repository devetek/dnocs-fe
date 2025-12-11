// #region Safe Parse Int

export function safeParseInt(
  value: string | number | undefined | null,
  defaultValue: number,
): number;
export function safeParseInt(
  value: string | number | undefined | null,
  defaultValue?: number,
): number | undefined;

export function safeParseInt(
  value: string | number | undefined | null,
  defaultValue?: number,
): number | undefined {
  if (value === undefined || value === null) {
    return defaultValue;
  }

  const parsed = parseInt(value.toString(), 10);
  return isNaN(parsed) ? defaultValue : parsed;
}

// #endregion Safe Parse Int

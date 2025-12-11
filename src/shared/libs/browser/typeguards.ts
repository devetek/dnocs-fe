/**
 * A type guard function that filters out `null` and `undefined` values.
 *
 * @template T - The type of the item being checked.
 * @param item - The item to check for `null` or `undefined`.
 * @returns A boolean indicating whether the item is not `null` or `undefined`.
 */
export function excludeNully<T>(item: T | null | undefined): item is T {
  return item != null;
}

export function excludeFalsy<T>(item: T | false | null | undefined): item is T {
  return excludeNully(item) && item != false;
}

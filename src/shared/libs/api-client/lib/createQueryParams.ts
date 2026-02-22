/**
 *
 * @param params - An object containing key-value pairs to be converted into query parameters.
 *                 The values can be strings, numbers, or undefined.
 *                 If a value is undefined, the key will be omitted from the resulting query string.
 * @returns new URLSearchParams - A URLSearchParams object containing the filtered key-value pairs.
 */
export default function createQueryParams(
  params: Record<string, string | number | boolean | null | undefined>,
): URLSearchParams {
  const filteredParams: Record<string, string> = {};

  Object.entries(params).forEach(([key, value]) => {
    if (value != null && value !== '' && value !== false) {
      filteredParams[key] = String(value);
    }
  });

  return new URLSearchParams(filteredParams);
}

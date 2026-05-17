/**
 * Capitalizes the first letter of a given string.
 * @param sentence - The input string.
 * @returns The string with the first letter capitalized, or an empty string if the input is null or undefined.
 */
export const capitalizeFirstLetter = (sentence?: string) => {
  if (!sentence) return '';
  return sentence.charAt(0).toUpperCase() + sentence.slice(1);
};

/**
 * Capitalizes the first letter of each word in a given sentence.
 * @param sentence - The input sentence.
 * @returns The sentence with the first letter of each word capitalized, or an empty string if the input is null or undefined.
 */
export const capitalizeEveryFirstLetter = (sentence?: string) => {
  if (!sentence) return '';
  return sentence
    .split(' ')
    .map((word) => capitalizeFirstLetter(word))
    .join(' ');
};

export const camelCaseToCapitalizedSentence = (sentence?: string) => {
  if (!sentence) return '';
  return (
    sentence
      // 1. Insert space before uppercase letters
      .replace(/([A-Z])/g, ' $1')
      // 2. Uppercase the first character
      .replace(/^./, (match) => match.toUpperCase())
      // 3. Trim any leading/trailing spaces
      .trim()
  );
};

export const kebabCaseToCamelCase = (sentence?: string) => {
  if (!sentence) return '';
  return sentence.replace(/-([a-z])/g, (_, p1) => p1.toUpperCase());
};

declare global {
  interface StringConstructor {
    tryFrom: (value: unknown) => string | undefined;
  }

  interface String {
    truncate: (limit: number, ellipsis?: string) => string;
  }
}

String.tryFrom = function (value) {
  if (value == null) return undefined;

  if (typeof value === 'object' && 'toString' in value) {
    const processed = value.toString();

    if (typeof processed !== 'string') return undefined;

    return value.toString();
  }

  return String(value);
};

String.prototype.truncate = function (limit: number, ellipsis = '...') {
  if (this.length <= limit) return this.toString();

  return this.substring(0, limit) + ellipsis;
};

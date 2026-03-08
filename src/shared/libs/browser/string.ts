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

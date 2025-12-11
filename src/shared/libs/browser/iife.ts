/**
 * Immediately Invoked Function Expression (IIFE) utility.
 *
 * This function takes a function as an argument and immediately executes it,
 * returning its result. It's a common pattern in JavaScript to create a
 * private scope for variables and avoid polluting the global namespace.
 *
 * @template T The return type of the function to be executed.
 * @param fn The function to be immediately invoked.
 * @returns The result of the invoked function.
 *
 * @example
 * const result = iife(() => {
 *   const a = 10;
 *   const b = 20;
 *   return a + b;
 * });
 * console.log(result); // 30
 *
 * @example
 * const myModule = iife(() => {
 *   let privateVar = "I'm private";
 *
 *   function publicMethod() {
 *     console.log(privateVar);
 *   }
 *
 *   return {
 *     publicMethod,
 *   };
 * });
 * myModule.publicMethod(); // "I'm private"
 */

export function iife<T>(fn: () => T) {
  return fn();
}

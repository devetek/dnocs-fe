import { createContext, use } from 'react';
import type { PropsWithChildren } from 'react';

/**
 * Function factory to create a React context.
 *
 * # Usage
 * ```ts
 * export const [MyProvider, useMyContext] = buildContext('My', () => {
 *   const contextValue = { ... };
 *
 *   // Specific logics
 *
 *   return contextValue;
 * });
 * ```
 *
 * This is equivalent to doing:
 * ```tsx
 * const MyContext = createContext<T | symbol | undefined>(Symbol(`MyContext`));
 *
 * export function MyProvider(props: PropsWithChildren<Props>) {
 *   const contextValue = { ... };
 *
 *   // Specific logics
 *
 *   return <CurrentContext.Provider value={contextValue}>{props.children}</CurrentContext.Provider>;
 * }
 *
 * MyProvider.displayName = `MyProvider`;
 *
 * export const useMyContext = () => useSafeContext(CurrentContext);
 * ```
 *
 * Effectively, cutting the repetitions of having to type the same thing over and over again.
 *
 * @param description The name of the context (used for symbol description and debugging purposes).
 * @param useContextSource a function (deliberately shaped like a custom hook) that returns `contextValue`.
 * You can also give it a "props" argument, which will act as the required props for the exported `Provider`
 * React component.
 * @returns a 2-tuple of `[Provider, useContext]`.
 */
export function buildContext<T, Props>(
  description: string,
  useContextSource: (props: Props) => T,
) {
  const CurrentContext = createContext<T | symbol>(
    Symbol(`${description}Context`),
  );

  function Provider(props: PropsWithChildren<Props>) {
    const contextValue = useContextSource(props);

    return (
      <CurrentContext value={contextValue}>{props.children}</CurrentContext>
    );
  }

  Provider.displayName = `${description}Provider`;

  const useCurrentContext = () => {
    const contextValue = use(CurrentContext);

    if (typeof contextValue === 'symbol') {
      throw new Error(
        `use${description}Context must be used within a ${description}Provider`,
      );
    }

    return contextValue;
  };

  const rest = {
    ContextProvider: CurrentContext.Provider,
  };

  return [Provider, useCurrentContext, rest] as const;
}

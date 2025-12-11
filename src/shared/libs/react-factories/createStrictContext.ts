import { createContext, use } from 'react';

export function createStrictContext<V>(description: string) {
  const Context = createContext<V | symbol>(Symbol(description));

  const useContext = () => {
    const contextValue = use(Context);

    if (typeof contextValue === 'symbol') {
      throw Error(
        `Context ${contextValue.description} must be used within its provider!`,
      );
    }

    return contextValue;
  };

  return [Context, useContext] as const;
}

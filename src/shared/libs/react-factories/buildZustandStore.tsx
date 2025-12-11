import type { PropsWithChildren, RefObject } from 'react';
import { createContext, use, useRef } from 'react';

import { useStore } from 'zustand';
import { useShallow } from 'zustand/shallow';
import type { StoreApi } from 'zustand/vanilla';

export default function buildZustandStore<S, InitialState>(
  description: string,
  createStore: (initialState: InitialState) => StoreApi<S>,
) {
  const CurrentContext = createContext<
    RefObject<StoreApi<S> | undefined> | symbol
  >(Symbol(`${description}Context`));

  function Provider(props: PropsWithChildren<InitialState>) {
    const refStore = useRef<StoreApi<S>>(undefined);

    if (refStore.current == null) {
      refStore.current = createStore(props);
    }

    return <CurrentContext value={refStore}>{props.children}</CurrentContext>;
  }

  Provider.displayName = `${description}Provider`;

  const useCurrentSelector = <T,>(selector: (store: S) => T) => {
    const contextValue = use(CurrentContext);

    if (typeof contextValue === 'symbol') {
      throw new Error(
        `use${description}Context must be used within a ${description}Provider`,
      );
    }

    return useStore(contextValue.current!, useShallow(selector));
  };

  return [Provider, useCurrentSelector] as const;
}

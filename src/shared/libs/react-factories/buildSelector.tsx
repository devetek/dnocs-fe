import type { PropsWithChildren, RefObject } from 'react';
import { createContext, use, useEffect, useRef } from 'react';

import type { StoreApi } from 'zustand';
import { createStore, useStore } from 'zustand';
import { useShallow } from 'zustand/shallow';

export default function buildSelector(description: string) {
  return function <T, Props>(useSource: (props: Props) => T) {
    type StoreInstance = StoreApi<{ source: T }>;

    const StoreInstanceContext = createContext<
      RefObject<StoreInstance | undefined> | symbol
    >(Symbol(`${description}Context`));

    function Provider(props: PropsWithChildren<Props>) {
      const source = useSource(props);

      const refStoreInstance = useRef<StoreInstance>(undefined);

      if (refStoreInstance.current == null) {
        refStoreInstance.current = createStore<{ source: T }>()(() => ({
          source,
        }));
      }

      useEffect(() => {
        refStoreInstance.current?.setState({ source });
      }, [source]);

      return (
        <StoreInstanceContext value={refStoreInstance}>
          {props.children}
        </StoreInstanceContext>
      );
    }

    function useSelector<V>(selector: (store: T) => V) {
      const storeInstance = use(StoreInstanceContext);

      if (typeof storeInstance === 'symbol' || storeInstance.current == null) {
        throw new Error(
          `use${description}Selector must be used within a ${description}Provider`,
        );
      }

      return useStore(
        storeInstance.current,
        useShallow((store) => selector(store.source)),
      );
    }

    return [Provider, useSelector] as const;
  };
}

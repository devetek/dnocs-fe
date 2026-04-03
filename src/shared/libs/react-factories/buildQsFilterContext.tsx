import { useEffect, useMemo, useRef, useState } from 'react';

import { useSearch } from '@tanstack/react-router';

import { capitalizeFirstLetter } from '../browser/string';
import { mapSettersAsCallbacks } from '../slice-setter/utils';

import { buildContext } from './buildContext';

type Init<T> = (qsValue?: string | null) => T;

type FilterInit<S> = {
  [K in keyof S]:
    | Init<S[K]>
    | {
        qs: string;
        init: Init<S[K]>;
      };
};

export function buildQsFilterContext<S extends object>(
  description: string,
  init: FilterInit<S>,
) {
  return buildContext(description, () => {
    const searchParams: Record<string, string> = useSearch({ strict: false });

    const [filter, setFilter] = useState<S>(() => {
      const tempFilter = {} as S;

      for (const key in init) {
        const selectedKey = init[key];

        if (typeof selectedKey === 'object') {
          tempFilter[key] = selectedKey.init(searchParams[selectedKey.qs]);
          continue;
        }

        tempFilter[key] = selectedKey(searchParams[key]);
      }

      return tempFilter;
    });

    // Sync URL → filter when Router navigates with new search params (e.g. sidebar filter links).
    // We use a ref to skip the very first render (useState already handles that).
    const isMounted = useRef(false);
    const searchParamsKey = JSON.stringify(searchParams);

    useEffect(() => {
      if (!isMounted.current) {
        isMounted.current = true;
        return;
      }

      const newFilter = {} as S;

      for (const key in init) {
        const selectedKey = init[key];

        if (typeof selectedKey === 'object') {
          newFilter[key] = selectedKey.init(searchParams[selectedKey.qs]);
        } else {
          newFilter[key] = selectedKey(searchParams[key]);
        }
      }

      setFilter(newFilter);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchParamsKey]);

    useEffect(() => {
      const newQuery = new URLSearchParams(searchParams);

      const setQueryParam = (name: string, value?: string) => {
        if (value) {
          newQuery.set(name, value);
        } else {
          newQuery.delete(name);
        }
      };

      for (const [key, value] of Object.entries(filter)) {
        const selectedInit = init[key as keyof S];

        const qsKey = typeof selectedInit === 'object' ? selectedInit.qs : key;

        setQueryParam(qsKey, value != null ? String(value) : undefined);
      }

      const stringified = newQuery.toString();
      window.history.replaceState(null, '', `?${stringified}`);
    });

    const setters = useMemo(() => {
      type Callbacks = {
        [K in keyof S as `set${Capitalize<string & K>}`]: (
          prevState: S,
          value: S[K],
        ) => S;
      };

      const callbacksRegistry = {} as Callbacks;

      for (const initKey of Object.keys(init)) {
        const setterName = `set${capitalizeFirstLetter(
          initKey,
        )}` as keyof Callbacks;

        const setter = (prevState: S, value: S[keyof S]): S => {
          return {
            ...prevState,
            [initKey]: value,
          };
        };

        callbacksRegistry[setterName] = setter as Callbacks[keyof Callbacks];
      }

      return mapSettersAsCallbacks<S, Callbacks>(setFilter, callbacksRegistry);
    }, []);

    return {
      ...filter,
      ...setters,
    };
  });
}

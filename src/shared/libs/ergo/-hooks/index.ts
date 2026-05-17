/** biome-ignore-all lint/suspicious/noExplicitAny: This file involves so many dark magic. */
/** biome-ignore-all lint/complexity/noBannedTypes: I know what I'm doing */
/** biome-ignore-all lint/style/noNonNullAssertion: YOLO */

import { useEffect, useMemo, useRef } from 'react';
import '@/shared/libs/browser/array';

import { f } from '../../browser/fn';
import { THROW_MARKER } from '../-config';
import type {
  Accessor,
  Ergoed,
  OnUpdateParams,
  Response,
  ThrownObject,
} from '../-rules/types';

const GlobalInstanceCache = new WeakMap<object, Map<string, any>>();

const TERMINATION_KEYS: Array<keyof Accessor<unknown>> = ['$', '_'];

const parse$ = (response: Response<unknown>) => {
  const hasData =
    response.$status === 'success' ||
    (response.$status === 'loading' && response.prevData != null);

  if (hasData) {
    return {
      $: 'data' as const,
    };
  }

  if (response.$status === 'failed') {
    return {
      $: 'error' as const,
      error: response,
    };
  }

  return {
    $: 'loading' as const,
  };
};

type RegistryUpdater = Set<(params: OnUpdateParams) => void>;

export const CurrentRenderContext: {} | null = null;

export default function useErgo<Data>(response: Response<Data>): Ergoed<Data> {
  const refRegistryUpdater = useRef<RegistryUpdater | null>(null);

  if (refRegistryUpdater.current == null) {
    refRegistryUpdater.current = new Set();
  }

  useEffect(() => {
    refRegistryUpdater.current!.forEach((updater) => {
      updater({
        getMetadata: () => parse$(response),
      });
    });
  }, [response]);

  return useMemo(
    () =>
      proxyManager(
        response as Response<object>,
        refRegistryUpdater.current!,
      ) as any,
    [response],
  );
}

function proxyManager(
  rootResponse: Response<object>,
  updaterRegistry: Set<(params: OnUpdateParams) => void>,
) {
  if (!GlobalInstanceCache.has(rootResponse)) {
    GlobalInstanceCache.set(rootResponse, new Map());
  }

  function assigned(target: object, source: object) {
    Object.assign(target, source);
    return target;
  }

  const with$ = (status: string, fn: Function) => {
    return assigned(fn, {
      $: status,
    });
  };

  const getDataFromAny = () => {
    if (rootResponse.$status === 'success') return rootResponse;
    if (rootResponse.$status === 'loading') return rootResponse.prevData;

    return undefined;
  };

  function createHandlersFor$(path: string[] = []) {
    return {
      errorWhenFailed: with$('failed', () => rootResponse),
      dataWhenSuccess: with$('success', () => {
        // @ts-expect-error
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        return path.reduce((acc, key) => acc?.[key], rootResponse);
      }),
      dataWhenLoading: with$('loading', () => {
        const target = getDataFromAny();

        // @ts-expect-error
        return path.reduce((acc, key) => acc?.[key], target);
      }),
    };
  }

  function createHandlerFor_(path: string[] = []) {
    const getter = () => {
      const target = f(() => {
        if (rootResponse.$status === 'success') {
          return rootResponse;
        }

        if (
          rootResponse.$status === 'loading' &&
          rootResponse.prevData != null
        ) {
          return rootResponse.prevData;
        }

        throw Error('Unreachable!');
      });

      // @ts-expect-error
      return path.reduce((acc, key) => acc[key], target);
    };

    return assigned(getter, {
      $: rootResponse.$status,
      stale: f(() => {
        if (rootResponse.$status === 'success') {
          return false;
        }

        if (
          rootResponse.$status === 'loading' &&
          rootResponse.prevData != null
        ) {
          return `from-${rootResponse.from}`;
        }

        return undefined;
      }),
    });
  }

  function createPathProxy(path: string[] = []) {
    return new Proxy(
      {},
      {
        get(_, prop) {
          if (!TERMINATION_KEYS.mayIncludes(prop as string)) {
            return createPathProxy([...path, prop as string]);
          }

          const pathKey = path.join('.');

          const rootCache = GlobalInstanceCache.get(rootResponse)!;

          if (!rootCache.has(pathKey)) {
            rootCache.set(pathKey, {
              $: createHandlersFor$(path),
              _: createHandlerFor_(path),
            });
          }

          const handlers = rootCache.get(pathKey)[prop];

          if (prop === '$') {
            if (rootResponse.$status === 'success') {
              return handlers.dataWhenSuccess;
            }

            if (rootResponse.$status === 'failed') {
              return handlers.errorWhenFailed;
            }

            if (rootResponse.$status === 'loading') {
              return handlers.dataWhenLoading;
            }

            return {
              $: 'initial',
            };
          }

          if (prop === '_') {
            if (rootResponse.$status === 'success') {
              return handlers;
            }

            if (
              rootResponse.$status === 'loading' &&
              rootResponse.prevData != null
            ) {
              return handlers;
            }

            throw {
              __marker: THROW_MARKER,
              meta: parse$(rootResponse),
              registerUpdate: (onUpdate: (params: OnUpdateParams) => void) => {
                updaterRegistry.add(onUpdate);

                return () => {
                  updaterRegistry.delete(onUpdate);
                };
              },
            } as ThrownObject;
          }
        },
      },
    );
  }

  return createPathProxy();
}

const filteredLogger = (instance: (...params: unknown[]) => void) => {
  return (...params: unknown[]) => {
    for (const param of params) {
      if (
        typeof param === 'object' &&
        param != null &&
        '__marker' in param &&
        param.__marker === THROW_MARKER
      ) {
        return;
      }
    }

    instance(...params);
  };
};

console.error = filteredLogger(console.error);

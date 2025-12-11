import type { PropsWithChildren, ReactNode } from 'react';

import { Spinner } from '@/shared/presentation/atoms/Spinner';

import type { Response } from '../../api-client/rules/types';

import type {
  CoupleConstraint,
  MappedDataHooks,
  UseModelSelector,
} from './types';

export { couple } from './utils';

interface GuardedSelectsParams {
  initialIsLoading?: boolean;
  fallbackInitial?: () => ReactNode;
  fallbackLoading?: () => ReactNode;
  fallbackError: (props: { error: Error }) => ReactNode;
}

export function guardedSelects(params: GuardedSelectsParams) {
  const {
    fallbackInitial,
    fallbackError: FallbackError,
    fallbackLoading,
    initialIsLoading = false,
  } = params;

  const FallbackLoading = fallbackLoading ?? (() => <Spinner />);

  const FallbackInitial =
    (initialIsLoading ? FallbackLoading : fallbackInitial) ||
    function Initial() {
      return null;
    };

  const SYM_DATA = Symbol('DATA');

  return function <
    const H extends ReadonlyArray<CoupleConstraint<UseModelSelector<any>>>,
  >(...pairs: H) {
    const mappedHooks = pairs.map((pair) => {
      const [useModel, apiSelector] = pair;

      return (): Response<unknown> => useModel(apiSelector);
    });

    function StatusGuard(props: PropsWithChildren<unknown>) {
      let countLoading = 0;
      let countInitial = 0;
      const collectedErrors: Error[] = [];

      for (const useMappedHook of mappedHooks) {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const data = useMappedHook();

        switch (data.$status) {
          case 'initial':
            countInitial += 1;
            break;

          case 'loading':
            if (data.prevData) break;
            countLoading += 1;
            break;

          case 'failed':
            collectedErrors.push(data.error);
            break;
        }
      }

      if (collectedErrors.length > 0) {
        return (
          <FallbackError
            error={Error(
              collectedErrors.map((error) => error.message).join('\n'),
            )}
          />
        );
      }

      if (countLoading > 0) {
        return <FallbackLoading />;
      }

      if (countInitial > 0) {
        return <FallbackInitial />;
      }

      return props.children;
    }

    function guarded<P extends object>(Component: (props: P) => ReactNode) {
      return function Guarded(props: P) {
        return (
          <StatusGuard>
            <Component {...props} />
          </StatusGuard>
        );
      };
    }

    guarded.Guard = StatusGuard;

    const mappedDataHooks = pairs.map((pair) => {
      const [useSelector, apiSelector] = pair;

      return (selector) => {
        const selectedData = useSelector((store) => {
          const apiSelected: Response<unknown> = apiSelector(store);

          let data: unknown | symbol = SYM_DATA;

          if (apiSelected.$status === 'success') {
            data = selector(apiSelected, false);
          } else if (
            apiSelected.$status === 'loading' &&
            'prevData' in apiSelected
          ) {
            data = selector(apiSelected.prevData!, true);
          }

          return data;
        });

        if (typeof selectedData === 'symbol') {
          throw new Error(
            `useDataSelect must be used within a Provider under its guard.`,
          );
        }

        return selectedData;
      };
    }) as MappedDataHooks<H>;

    return [guarded, ...mappedDataHooks] as const;
  };
}

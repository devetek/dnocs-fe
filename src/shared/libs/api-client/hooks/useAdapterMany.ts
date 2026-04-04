import { useMemo, useState } from 'react';

import { shallowEqual } from 'fast-equals';

import { iife } from '../../browser/fn';
import useHandler from '../../react-hooks/useHandler';
import { processErrors } from '../lib/processor';
import type { Adapter, Response, ResponseErrors } from '../rules/types';

type OfRaw<T extends Array<Response<any>>> = {
  [K in keyof T]: T[K] extends Response<infer RR> ? RR : never;
};

export default function useAdapterMany<R extends Array<Response<any>>, Data>(
  response: [...R],
  adapter: Adapter<OfRaw<R>, Data>,
): Response<Data, ResponseErrors> {
  const [cachedSuccessData, setCachedSuccessData] = useState<[...R]>();

  // const [cachedFailedResponse, setCachedFailedResponse]
  //   = useState<ResponseError>();

  const stableAdapter = useHandler(adapter);

  return useMemo((): Response<any> => {
    try {
      const isAllSuccessful =
        response.filter((it) => it.$status !== 'success').length < 1;

      if (isAllSuccessful) {
        if (!shallowEqual(cachedSuccessData, response)) {
          setCachedSuccessData(response);
        }

        const adapted = stableAdapter(response as OfRaw<R>) as Response<Data>;
        adapted.$status = 'success' as const;

        return adapted;
      }

      const failedResponses = response.filter((it) => it.$status === 'failed');
      if (failedResponses.length > 0) {
        throw failedResponses;
      }

      const loadingResponses = response.filter(
        (it) => it.$status === 'loading',
      );
      if (loadingResponses.length > 0) {
        const collectedPrevData = iife(() => {
          if (!cachedSuccessData) return undefined;

          const temp = response.map(
            (it, index) => it.prevData || cachedSuccessData[index],
          );
          return temp.length === response.length
            ? stableAdapter(temp as OfRaw<R>)
            : undefined;
        });

        return {
          $status: 'loading',
          prevData: collectedPrevData,
          prevError: undefined,
        };
      }
    } catch (error) {
      const processedError = processErrors(error);

      return {
        $status: 'failed',
        ...processedError,
      };
    }

    return response;
  }, [response, stableAdapter, cachedSuccessData]);
}

import { useCallback, useEffect, useRef, useState } from 'react';

import { AxiosError, isCancel } from 'axios';

import { iife } from '../../browser/fn';
import { isOnline } from '../../browser/is-online';
import useHandler from '../../react-hooks/useHandler';
import { axiosClient } from '../lib/client';
import { BaseResponseError } from '../lib/error';
import type {
  BaseResponse,
  GetRequestRecipe,
  Response,
  ResponseError,
  UseApiGetOptions,
} from '../rules/types';

export default function useApiGet<D>(
  config: GetRequestRecipe,
  options?: UseApiGetOptions,
) {
  const {
    autoRetryWhenFails = false,
    skip = false,
    refreshIntervalMs = 0,
  } = options ?? {};
  const { url } = config;

  const [response, setResponse] = useState<Response<D>>({
    $status: 'initial',
  });

  const refResponse = useRef<Response<D>>(null);

  const refAbortController = useRef<AbortController>(null);
  const refAutoRetryWhenFails = useRef<boolean>(null);
  const refBusy = useRef(false);

  if (refAutoRetryWhenFails.current == null) {
    refAutoRetryWhenFails.current = autoRetryWhenFails;
  }

  if (refResponse.current == null) {
    refResponse.current = response;
  }

  const abortFetch = useHandler(() => {
    refAbortController.current?.abort();
    refAbortController.current = null;
    refBusy.current = false;
  });

  const fetchData = useCallback(
    ({ abortInFlight = true } = {}) => {
      const isInFlight =
        !!refAbortController.current &&
        !refAbortController.current.signal.aborted;
      if (!abortInFlight && isInFlight) return;

      if (abortInFlight) {
        abortFetch();
      }

      const controller = new AbortController();
      refAbortController.current = controller;
      refBusy.current = true;

      setResponse((prevResponse) => {
        let prevData: D | undefined;
        let prevError: ResponseError | undefined;

        if (prevResponse.$status === 'success') {
          prevData = prevResponse;
        } else if (prevResponse.$status === 'failed') {
          prevError = prevResponse;
        }

        return {
          $status: 'loading',
          prevData,
          prevError,
        };
      });

      axiosClient<BaseResponse<D>>({
        method: 'GET',
        url,
        signal: controller.signal,
      })
        .then((axiosResponse) => {
          if (refAbortController.current !== controller) return;

          const baseData = axiosResponse.data;

          if (baseData.code !== 200) {
            throw new BaseResponseError(baseData);
          }

          if (baseData.data == null) {
            throw Error('Data is empty!');
          }

          const data = baseData.data as Response<D>;
          data.$status = 'success';

          setResponse(data);
        })
        .catch((error) => {
          if (refAbortController.current !== controller) return;

          if (isCancel(error)) {
            return;
          }

          if (refAutoRetryWhenFails.current) {
            // eslint-disable-next-line react-hooks/immutability
            fetchData({ abortInFlight });
            return;
          }

          setResponse({
            $status: 'failed',
            ...iife((): ResponseError => {
              if (
                error instanceof AxiosError ||
                error instanceof BaseResponseError
              ) {
                return {
                  kind: 'api',
                  error,
                };
              }

              return {
                kind: 'general',
                error,
              };
            }),
          });
        })
        .finally(() => {
          if (refAbortController.current !== controller) return;

          refAbortController.current = null;
          refBusy.current = false;
        });
    },
    [url, abortFetch],
  );

  useEffect(() => {
    refAutoRetryWhenFails.current = autoRetryWhenFails;
    refResponse.current = response;
  });

  useEffect(() => {
    if (skip) {
      abortFetch();
      setResponse({ $status: 'initial' });
      return;
    }

    fetchData();
    return abortFetch;
  }, [skip, url, fetchData, abortFetch]);

  useEffect(() => {
    if (skip || refreshIntervalMs <= 0) return;

    const interval = window.setInterval(() => {
      const shouldSkip =
        !isOnline() ||
        (!refAutoRetryWhenFails.current &&
          refResponse.current?.$status === 'failed');

      if (shouldSkip) return;

      fetchData({ abortInFlight: false });
    }, refreshIntervalMs);

    return () => {
      window.clearInterval(interval);
      abortFetch();
    };
  }, [abortFetch, fetchData, refreshIntervalMs, skip]);

  return [response, fetchData] as const;
}

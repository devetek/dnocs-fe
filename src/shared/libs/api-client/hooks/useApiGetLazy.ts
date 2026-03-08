import { useCallback, useState } from 'react';

import { AxiosError, isCancel } from 'axios';

import { iife } from '../../browser/fn';
import useHandler from '../../react-hooks/useHandler';
import { axiosClient } from '../lib/client';
import { BaseResponseError } from '../lib/error';
import type {
  BaseResponse,
  GetRequestRecipe,
  Response,
  ResponseError,
} from '../rules/types';

export default function useApiGetLazy<D, P>(
  recipe: (params: P) => GetRequestRecipe,
) {
  const [response, setResponse] = useState<Response<D>>({
    $status: 'initial',
  });

  const stableRecipe = useHandler(recipe);

  const fetchData = useCallback(
    (params: P) => {
      const { url } = stableRecipe(params);

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
      })
        .then((axiosResponse) => {
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
          if (isCancel(error)) {
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
        });
    },
    [stableRecipe],
  );

  return [response, fetchData] as const;
}

import { AxiosError } from 'axios';

import type {
  BaseResponse,
  DoRequestRecipe,
  PureResponse,
} from '../rules/types';

import { axiosClient } from './client';
import { BaseResponseError } from './error';

export async function apiDoPost<D>(
  config: DoRequestRecipe,
): Promise<PureResponse<D>> {
  try {
    const axiosResponse = await axiosClient<BaseResponse<D>>({
      ...config,
    });

    if (axiosResponse.data.code !== 200) {
      throw new BaseResponseError(axiosResponse.data);
    }

    const data = axiosResponse.data.data as PureResponse<D>;
    data.$status = 'success';

    return data;
  } catch (error) {
    if (error instanceof AxiosError || error instanceof BaseResponseError) {
      return {
        $status: 'failed',
        kind: 'api',
        error,
      };
    }

    return {
      $status: 'failed',
      kind: 'general',
      error: error instanceof Error ? error : Error(String(error)),
    };
  }
}

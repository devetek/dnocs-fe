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

    // TODO: Temporary monkey patching during migration
    // Please use keyword "DPANEL-MIGRATION" to find all related code and remove them after migration is done
    let data: PureResponse<D> = {} as PureResponse<D>;
    if (typeof axiosResponse.data.data === 'string') {
      data.$status = 'success';
      return data;
    }

    data = axiosResponse.data.data as PureResponse<D>;
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

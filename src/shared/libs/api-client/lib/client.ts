import type { AxiosRequestConfig } from 'axios';
import axios, { AxiosError, AxiosHeaders } from 'axios';

import { isBrowser } from '../../browser/environment';
import { iife } from '../../browser/iife';
import { LS_ORGANIZATION_ID, X_AUTH_ORGANIZATION_ID } from '../config';
import type { ApiClientResponse, BaseResponse } from '../rules/types';

import { BaseResponseError } from './error';

export const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_BACKEND,
  withCredentials: true,
});

axiosClient.interceptors.request.use((config) => {
  if (config.url?.includes('v1/')) {
    const organizationId = iife(() => {
      if (!isBrowser()) return null;

      return localStorage.getItem(LS_ORGANIZATION_ID) || null;
    });

    if (organizationId) {
      config.headers = new AxiosHeaders({
        ...config.headers,
        [X_AUTH_ORGANIZATION_ID]: organizationId,
      });
    }
  }

  return config;
});

export async function apiClient<D>(
  config: AxiosRequestConfig,
): Promise<ApiClientResponse<D>> {
  try {
    const { data: baseData } = await axiosClient<BaseResponse<D>>(config);

    if (baseData.code !== 200) {
      throw new BaseResponseError(baseData);
    }

    if (baseData.data == null) {
      throw Error('Data is empty!');
    }

    const data = baseData.data as ApiClientResponse<D>;

    data.$status = 'success' as const;
    data.$statusCode = baseData.code;

    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      return {
        $status: 'failed',
        kind: 'api',
        $statusCode: error.status,
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

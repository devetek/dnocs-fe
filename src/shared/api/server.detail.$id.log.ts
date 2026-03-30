import { createQueryParams, useApiGet } from '@/shared/libs/api-client';
import type {
  GetRequestRecipe,
  WithApiGetOptions,
} from '@/shared/libs/api-client/rules/types';

import useApiGetWhen from '../libs/api-client/hooks/useApiGetWhen';

// =============================================================================
//   Recipe
// =============================================================================

export interface RecipeParams {
  serverId?: string;
  file?: string;
  line?: number;
}

export function recipe(params: RecipeParams): GetRequestRecipe {
  const { serverId, file, line } = params;

  const queryParams = createQueryParams({
    file,
    line,
  });

  return {
    url: `/v1/folder/origin/${serverId}/watch?${queryParams.toString()}`,
  };
}

// =============================================================================
//   Method
// =============================================================================

export function useGet(params: WithApiGetOptions<RecipeParams>) {
  return useApiGet<string[]>(recipe(params), params.options);
}

export function useGetWhen(
  predicate: () => WithApiGetOptions<RecipeParams> | undefined,
) {
  const params = predicate();

  return useApiGetWhen<string[]>({
    config: params != null ? recipe(params) : undefined,
    options: params?.options,
  });
}

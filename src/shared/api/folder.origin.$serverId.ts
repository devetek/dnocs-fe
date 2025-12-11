import { createQueryParams, useApiGet } from '@/shared/libs/api-client';
import { apiClient } from '@/shared/libs/api-client/lib/client';
import type {
  GetRequestRecipe,
  WithApiGetOptions,
} from '@/shared/libs/api-client/rules/types';

import type { DTOs } from '.';

// =============================================================================
//   Recipe
// =============================================================================

export interface RecipeParams {
  serverId: string;
  basePath: string;
}

export function recipe(params: RecipeParams): GetRequestRecipe {
  const { basePath, serverId } = params;

  const queryParams = createQueryParams({
    workdir: basePath,
  });

  return {
    url: `/v1/folder/origin/${serverId}?${queryParams.toString()}`,
  };
}

// =============================================================================
//   Method
// =============================================================================

export function useGet(params: WithApiGetOptions<RecipeParams>) {
  return useApiGet<DTOs.FolderOrigin[]>(recipe(params), params.options);
}

export function fetchGet(params: RecipeParams) {
  return apiClient<DTOs.FolderOrigin[]>({
    ...recipe(params),
    method: 'GET',
  });
}

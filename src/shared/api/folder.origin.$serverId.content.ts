import { createQueryParams, useApiGet } from '@/shared/libs/api-client';
import useApiGetLazy from '@/shared/libs/api-client/hooks/useApiGetLazy';
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
  fullFolderPath?: string;
  fileFullName?: string;
}

export function recipe(params: RecipeParams): GetRequestRecipe {
  const { fullFolderPath, fileFullName, serverId } = params;

  const queryParams = createQueryParams({
    workdir: fullFolderPath,
    file: fileFullName,
  });

  return {
    url: `/v1/folder/origin/${serverId}/content?${queryParams.toString()}`,
  };
}

// =============================================================================
//   Method
// =============================================================================

export function useGet(params: WithApiGetOptions<RecipeParams>) {
  return useApiGet<DTOs.FolderOriginContent>(recipe(params), params.options);
}

export function useGetLazy() {
  return useApiGetLazy<DTOs.FolderOriginContent, RecipeParams>(recipe);
}

export function fetchGet(params: RecipeParams) {
  return apiClient<DTOs.FolderOriginContent>({
    ...recipe(params),
    method: 'GET',
  });
}

import { useApiGet } from '@/shared/libs/api-client';
import { apiClient } from '@/shared/libs/api-client/lib/client';
import type {
  GetRequestRecipe,
  WithApiGetOptions,
} from '@/shared/libs/api-client/rules/types';

// =============================================================================
//   Recipe
// =============================================================================

export interface RecipeParams {
  cloudProjectId: string;
}

export function recipe(params: RecipeParams): GetRequestRecipe {
  const { cloudProjectId } = params;

  return {
    url: `/v1/cloud/project/detail/${cloudProjectId}/regions`,
  };
}

// =============================================================================
//   Method
// =============================================================================

export interface RegionItem {
  id: string;
  name: string;
}

export interface Dto {
  items: RegionItem[];
}

export function useGet(params: WithApiGetOptions<RecipeParams>) {
  return useApiGet<Dto[]>(recipe(params), params.options);
}

export function fetchGet(params: RecipeParams) {
  return apiClient<Dto[]>({
    ...recipe(params),
    method: 'GET',
  });
}

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
  regionSlug: string;
}

export function recipe(params: RecipeParams): GetRequestRecipe {
  const { cloudProjectId, regionSlug } = params;

  return {
    url: `/v1/cloud/project/detail/${cloudProjectId}/vpcs/${regionSlug}`,
  };
}

// =============================================================================
//   Method
// =============================================================================

export interface NetworkItem {
  id: string;
  name: string;
  subnet: string;
}

export interface Dto {
  items: NetworkItem[];
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

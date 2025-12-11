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
    url: `/v1/cloud/regions/${cloudProjectId}`,
  };
}

// =============================================================================
//   Method
// =============================================================================

export interface Dto {
  display_name: string;
  is_preferred: boolean;
  is_default: boolean;
  is_published: boolean;
  description: string;
  country_code: string;
  order_nr: number;
  create_resource_disabled: boolean;
  slug: string;
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

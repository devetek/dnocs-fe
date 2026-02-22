import { useApiGet } from '@/shared/libs/api-client';
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
  routerId: string;
}

export function recipe(params: RecipeParams): GetRequestRecipe {
  const { routerId } = params;

  return {
    url: `/v1/router/detail/${routerId}`,
  };
}

// =============================================================================
//   Method
// =============================================================================

export function useGet(params: WithApiGetOptions<RecipeParams>) {
  return useApiGet<DTOs.RouterV1>(recipe(params), params.options);
}

export function fetchGet(params: RecipeParams) {
  return apiClient<DTOs.RouterV1>({
    ...recipe(params),
    method: 'GET',
  });
}

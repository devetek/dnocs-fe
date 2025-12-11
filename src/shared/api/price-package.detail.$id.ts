import { useApiGet } from '@/shared/libs/api-client';
import type {
  GetRequestRecipe,
  WithApiGetOptions,
} from '@/shared/libs/api-client/rules/types';

import type { DTOs } from '.';

// =============================================================================
//   Recipe
// =============================================================================

export interface RecipeParams {
  id?: string;
}

export function recipe(params: RecipeParams): GetRequestRecipe {
  const { id } = params;

  return {
    url: `v1/price-package/detail/${id}`,
  };
}

// =============================================================================
//   Method
// =============================================================================

export function useGet(params: WithApiGetOptions<RecipeParams>) {
  return useApiGet<DTOs.PricePackageV1>(recipe(params), params.options);
}

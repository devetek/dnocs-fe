import { useApiGet } from '@/shared/libs/api-client';
import type {
  GetRequestRecipe,
  WithApiGetOptions,
} from '@/shared/libs/api-client/rules/types';

import type { PortInUsed } from './-dtos';

// =============================================================================
//   Recipe
// =============================================================================

export interface RecipeParams {
  serverId: string;
}

export function recipe(params: RecipeParams): GetRequestRecipe {
  const { serverId } = params;
  return {
    url: `v1/server/origin/${serverId}/port-in-used`,
  };
}

// =============================================================================
//   Method
// =============================================================================

export function useGet(params: WithApiGetOptions<RecipeParams>) {
  return useApiGet<PortInUsed[]>(recipe(params), params.options);
}

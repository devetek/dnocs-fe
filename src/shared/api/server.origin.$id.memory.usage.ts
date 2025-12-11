import { useApiGet } from '@/shared/libs/api-client';
import type {
  GetRequestRecipe,
  WithApiGetOptions,
} from '@/shared/libs/api-client/rules/types';

// =============================================================================
//   Recipe
// =============================================================================

export interface RecipeParams {
  serverId?: string;
}

export function recipe(params: RecipeParams): GetRequestRecipe {
  const { serverId } = params;

  return {
    url: `v1/server/origin/${serverId}/memory/usage`,
  };
}

// =============================================================================
//   Method
// =============================================================================

export interface Dto {
  active: number;
  available: number;
  free: number;
  inactive: number;
  total: number;
  used: number;
  used_percent: number;
}

export function useGet(params: WithApiGetOptions<RecipeParams>) {
  return useApiGet<Dto>(recipe(params), params.options);
}

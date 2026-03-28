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
  serverId?: string;
  username?: string;
}

export function recipe(params: RecipeParams): GetRequestRecipe {
  const { serverId, username = "" } = params;

  return {
    url: `v1/server/origin/${serverId}/user?username=${username}`,
  };
}

// =============================================================================
//   Method
// =============================================================================

export function useGet(params: WithApiGetOptions<RecipeParams>) {
  return useApiGet<DTOs.MachineUser>(recipe(params), params.options);
}

import type { DoRequestRecipe } from '@/shared/libs/api-client/rules/types';

import { apiDoPost } from '../libs/api-client';

import type { DTOs } from '.';

// =============================================================================
//   Recipe
// =============================================================================

export interface RecipeParams {
  serverId: string;
  payload: DTOs.MachineV1;
}

export function recipe(params: RecipeParams): DoRequestRecipe {
  const { serverId, payload } = params;

  return {
    method: 'POST',
    url: `/v1/server/update/${serverId}`,
    data: payload,
  };
}

// =============================================================================
//   Method
// =============================================================================

export function doPost(params: RecipeParams) {
  return apiDoPost({
    ...recipe(params),
  });
}

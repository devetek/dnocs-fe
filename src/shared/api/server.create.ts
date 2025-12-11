import type { DoRequestRecipe } from '@/shared/libs/api-client/rules/types';

import { apiDoPost } from '../libs/api-client';

import type { DTOs } from '.';

// =============================================================================
//   Recipe
// =============================================================================

export interface RecipeParams {
  payload: DTOs.MachineV1;
}

export function recipe(params: RecipeParams): DoRequestRecipe {
  const { payload } = params;

  return {
    method: 'POST',
    url: `/v1/server/create`,
    data: payload,
  };
}

// =============================================================================
//   Method
// =============================================================================

export interface Response {
  id: string;
}

export function doPost(params: RecipeParams) {
  return apiDoPost<Response>({
    ...recipe(params),
  });
}

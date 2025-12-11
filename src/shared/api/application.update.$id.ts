import type { DoRequestRecipe } from '@/shared/libs/api-client/rules/types';

import { apiDoPost } from '../libs/api-client';

import type { DTOs } from '.';

// =============================================================================
//   Recipe
// =============================================================================

export interface RecipeParams {
  applicationId: string;
  payload: DTOs.ApplicationV1;
}

export function recipe(params: RecipeParams): DoRequestRecipe {
  const { payload, applicationId } = params;

  return {
    method: 'POST',
    url: `/v1/application/update/${applicationId}`,
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

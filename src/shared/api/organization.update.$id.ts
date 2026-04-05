import type { DoRequestRecipe } from '@/shared/libs/api-client/rules/types';

import { apiDoPost } from '../libs/api-client';

// =============================================================================
//   Recipe
// =============================================================================

export interface RecipeParams {
  orgId: string;
  payload: {
    name: string;
    description?: string;
  };
}

export function recipe(params: RecipeParams): DoRequestRecipe {
  const { orgId, payload } = params;

  return {
    method: 'POST',
    url: `/v1/organization/update/${orgId}`,
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

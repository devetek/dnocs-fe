import type { DoRequestRecipe } from '@/shared/libs/api-client/rules/types';

import { apiDoPost } from '../libs/api-client';

// =============================================================================
//   Recipe
// =============================================================================

export interface RecipeParams {
  payload: {
    username: string;
    email: string;
    password: string;
    confirm: string;
  };
}

export function recipe(params: RecipeParams): DoRequestRecipe {
  const { payload } = params;

  return {
    method: 'POST',
    url: `/v1/auth/register`,
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

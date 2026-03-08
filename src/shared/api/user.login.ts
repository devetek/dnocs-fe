import type { DoRequestRecipe } from '@/shared/libs/api-client/rules/types';

import { apiDoPost } from '../libs/api-client';

// =============================================================================
//   Recipe
// =============================================================================

export interface RecipeParams {
  email: string;
  password: string;
}

export function recipe(params: RecipeParams): DoRequestRecipe {
  const { email, password } = params;

  return {
    method: 'POST',
    url: `/v0/user/login`,
    data: {
      email,
      password,
    },
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

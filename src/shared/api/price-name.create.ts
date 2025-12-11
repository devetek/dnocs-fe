import type { DoRequestRecipe } from '@/shared/libs/api-client/rules/types';

import { apiDoPost } from '../libs/api-client';

// =============================================================================
//   Recipe
// =============================================================================

export interface RecipeParams {
  name: string;
}

export function recipe(params: RecipeParams): DoRequestRecipe {
  const { name } = params;

  return {
    method: 'POST',
    url: `/v1/price-name/create`,
    data: {
      name,
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

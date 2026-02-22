import type { DoRequestRecipe } from '@/shared/libs/api-client/rules/types';

import { apiDoPost } from '../libs/api-client';

// =============================================================================
//   Recipe
// =============================================================================

export interface RecipeParams {
  routerId: string;
}

export function recipe(params: RecipeParams): DoRequestRecipe {
  const { routerId } = params;

  return {
    method: 'DELETE',
    url: `/v1/router/delete/${routerId}`,
  };
}

// =============================================================================
//   Method
// =============================================================================

export function doDelete(params: RecipeParams) {
  return apiDoPost({
    ...recipe(params),
  });
}

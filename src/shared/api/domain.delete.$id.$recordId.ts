import type { DoRequestRecipe } from '@/shared/libs/api-client/rules/types';

import { apiDoPost } from '../libs/api-client';

// =============================================================================
//   Recipe
// =============================================================================

export interface RecipeParams {
  id: string;
  recordId: string;
}

export function recipeDelete(params: RecipeParams): DoRequestRecipe {
  const { id, recordId } = params;

  return {
    method: 'DELETE',
    url: `/v1/domain/delete/${id}/${recordId}`,
  };
}

// =============================================================================
//   Method
// =============================================================================

export function doDelete(params: RecipeParams) {
  return apiDoPost({
    ...recipeDelete(params),
  });
}

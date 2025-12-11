import type { DoRequestRecipe } from '@/shared/libs/api-client/rules/types';

import { apiDoPost } from '../libs/api-client';

// =============================================================================
//   Recipe
// =============================================================================

export interface RecipeParams {
  dbUserId: string;
}

export function recipe(params: RecipeParams): DoRequestRecipe {
  const { dbUserId } = params;

  return {
    method: 'DELETE',
    url: `/v1/database-user/delete/${dbUserId}`,
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

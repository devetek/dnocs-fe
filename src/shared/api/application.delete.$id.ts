import type { DoRequestRecipe } from '@/shared/libs/api-client/rules/types';

import { apiDoPost } from '../libs/api-client';

// =============================================================================
//   Recipe
// =============================================================================

export interface RecipeParams {
  applicationId: string;
}

export function recipe(params: RecipeParams): DoRequestRecipe {
  const { applicationId } = params;

  return {
    method: 'DELETE',
    url: `/v1/application/delete/${applicationId}`,
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

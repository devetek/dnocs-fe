import type { DoRequestRecipe } from '@/shared/libs/api-client/rules/types';

import { apiDoPost } from '../libs/api-client';

// =============================================================================
//   Recipe
// =============================================================================

export interface RecipeParams {
  serviceId: string;
}

export function recipe(params: RecipeParams): DoRequestRecipe {
  const { serviceId } = params;

  return {
    method: 'DELETE',
    url: `/v1/service/delete/${serviceId}`,
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

import type { DoRequestRecipe } from '@/shared/libs/api-client/rules/types';

import { apiDoPost } from '../libs/api-client';

// =============================================================================
//   Recipe
// =============================================================================

export interface RecipeParams {
  userId: string;
  organizationName: string;
  description?: string;
}

export function recipe(params: RecipeParams): DoRequestRecipe {
  const { organizationName, userId, description } = params;

  return {
    method: 'POST',
    url: `/v1/organization/create`,
    data: {
      name: organizationName,
      user_id: userId,
      description,
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

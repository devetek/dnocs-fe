import type { DoRequestRecipe } from '@/shared/libs/api-client/rules/types';

import { apiDoPost } from '../libs/api-client';

// =============================================================================
//   Recipe
// =============================================================================

export interface RecipeParams {
  userId: string;
  organizationId: string;
}

export function recipe(params: RecipeParams): DoRequestRecipe {
  const { organizationId, userId } = params;

  return {
    method: 'POST',
    url: `/v1/organization-people/create`,
    data: {
      organization_id: organizationId,
      user_id: userId,
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

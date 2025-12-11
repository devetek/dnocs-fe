import type { DoRequestRecipe } from '@/shared/libs/api-client/rules/types';

import { apiDoPost } from '../libs/api-client';

// =============================================================================
//   Recipe
// =============================================================================

export interface RecipeParams {
  credential: Record<string, unknown>;
  name: string;
  cloudProvider: string;
}

export function recipe(params: RecipeParams): DoRequestRecipe {
  const { cloudProvider, credential, name } = params;

  return {
    method: 'POST',
    url: `/v1/cloud/project/create`,
    data: {
      credential,
      name,
      provider: cloudProvider,
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

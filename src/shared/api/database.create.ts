import type { DoRequestRecipe } from '@/shared/libs/api-client/rules/types';

import { apiDoPost } from '../libs/api-client';

// =============================================================================
//   Recipe
// =============================================================================

export interface RecipeParams {
  resourceId: string;
  ownerId: string;
  dbEngine: string;
  dbName: string;
}

export function recipe(params: RecipeParams): DoRequestRecipe {
  const { dbName, dbEngine, ownerId, resourceId } = params;

  return {
    method: 'POST',
    url: `/v1/database/create`,
    data: {
      machine_id: resourceId,
      owner: ownerId,
      engine: dbEngine,
      name: dbName,
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

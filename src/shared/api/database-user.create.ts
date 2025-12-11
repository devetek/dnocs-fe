import type { DoRequestRecipe } from '@/shared/libs/api-client/rules/types';

import { apiDoPost } from '../libs/api-client';

// =============================================================================
//   Recipe
// =============================================================================

export interface RecipeParams {
  dbEngine: string;
  dbHost: string;
  dbUserName: string;
  dbUserPassword: string;
  resourceId: string;
  ownerId: string;
}

export function recipe(params: RecipeParams): DoRequestRecipe {
  const { dbEngine, dbHost, dbUserName, dbUserPassword, ownerId, resourceId } =
    params;

  return {
    method: 'POST',
    url: `/v1/database-user/create`,
    data: {
      engine: dbEngine,
      machine_id: resourceId,
      name: dbUserName,
      password: dbUserPassword,
      owner: ownerId,
      host: dbHost,
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

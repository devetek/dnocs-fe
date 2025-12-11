import type { DoRequestRecipe } from '@/shared/libs/api-client/rules/types';

import { apiDoPost } from '../libs/api-client';

// =============================================================================
//   Recipe
// =============================================================================

export interface RecipeParams {
  userId: string;
  payload: {
    userName: string;
    userHost: string;
    dbName: string;
    privilige: string[];
    withGrantOption: boolean;
  };
}

export function recipe(params: RecipeParams): DoRequestRecipe {
  const { userId, payload } = params;

  return {
    method: 'POST',
    url: `/v1/database-user/grant/${userId}`,
    data: {
      user: {
        username: payload.userName,
        host: payload.userHost,
      },
      database: payload.dbName,
      privilege: payload.privilige,
      with_grant_opt: payload.withGrantOption,
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

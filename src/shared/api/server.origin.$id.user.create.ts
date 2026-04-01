import type { DoRequestRecipe } from '@/shared/libs/api-client/rules/types';

import { apiDoPost } from '../libs/api-client';

export interface RecipeParams {
  serverId: string;
  payload: {
    id: number;
    username: string;
    password: string;
    group: string;
    home_dir: string;
  };
}

export function recipe(params: RecipeParams): DoRequestRecipe {
  const { serverId, payload } = params;

  return {
    method: 'POST',
    url: `/v1/server/origin/${serverId}/user/create`,
    data: payload,
  };
}

export function doPost(params: RecipeParams) {
  return apiDoPost({
    ...recipe(params),
  });
}

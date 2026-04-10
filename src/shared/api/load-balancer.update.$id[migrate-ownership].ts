import type { DoRequestRecipe } from '@/shared/libs/api-client/rules/types';

import { apiDoPost } from '../libs/api-client';

import type { PayloadUpdateOwnership } from './-dtos';

// =============================================================================
//   Recipe
// =============================================================================

export interface RecipeParams {
  loadBalancerId: string;
  payload: PayloadUpdateOwnership;
}

export function recipe(params: RecipeParams): DoRequestRecipe {
  const { loadBalancerId, payload } = params;

  return {
    method: 'POST',
    url: `/v2/load-balancer/update/${loadBalancerId}`,
    data: {
      organization_id: payload.into === 'team' ? payload.teamId : '0',
    },
  };
}

// =============================================================================
//   Method
// =============================================================================

export interface Dto {
  id: string;
}

export function doPost(params: RecipeParams) {
  return apiDoPost<Dto>({
    ...recipe(params),
  });
}

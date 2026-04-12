import type { DoRequestRecipe } from '@/shared/libs/api-client/rules/types';

import { apiDoPost } from '../libs/api-client';

// =============================================================================
//   Recipe
// =============================================================================

export interface RecipeParams {
  loadBalancerId: string;
}

export function recipe(params: RecipeParams): DoRequestRecipe {
  const { loadBalancerId } = params;

  return {
    method: 'POST',
    url: `/v2/load-balancer/update/${loadBalancerId}`,
    data: {
      installer_status: 'progress',
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

import type { DoRequestRecipe } from '@/shared/libs/api-client/rules/types';

import { apiDoPost } from '../libs/api-client';

import type { PayloadUpdateOwnership } from './-dtos';

// =============================================================================
//   Recipe
// =============================================================================

export interface RecipeParams {
  applicationId: string;
  payload: PayloadUpdateOwnership;
}

export function recipe(params: RecipeParams): DoRequestRecipe {
  const { applicationId, payload } = params;

  return {
    method: 'POST',
    url: `/v1/application/update/${applicationId}`,
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

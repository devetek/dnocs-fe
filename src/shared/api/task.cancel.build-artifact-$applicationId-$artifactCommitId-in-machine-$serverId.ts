import type { DoRequestRecipe } from '@/shared/libs/api-client/rules/types';

import { apiDoPost } from '../libs/api-client';

// =============================================================================
//   Recipe
// =============================================================================

export interface RecipeParams {
  applicationId: string;
  artifactCommitId: string;
  serverId: string;
}

export function recipe(params: RecipeParams): DoRequestRecipe {
  const { applicationId, artifactCommitId, serverId } = params;

  return {
    method: 'POST',
    url: `/v1/task/cancel/build-artifact-${applicationId}-${artifactCommitId}-in-machine-${serverId}`,
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

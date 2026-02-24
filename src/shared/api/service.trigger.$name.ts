import type { DoRequestRecipe } from '@/shared/libs/api-client/rules/types';

import { apiDoPost } from '../libs/api-client';

// =============================================================================
//   Recipe
// =============================================================================

export interface RecipeParams {
  serviceName: string;
  eventName: string;
  serverId: string;
}

export function recipe(params: RecipeParams): DoRequestRecipe {
  const { serviceName, eventName, serverId } = params;

  // TODO: Remove data casting after backend migrate all modules to use string in ID fields.
  // temporary cast string to number, since some of modules is not migrated to use string type for unitIds yet. this should be removed after all modules are migrated.
  const intServerId = Number(serverId);

  return {
    method: 'POST',
    url: `/v1/service/trigger/${serviceName}`,
    data: {
      event: eventName,
      machine_id: intServerId,
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

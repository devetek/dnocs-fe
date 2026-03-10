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

  return {
    method: 'POST',
    url: `/v1/service/trigger/${serviceName}`,
    data: {
      event: eventName,
      // TODO: Temporary monkey patching during migration
      // Please use keyword "DPANEL-MIGRATION" to find all related code and remove them after migration is done
      // ORIGIN CODE: machine_id: Number(serverId),
      // This will update after all ID from backend migrated to string, since javascript has limited to process int64, we need to convert it to string to avoid precision loss 
      machine_id: Number(serverId),
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

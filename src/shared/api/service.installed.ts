import { createQueryParams, useApiGet } from '@/shared/libs/api-client';
import type {
  GetRequestRecipe,
  WithApiGetOptions,
} from '@/shared/libs/api-client/rules/types';

import type { DTOs } from '.';

// =============================================================================
//   Recipe
// =============================================================================

export interface RecipeParams {
  page?: number;
  pageSize?: number;
  machineID?: number;
}

export function recipe(params: RecipeParams): GetRequestRecipe {
  const { machineID, page = 1, pageSize = 999 } = params;

  const queryParams = createQueryParams({
    machine_id: machineID,
    page,
    limit: pageSize,
  });

  return {
    url: `/v1/service/installed?${queryParams.toString()}`,
  };
}

// =============================================================================
//   Method
// =============================================================================

export interface Dto {
  services?: DTOs.ServiceV1[];
  pagination: DTOs.Pagination;
}

export function useGet(params: WithApiGetOptions<RecipeParams>) {
  return useApiGet<Dto>(recipe(params), params.options);
}

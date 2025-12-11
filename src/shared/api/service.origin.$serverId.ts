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
  serverId?: string;
  page?: number;
  pageSize?: number;
  searchByName?: string;
}

export function recipe(params: RecipeParams): GetRequestRecipe {
  const { serverId, page, pageSize, searchByName } = params;

  const queryString = createQueryParams({
    page,
    limit: pageSize,
    name: searchByName,
  });

  return {
    url: `/v1/service/origin/${serverId}?${queryString.toString()}`,
  };
}

// =============================================================================
//   Method
// =============================================================================

export interface Dto {
  services: DTOs.ServiceOriginV1[];
  pagination: DTOs.Pagination;
}

export function useGet(params: WithApiGetOptions<RecipeParams>) {
  return useApiGet<Dto>(recipe(params), params.options);
}

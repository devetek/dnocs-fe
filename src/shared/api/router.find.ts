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
  searchQuery?: string | null;
  page?: number;
  pageSize?: number;
  forceMine?: boolean;
  refreshIntervalMs?: number;
}

export function recipe(params: RecipeParams): GetRequestRecipe {
  const { page, pageSize, searchQuery, forceMine } = params;

  const queryParams = createQueryParams({
    name: searchQuery,
    page,
    limit: pageSize,
    force_mine: forceMine,
  });

  return {
    url: `/v1/router/find?${queryParams.toString()}`,
  };
}

// =============================================================================
//   Method
// =============================================================================

export interface Dto {
  routers?: DTOs.RouterV1[];
  pagination: DTOs.Pagination;
}

export function useGet(params: WithApiGetOptions<RecipeParams>) {
  return useApiGet<Dto>(recipe(params), params.options);
}

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
  provider?: string;
  searchQuery?: string;
  page?: number;
  pageSize?: number;
}

export function recipe(params: RecipeParams): GetRequestRecipe {
  const { provider, page, pageSize, searchQuery } = params;

  const queryParams = createQueryParams({
    name: searchQuery,
    page,
    limit: pageSize,
    provider,
  });

  return {
    url: `/v1/cloud/project/find?${queryParams.toString()}`,
  };
}

// =============================================================================
//   Method
// =============================================================================

export interface Dto {
  clouds: DTOs.CloudProjectV1[];
  pagination: DTOs.Pagination;
}

export function useGet(params: WithApiGetOptions<RecipeParams>) {
  return useApiGet<Dto>(recipe(params), params.options);
}

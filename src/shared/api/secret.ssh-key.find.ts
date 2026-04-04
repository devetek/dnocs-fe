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
}

export function recipe(params: RecipeParams): GetRequestRecipe {
  const { page, pageSize, searchQuery } = params;

  const queryParams = createQueryParams({
    name: searchQuery,
    page,
    limit: pageSize,
  });

  return {
    url: `/v1/secret/ssh-key/find?${queryParams.toString()}`,
  };
}

// =============================================================================
//   Method
// =============================================================================

export interface Dto {
  secrets?: DTOs.SshKeyV1[];
  pagination: DTOs.Pagination;
}

export function useGet(params: WithApiGetOptions<RecipeParams>) {
  return useApiGet<Dto>(recipe(params), params.options);
}

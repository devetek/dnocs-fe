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
  query?: string;
  pageSize?: number;
  gitOrganization?: string;
}

export function recipe(params: RecipeParams): GetRequestRecipe {
  const { gitOrganization, page, pageSize, query } = params;

  const queryParams = createQueryParams({
    page,
    query,
    per_page: pageSize,
    username: gitOrganization,
  });

  return {
    url: `/v1/git-repository/find?${queryParams.toString()}`,
  };
}

// =============================================================================
//   Method
// =============================================================================

export interface Dto {
  repos?: DTOs.GitRepositoryV1[];
  next_page?: number;
}

export function useGet(params: WithApiGetOptions<RecipeParams>) {
  return useApiGet<Dto>(recipe(params), params.options);
}

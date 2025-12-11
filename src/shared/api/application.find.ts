import { createQueryParams, useApiGet } from '@/shared/libs/api-client';
import useApiGetLazy from '@/shared/libs/api-client/hooks/useApiGetLazy';
import type {
  GetRequestRecipe,
  WithApiGetOptions,
} from '@/shared/libs/api-client/rules/types';

import type { DTOs } from '.';

// =============================================================================
//   Recipe
// =============================================================================

export interface RecipeParams {
  page: number;
  limit?: number;
  forceMine?: string;
  userId?: string;
  source?: string;
  name?: string;
  repoOrg?: string;
  repoName?: string;
}

export function recipe(params: RecipeParams): GetRequestRecipe {
  const {
    page = 1,
    limit = 11,
    userId,
    forceMine = '',
    source,
    name,
    repoName,
    repoOrg,
  } = params;

  const queryParams = createQueryParams({
    force_mine: forceMine,
    user_id: userId,
    source,
    page,
    limit,
    name,
    repo_name: repoName,
    repo_org: repoOrg,
  });

  return {
    url: `/v1/application/find?${queryParams.toString()}`,
  };
}

// =============================================================================
//   Method
// =============================================================================

export interface Dto {
  applications?: DTOs.ApplicationV1[];
  pagination: DTOs.Pagination;
}

export function useGet(params: WithApiGetOptions<RecipeParams>) {
  return useApiGet<Dto>(recipe(params), params.options);
}

export function useGetLazy() {
  return useApiGetLazy<Dto, RecipeParams>(recipe);
}

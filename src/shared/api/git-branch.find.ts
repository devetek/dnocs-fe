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
  repoOrganization?: string;
  repoName?: string;
}

export function recipe(params: RecipeParams): GetRequestRecipe {
  const { repoName, repoOrganization } = params;

  const queryParams = createQueryParams({
    owner: repoOrganization,
    repo: repoName,
  });

  return {
    url: `/v1/git-branch/find?${queryParams.toString()}`,
  };
}

// =============================================================================
//   Method
// =============================================================================

export function useGet(params: WithApiGetOptions<RecipeParams>) {
  return useApiGet<DTOs.GitBranchV1[]>(recipe(params), params.options);
}

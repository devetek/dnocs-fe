import { createQueryParams, useApiGet } from '@/shared/libs/api-client';
import { apiClient } from '@/shared/libs/api-client/lib/client';
import type {
  GetRequestRecipe,
  WithApiGetOptions,
} from '@/shared/libs/api-client/rules/types';

import type { DTOs } from '.';

// =============================================================================
//   Recipe
// =============================================================================

export interface RecipeParams {
  repoOrganization: string;
  repoName: string;
  branch: string;
}

export function recipe(params: RecipeParams): GetRequestRecipe {
  const { repoOrganization, repoName, branch } = params;

  const queryParams = createQueryParams({
    branch,
  });

  return {
    url: `/v1/git-branch/detail/${repoOrganization}/${repoName}?${queryParams.toString()}`,
  };
}

// =============================================================================
//   Method
// =============================================================================

export function useGet(params: WithApiGetOptions<RecipeParams>) {
  return useApiGet<DTOs.GitBranchV1>(recipe(params), params.options);
}

export function fetchGet(params: RecipeParams) {
  return apiClient<DTOs.GitBranchV1>({
    ...recipe(params),
    method: 'GET',
  });
}

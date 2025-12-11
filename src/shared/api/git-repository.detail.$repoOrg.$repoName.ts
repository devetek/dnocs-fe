import { useApiGet } from '@/shared/libs/api-client';
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
}

export function recipe(params: RecipeParams): GetRequestRecipe {
  const { repoOrganization, repoName } = params;

  return {
    url: `/v1/git-repository/detail/${repoOrganization}/${repoName}`,
  };
}

// =============================================================================
//   Method
// =============================================================================

export function useGet(params: WithApiGetOptions<RecipeParams>) {
  return useApiGet<DTOs.GitRepositoryV1>(recipe(params), params.options);
}

export function fetchGet(params: RecipeParams) {
  return apiClient<DTOs.GitRepositoryV1>({
    ...recipe(params),
    method: 'GET',
  });
}

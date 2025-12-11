import { createQueryParams, useApiGet } from '@/shared/libs/api-client';
import { apiClient } from '@/shared/libs/api-client/lib/client';
import type {
  GetRequestRecipe,
  WithApiGetOptions,
} from '@/shared/libs/api-client/rules/types';

// =============================================================================
//   Recipe
// =============================================================================

export interface RecipeParams {
  repoOrganization: string;
  repoName: string;
  branch: string;
  filePath: string;
}

export function recipe(params: RecipeParams): GetRequestRecipe {
  const { repoOrganization, repoName, branch, filePath } = params;

  const queryParams = createQueryParams({
    branch,
    file: filePath,
  });

  return {
    url: `/v1/git-file/detail/${repoOrganization}/${repoName}?${queryParams.toString()}`,
  };
}

// =============================================================================
//   Method
// =============================================================================

export interface Dto {
  file: Record<string, string>;
  definition?: Record<string, unknown>;
}

export function useGet(params: WithApiGetOptions<RecipeParams>) {
  return useApiGet<Dto>(recipe(params), params.options);
}

export function fetchGet(params: RecipeParams) {
  return apiClient<Dto>({
    ...recipe(params),
    method: 'GET',
  });
}

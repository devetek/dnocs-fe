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
  repoOrganization: string;
  repoName: string;
  branch: string;
  folder: string;
}

export function recipe(params: RecipeParams): GetRequestRecipe {
  const { repoName, repoOrganization, branch, folder } = params;

  const queryParams = createQueryParams({
    owner: repoOrganization,
    repo: repoName,
    branch,
    folder,
  });

  return {
    url: `/v1/git-file/find?${queryParams.toString()}`,
  };
}

// =============================================================================
//   Method
// =============================================================================

export function useGet(params: WithApiGetOptions<RecipeParams>) {
  return useApiGet<DTOs.GitFileV1[]>(recipe(params), params.options);
}

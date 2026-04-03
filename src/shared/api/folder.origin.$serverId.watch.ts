import { createQueryParams } from '@/shared/libs/api-client';
import useApiGetLazy from '@/shared/libs/api-client/hooks/useApiGetLazy';
import type { GetRequestRecipe } from '@/shared/libs/api-client/rules/types';

// =============================================================================
//   Recipe
// =============================================================================

export interface RecipeParams {
  serverId: string;
  filePath: string;
  line?: number;
}

export function recipe(params: RecipeParams): GetRequestRecipe {
  const { serverId, filePath, line = 20 } = params;

  const queryParams = createQueryParams({
    file: filePath,
    line: String(line),
  });

  return {
    url: `/v1/folder/origin/${serverId}/watch?${queryParams.toString()}`,
  };
}

// =============================================================================
//   Method
// =============================================================================

export type WatchResult = string[];

export function useGetLazy() {
  return useApiGetLazy<WatchResult, RecipeParams>(recipe);
}

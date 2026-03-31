import { createQueryParams, useApiGet } from '@/shared/libs/api-client';
import type {
  GetRequestRecipe,
  WithApiGetOptions,
} from '@/shared/libs/api-client/rules/types';

// =============================================================================
//   Recipe
// =============================================================================

export interface RecipeParams {
  serverId: string;
  file?: string;
  line?: number;
}

export function recipe(params: RecipeParams): GetRequestRecipe {
  const { serverId, file, line } = params;

  const queryParams = createQueryParams({
    file,
    line,
  });

  return {
    url: `/v1/folder/origin/${serverId}/watch?${queryParams.toString()}`,
  };
}

// =============================================================================
//   Method
// =============================================================================

export function useGet(params: WithApiGetOptions<RecipeParams>) {
  return useApiGet<string[]>(recipe(params), params.options);
}

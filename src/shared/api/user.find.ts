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
  username?: string;
  page?: number;
  pageSize?: number;
}

export function recipe(params?: RecipeParams): GetRequestRecipe {
  const { page, pageSize, username } = params ?? {};

  const queryParams = createQueryParams({
    username,
    page,
    limit: pageSize,
  });

  return {
    url: `/v1/user/find?${queryParams.toString()}`,
  };
}

// =============================================================================
//   Method
// =============================================================================

export interface Dto {
  users?: DTOs.User[];
  pagination: DTOs.Pagination;
}

export function useGet(params?: WithApiGetOptions<RecipeParams>) {
  return useApiGet<Dto>(recipe(params), params?.options);
}

export function useGetLazy() {
  return useApiGetLazy<Dto, RecipeParams>(recipe);
}

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
  userId: string;
  searchQuery?: string | null;
  engine?: 'postgresql' | 'mariadb';
  page?: number;
  pageSize?: number;
}

export function recipe(params: RecipeParams): GetRequestRecipe {
  const { userId, engine, page, pageSize, searchQuery } = params;

  const queryParams = createQueryParams({
    name: searchQuery,
    owner: userId,
    page,
    limit: pageSize,
  });

  switch (engine) {
    case 'postgresql':
      queryParams.set('engine', 'postgresql');
      break;

    case 'mariadb':
      queryParams.set('engine', 'mysql');
      break;
  }

  return {
    url: `/v1/database/find?${queryParams.toString()}`,
  };
}

// =============================================================================
//   Method
// =============================================================================

export interface Dto {
  databases?: DTOs.DatabaseV1[];
  pagination: DTOs.Pagination;
}

export function useGet(params: WithApiGetOptions<RecipeParams>) {
  return useApiGet<Dto>(recipe(params), params.options);
}

import { useApiGet } from '@/shared/libs/api-client';
import type {
  GetRequestRecipe,
  WithApiGetOptions,
} from '@/shared/libs/api-client/rules/types';

import type { DTOs } from '.';

// =============================================================================
//   Recipe
// =============================================================================

export interface RecipeParams {
  userId?: string;
  filter?: 'mine' | 'shared-with-me' | 'public-resource' | 'team' | null;
  hasModules?: 'db' | 'memstore' | null;
  searchQuery?: string;
  page?: number;
  pageSize?: number;
}

export function recipe(params: RecipeParams): GetRequestRecipe {
  const {
    userId,
    filter,
    searchQuery,
    hasModules,
    page = 1,
    pageSize = 12,
  } = params;

  const queryParams = new URLSearchParams('');

  switch (filter) {
    case 'mine':
      queryParams.set('force_mine', 'true');
      queryParams.set('owner', String(userId));
      break;

    case 'shared-with-me':
      queryParams.set('user_id', String(userId));
      break;

    case 'team':
      // queryParams.set("user_id", String(userID));
      break;

    case 'public-resource':
      queryParams.set('access', 'public');
      break;
  }

  switch (hasModules) {
    case 'db':
      queryParams.set('service.installer_type', 'database');
      break;

    case 'memstore':
      queryParams.set('service.installer_type', 'memstore');
      break;
  }

  queryParams.set('page', String(page));
  queryParams.set('limit', String(pageSize));

  if (searchQuery) {
    queryParams.set('hostname', searchQuery);
  }

  return {
    url: `v1/server/find?${queryParams.toString()}`,
  };
}

// =============================================================================
//   Method
// =============================================================================

export interface Dto {
  machines?: DTOs.MachineV1[];
  pagination: DTOs.Pagination;
}

export function useGet(params: WithApiGetOptions<RecipeParams>) {
  return useApiGet<Dto>(recipe(params), params.options);
}

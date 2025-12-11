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
  page?: number;
  pageSize?: number;
  moduleName?: string;
  moduleType?: string;
  serverId?: string;
}

export function recipe(params?: RecipeParams): GetRequestRecipe {
  const { page, pageSize, moduleName, moduleType, serverId } = params ?? {};

  const queryParams = createQueryParams({
    name: moduleName,
    installer_type: moduleType,
    machine_id: serverId,
    page,
    limit: pageSize,
  });

  return {
    url: `/v1/service/find?${queryParams.toString()}`,
  };
}

// =============================================================================
//   Method
// =============================================================================

export interface Dto {
  services?: DTOs.ServiceV1[];
  pagination: DTOs.Pagination;
}

export function useGet(params?: WithApiGetOptions<RecipeParams>) {
  return useApiGet<Dto>(recipe(params), params?.options);
}

export function useGetLazy() {
  return useApiGetLazy<Dto, RecipeParams>(recipe);
}

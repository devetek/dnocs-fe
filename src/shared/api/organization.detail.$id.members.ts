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
  id: string;
  page?: number;
  pageSize?: number;
}

export function recipe(params: RecipeParams): GetRequestRecipe {
  const { id, page, pageSize } = params;

  const queryParams = createQueryParams({
    page,
    limit: pageSize,
  });

  return {
    url: `/v1/organization/detail/${id}/members?${queryParams.toString()}`,
  };
}

// =============================================================================
//   Method
// =============================================================================

export interface Dto {
  org_peoples?: DTOs.OrganizationPeopleV1[];
  pagination: DTOs.Pagination;
}

export function useGet(params: WithApiGetOptions<RecipeParams>) {
  return useApiGet<Dto>(recipe(params), params.options);
}

export function useGetLazy() {
  return useApiGetLazy<Dto, RecipeParams>(recipe);
}

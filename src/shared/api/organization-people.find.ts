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
  userId?: string;
  organizationId?: string;
  page?: number;
  pageSize?: number;
}

export function recipe(params: RecipeParams): GetRequestRecipe {
  const { userId, organizationId, page, pageSize } = params;

  const queryParams = createQueryParams({
    user_id: userId,
    organization_id: organizationId,
    page,
    limit: pageSize,
  });

  return {
    url: `/v1/organization-people/find?${queryParams.toString()}`,
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

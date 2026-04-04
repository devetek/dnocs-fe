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
  filterQuery?: {
    providerName?: string;
    domain?: string;
  };
  page?: number;
  perPage?: number;
}

export function recipe(params: RecipeParams): GetRequestRecipe {
  const { filterQuery, page = 1, perPage = 5 } = params;

  const queryParams = createQueryParams({
    provider: filterQuery?.providerName,
    domain: filterQuery?.domain,
    page,
    limit: perPage,
  });

  return {
    url: `/v1/domain/find?${queryParams.toString()}`,
  };
}

// =============================================================================
//   Method
// =============================================================================

export interface Dto {
  domains?: DTOs.DomainV1[];
  pagination: DTOs.Pagination;
}

export function useGet(params: WithApiGetOptions<RecipeParams>) {
  return useApiGet<Dto>(recipe(params), params.options);
}

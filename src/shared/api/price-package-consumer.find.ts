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
  pricePackageId?: string;
  userId?: string;
  paymentStatus?: string;
  page?: number;
  pageSize?: number;
}

export function recipe(params: RecipeParams): GetRequestRecipe {
  const { userId, paymentStatus, pricePackageId, page, pageSize } = params;

  const queryParams = createQueryParams({
    user_id: userId,
    pricePackageID: pricePackageId,
    payment_status: paymentStatus,
    page,
    limit: pageSize,
  });

  return {
    url: `/v1/price-package-consumer/find?${queryParams.toString()}`,
  };
}

// =============================================================================
//   Method
// =============================================================================

export interface Dto {
  price_package_consumers?: DTOs.PricePackageConsumerV1[];
  pagination: DTOs.Pagination;
}

export function useGet(params: WithApiGetOptions<RecipeParams>) {
  return useApiGet<Dto>(recipe(params), params.options);
}

export function useGetLazy() {
  return useApiGetLazy<Dto, RecipeParams>(recipe);
}

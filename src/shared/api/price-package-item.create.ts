import type { DoRequestRecipe } from '@/shared/libs/api-client/rules/types';

import { apiDoPost } from '../libs/api-client';

// =============================================================================
//   Recipe
// =============================================================================

export interface RecipeParams {
  pricePackageId: string;
  priceNameId: string;
  limit: number;
}

export function recipe(params: RecipeParams): DoRequestRecipe {
  const { limit, priceNameId, pricePackageId } = params;

  return {
    method: 'POST',
    url: `/v1/price-package-item/create`,
    data: {
      price_package_id: pricePackageId,
      price_name_id: priceNameId,
      limit: limit,
    },
  };
}

// =============================================================================
//   Method
// =============================================================================

export function doPost(params: RecipeParams) {
  return apiDoPost({
    ...recipe(params),
  });
}

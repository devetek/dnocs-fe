import type { DoRequestRecipe } from '@/shared/libs/api-client/rules/types';

import { apiDoPost } from '../libs/api-client';

// =============================================================================
//   Recipe
// =============================================================================

export interface RecipeParams {
  name: string;
  currency: string;
  price: number;
  period: number;
  isPublic: boolean;
}

export function recipe(params: RecipeParams): DoRequestRecipe {
  const { name, currency, price, period, isPublic } = params;

  return {
    method: 'POST',
    url: `/v1/price-package/create`,
    data: {
      name,
      currency,
      price,
      period,
      is_public: isPublic,
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

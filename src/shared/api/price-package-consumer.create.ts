import type { DoRequestRecipe } from '@/shared/libs/api-client/rules/types';

import { apiDoPost } from '../libs/api-client';

// =============================================================================
//   Recipe
// =============================================================================

export interface RecipeParams {
  organizationId: string;
  userId: string;
  pricePackageId: string;
  paymentProvider: string;
}

export function recipe(params: RecipeParams): DoRequestRecipe {
  const { organizationId, paymentProvider, pricePackageId, userId } = params;

  return {
    method: 'POST',
    url: `/v1/price-package-consumer/create`,
    data: {
      organization_id: organizationId,
      user_id: userId,
      price_package_id: pricePackageId,
      payment_provider: paymentProvider,
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

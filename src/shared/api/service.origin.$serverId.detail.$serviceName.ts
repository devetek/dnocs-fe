import { useApiGet } from '@/shared/libs/api-client';
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
  serverId: string;
  serviceName: string;
}

export function recipe(params: RecipeParams): GetRequestRecipe {
  const { serverId, serviceName } = params;

  return {
    url: `/v1/service/origin/${serverId}/detail/${serviceName}`,
  };
}

// =============================================================================
//   Method
// =============================================================================

export function useGet(params: WithApiGetOptions<RecipeParams>) {
  return useApiGet<DTOs.ServiceOriginDetailV1>(recipe(params), params.options);
}

export function useGetLazy() {
  return useApiGetLazy<DTOs.ServiceOriginDetailV1, RecipeParams>(recipe);
}

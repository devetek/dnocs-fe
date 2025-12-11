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

export function recipe(): GetRequestRecipe {
  return {
    url: '/v0/user/profile',
  };
}

// =============================================================================
//   Method
// =============================================================================

export interface Dto {
  agent?: string;
  router?: string;
  user?: DTOs.User;
  github: DTOs.Github;
}

export function useGet(params?: WithApiGetOptions) {
  return useApiGet<Dto>(recipe(), params?.options);
}

export function useGetLazy() {
  return useApiGetLazy<Dto, unknown>(recipe);
}

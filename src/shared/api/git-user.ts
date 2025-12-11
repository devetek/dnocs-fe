import { useApiGet } from '@/shared/libs/api-client';
import useApiGetLazy from '@/shared/libs/api-client/hooks/useApiGetLazy';
import type {
  GetRequestRecipe,
  WithApiGetOptions,
} from '@/shared/libs/api-client/rules/types';

// =============================================================================
//   Recipe
// =============================================================================

export function recipe(): GetRequestRecipe {
  return {
    url: '/v1/git-user',
  };
}

// =============================================================================
//   Method
// =============================================================================

export interface Dto {
  id: number;
  login: string;
  organizations: Array<{ id: number; login: string }>;
}

export function useGet(params?: WithApiGetOptions) {
  return useApiGet<Dto>(recipe(), params?.options);
}

export function useGetLazy() {
  return useApiGetLazy<Dto, unknown>(recipe);
}

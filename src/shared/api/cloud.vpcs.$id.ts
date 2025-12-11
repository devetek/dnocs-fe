import { createQueryParams, useApiGet } from '@/shared/libs/api-client';
import { apiClient } from '@/shared/libs/api-client/lib/client';
import type {
  GetRequestRecipe,
  WithApiGetOptions,
} from '@/shared/libs/api-client/rules/types';

// =============================================================================
//   Recipe
// =============================================================================

export interface RecipeParams {
  cloudProjectId: string;
  regionSlug?: string | null;
}

export function recipe(params: RecipeParams): GetRequestRecipe {
  const { cloudProjectId, regionSlug } = params;

  const queryParams = createQueryParams({
    region: regionSlug,
  });

  return {
    url: `/v1/cloud/vpcs/${cloudProjectId}?${queryParams.toString()}`,
  };
}

// =============================================================================
//   Method
// =============================================================================

export interface Dto {
  vlan_id: number;
  subnet: string;
  name: string;
  created_at: string;
  updated_at: string;
  uuid: string;
  type: string;
  is_default: boolean;
  vm_uuids: string[];
  resources_count: number;
  subnet_ipv6: string;
}

export function useGet(params: WithApiGetOptions<RecipeParams>) {
  return useApiGet<Dto[]>(recipe(params), params.options);
}

export function fetchGet(params: RecipeParams) {
  return apiClient<Dto[]>({
    ...recipe(params),
    method: 'GET',
  });
}

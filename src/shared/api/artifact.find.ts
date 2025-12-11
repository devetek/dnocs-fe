import { createQueryParams, useApiGet } from '@/shared/libs/api-client';
import type {
  GetRequestRecipe,
  WithApiGetOptions,
} from '@/shared/libs/api-client/rules/types';

import type { DTOs } from '.';

export interface RecipeParams {
  applicationId: string;
  serverId?: string;
  page?: number;
  perPage?: number;
}

export function recipe(params: RecipeParams): GetRequestRecipe {
  const { applicationId, serverId, page = 1, perPage = 5 } = params;

  const queryParams = createQueryParams({
    application_id: applicationId,
    machine_id: serverId,
    page,
    per_page: perPage,
  });

  return {
    url: `/v1/artifact/find?${queryParams.toString()}`,
  };
}

export interface Dto {
  artifacts?: DTOs.ArtifactV1[];
  pagination: DTOs.Pagination;
}

export function useGet(params: WithApiGetOptions<RecipeParams>) {
  return useApiGet<Dto>(recipe(params), params.options);
}

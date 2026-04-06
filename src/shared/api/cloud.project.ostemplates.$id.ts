import { useApiGet } from '@/shared/libs/api-client';
import type {
  GetRequestRecipe,
  WithApiGetOptions,
} from '@/shared/libs/api-client/rules/types';

// =============================================================================
//   Recipe
// =============================================================================

export interface RecipeParams {
  cloudProjectId: string;
}

export function recipe(params: RecipeParams): GetRequestRecipe {
  const { cloudProjectId } = params;

  return {
    url: `/v1/cloud/project/detail/${cloudProjectId}/ostemplates`,
  };
}

// =============================================================================
//   Method
// =============================================================================

export interface OsTemplateItem {
  id: string;
  name: string;
}

export type Dto = OsTemplateItem[];

export function useGet(params: WithApiGetOptions<RecipeParams>) {
  return useApiGet<Dto>(recipe(params), params.options);
}

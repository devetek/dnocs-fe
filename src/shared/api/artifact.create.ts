import type { DoRequestRecipe } from '@/shared/libs/api-client/rules/types';

import { apiDoPost } from '../libs/api-client';

// =============================================================================
//   Recipe
// =============================================================================

export interface RecipeParams {
  appDefinition?: Record<string, unknown>;
  applicationId: string;
  workerId: string;
  fromBranch: string;
  commit: {
    message: string;
    sha: string;
  };
  appConfigFile: string;
}

export function recipe(params: RecipeParams): DoRequestRecipe {
  const {
    appDefinition,
    applicationId,
    workerId,
    fromBranch,
    commit,
    appConfigFile,
  } = params;

  return {
    method: 'POST',
    url: `/v1/artifact/create`,
    data: {
      app_definition: appDefinition,
      application_id: Number(applicationId),
      machine_id: Number(workerId),
      branch: fromBranch,
      build_artifact: false,
      description: commit.message,
      git_host: 'github',
      head: commit.sha,
      meta_file: appConfigFile === 'default' ? '' : appConfigFile,
    },
  };
}

// =============================================================================
//   Method
// =============================================================================

export interface Dto {
  id: string;
}

export function doPost(params: RecipeParams) {
  return apiDoPost<Dto>({
    ...recipe(params),
  });
}

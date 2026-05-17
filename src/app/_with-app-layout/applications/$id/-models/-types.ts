import type { ApplicationDetail } from '@/entities/application/rules/schema';
import type { SchemaCommon } from '@/entities/shared/rules/schema';

import type { Response } from '@/shared/libs/api-client/rules/types';

export interface UseGetAppDetailsParams {
  applicationId: SchemaCommon.UnitId;
}

export interface UseGetGitDetailsParams {
  appDetails: Response<ApplicationDetail>;
}

export interface UseGetArtifactHistoryParams {
  applicationId: SchemaCommon.UnitId;
}

export interface UseGetDeploymentHistoryParams {
  applicationId: SchemaCommon.UnitId;
}

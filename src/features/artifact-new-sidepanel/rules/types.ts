import type { SchemaApplicationParts } from '@/entities/application/rules/schema';
import type { SchemaCommon } from '@/entities/shared/rules/schema';

export interface ArtifactNewSidepanelProps {
  repoOrganization: string;
  repoName: string;
  applicationId: SchemaCommon.UnitId;
  currentServerId?: SchemaCommon.UnitId;
  appConfig: SchemaApplicationParts.ConfigDefs;
  onSuccess?: (newWorkerId: SchemaCommon.UnitId) => void;
}

export interface GitBranchModelProps {
  repoOrganization: string;
  repoName: string;
}

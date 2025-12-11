import type { SchemaCommon } from '@/entities/shared/rules/schema';

import type { SchemaApplicationEdit } from './form-schema';

export interface ApplicationEditSidepanelProps extends SchemaApplicationEdit {
  applicationId: SchemaCommon.UnitId;
  applicationName?: string;
  repoName: string;
  repoOrganization: string;
  onSuccess?: () => void;
}

export interface GitBranchModelProps {
  repoOrganization: string;
  repoName: string;
}

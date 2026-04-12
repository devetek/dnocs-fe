import type { AppDefinition } from '@/shared/api/-dtos/application';
import type { SchemaCommon } from '@/entities/shared/rules/schema';

import type { SchemaApplicationEdit } from './form-schema';

export interface ApplicationEditSidepanelProps extends SchemaApplicationEdit {
  applicationId: SchemaCommon.UnitId;
  applicationName?: string;
  repoName: string;
  repoOrganization: string;
  rawAppDefinition?: AppDefinition;
  onSuccess?: () => void;
}

export interface GitBranchModelProps {
  repoOrganization: string;
  repoName: string;
}

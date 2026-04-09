import type { AppDefinition } from '@/shared/api/-dtos/application';
import type { SchemaCommon } from '@/entities/shared/rules/schema';

import type { SchemaApplicationBuildEdit } from './form-schema';

export interface ApplicationBuildEditSidepanelProps extends SchemaApplicationBuildEdit {
  applicationId: SchemaCommon.UnitId;
  applicationName: string;
  rawAppDefinition: AppDefinition;
  onSuccess?: () => void;
}

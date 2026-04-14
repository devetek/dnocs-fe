import type { AppDefinition } from '@/shared/api/-dtos/application';
import type { SchemaCommon } from '@/entities/shared/rules/schema';

import type { SchemaApplicationSetupEdit } from './form-schema';

export interface ApplicationSetupEditSidepanelProps extends SchemaApplicationSetupEdit {
  applicationId: SchemaCommon.UnitId;
  applicationName: string;
  rawAppDefinition: AppDefinition;
  onSuccess?: () => void;
}

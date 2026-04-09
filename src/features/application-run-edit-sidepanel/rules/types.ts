import type { AppDefinition } from '@/shared/api/-dtos/application';
import type { SchemaCommon } from '@/entities/shared/rules/schema';

import type { SchemaApplicationRunEdit } from './form-schema';

export interface ApplicationRunEditSidepanelProps extends SchemaApplicationRunEdit {
  applicationId: SchemaCommon.UnitId;
  applicationName: string;
  rawAppDefinition: AppDefinition;
  onSuccess?: () => void;
}

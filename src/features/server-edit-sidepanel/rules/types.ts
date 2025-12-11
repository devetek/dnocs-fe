import type { SchemaCommon } from '@/entities/shared/rules/schema';

import type { SchemaServerEdit } from './form-schema';

export interface ServerEditSidepanelProps extends SchemaServerEdit {
  serverId: SchemaCommon.UnitId;
  serverName?: string;
  onSuccess?: () => void;
}

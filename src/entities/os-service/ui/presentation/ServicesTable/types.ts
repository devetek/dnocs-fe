import type { SchemaCommon } from '@/entities/shared/rules/schema';

import type { OsService, SchemaOsServiceParts } from '../../../rules/schema';
import type { PushActivityPayload } from '../../../rules/types';

export interface ServicesTableProps {
  targetServerId: SchemaCommon.UnitId;
  services: OsService[];
  onClickServiceDetail?: (serviceName: string) => void;
  onClickActivity?: (payload: PushActivityPayload) => void;
}

export type ServiceTableRowProps = OsService & {
  onClickServiceDetail?: () => void;
  onClickActivity?: (activity: SchemaOsServiceParts.Activity) => void;
};

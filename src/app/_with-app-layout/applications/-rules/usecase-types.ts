import type { ApplicationCard } from '@/entities/application/rules/schema';
import type { SchemaCommon } from '@/entities/shared/rules/schema';

export interface ApplicationDeletePayload {
  appName: string;
  id: SchemaCommon.UnitId;
}

export type ApplicationMigrateOwnershipPayload = ApplicationCard;

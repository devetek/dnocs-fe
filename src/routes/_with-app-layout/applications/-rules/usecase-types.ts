import type { SchemaCommon } from '@/entities/shared/rules/schema';

export interface ApplicationDeletePayload {
  appName: string;
  id: SchemaCommon.UnitId;
}

export interface ApplicationClaimPayload {
  appName: string;
  id: SchemaCommon.UnitId;
}

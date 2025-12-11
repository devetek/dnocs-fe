import type { SchemaCommon } from '@/entities/shared/rules/schema';

export interface ServerClaimToOrgPayload {
  serverId: SchemaCommon.UnitId;
  serverName: string;
}

export interface MachineReinstallPayload {
  serverId: SchemaCommon.UnitId;
}

export interface MachineDeletePayload {
  serverName?: string;
  serverId: SchemaCommon.UnitId;
}

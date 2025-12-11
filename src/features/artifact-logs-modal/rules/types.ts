import type { SchemaCommon } from '@/entities/shared/rules/schema';

export interface ArtifactLogsModalProps {
  artifactId: SchemaCommon.UnitId;
  serverId: SchemaCommon.UnitId;
  commitHead: string;
  userName: string;
  appName: string;
}

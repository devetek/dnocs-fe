import type { SchemaCommon } from '@/entities/shared/rules/schema';

export interface RollbackTarget {
  id: SchemaCommon.UnitId;
  hostname: string;
}

export interface ArtifactRollbackModalProps {
  commitHead: string;
  artifactId: SchemaCommon.UnitId;
  applicationId: SchemaCommon.UnitId;
  deploymentTargets: RollbackTarget[];
  onSuccess: () => void;
}

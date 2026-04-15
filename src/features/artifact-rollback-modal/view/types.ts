import type { SchemaCommon } from '@/entities/shared/rules/schema';

export interface ArtifactRollbackModalProps {
  commitHead: string;
  artifactId: SchemaCommon.UnitId;
  applicationId: SchemaCommon.UnitId;
  onSuccess: () => void;
}

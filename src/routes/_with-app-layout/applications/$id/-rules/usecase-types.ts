import type { SchemaCommon } from '@/entities/shared/rules/schema';

// =============================================================================
//   Scope: Artifact *
// =============================================================================

export interface ArtifactProgressCancelPayload {
  commitHead: string;
  serverId: SchemaCommon.UnitId;
}

export interface ArtifactDeletePayload {
  artifactId: SchemaCommon.UnitId;
}

export interface ArtifactRollbackPayload {
  commitHead: string;
  artifactId: SchemaCommon.UnitId;
}

// =============================================================================
//   Scope: Deployment *
// =============================================================================

export interface DeploymentDeletePayload {
  deploymentId: SchemaCommon.UnitId;
}

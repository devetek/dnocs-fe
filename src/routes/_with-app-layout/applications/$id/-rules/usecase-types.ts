import type { AppDefinition } from '@/shared/api/-dtos/application';
import type { SchemaCommon } from '@/entities/shared/rules/schema';
import type { UnitEnvironmentKV, UnitSteps } from '@/entities/shared/rules/schema/app-config';

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

export interface DeploymentRestorePayload {
  applicationId: SchemaCommon.UnitId;
  artifactId: SchemaCommon.UnitId;
  workerId: SchemaCommon.UnitId;
}

// =============================================================================
//   Scope: Application *
// =============================================================================

export interface ApplicationDeletePayload {
  applicationId: SchemaCommon.UnitId;
  applicationName: string;
}

export interface ApplicationBuildEditPayload {
  applicationId: SchemaCommon.UnitId;
  applicationName: string;
  rawAppDefinition: AppDefinition;
  steps: UnitSteps[];
  envs: UnitEnvironmentKV[];
}

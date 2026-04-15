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
  applicationId: SchemaCommon.UnitId;
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

export interface ApplicationRunEditPayload {
  applicationId: SchemaCommon.UnitId;
  applicationName: string;
  rawAppDefinition: AppDefinition;
  command: string;
  envs: UnitEnvironmentKV[];
}

export interface ApplicationSetupEditPayload {
  applicationId: SchemaCommon.UnitId;
  applicationName: string;
  rawAppDefinition: AppDefinition;
  language: { name: string; version: string };
  languages: Array<{ name: string; version: string }>;
}

export interface ApplicationEditPayload {
  applicationId: SchemaCommon.UnitId;
  applicationName: string;
  repoName: string;
  repoOrganization: string;
  rawAppDefinition?: AppDefinition;
  workdir: string;
  port?: number;
  autoDeploy: {
    fromBranch?: string;
    isEnabled: boolean;
  };
}

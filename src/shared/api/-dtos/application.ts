// =============================================================================
//
//     Data Transfer Object ()
//
// =============================================================================

import type { ArtifactV1, DeployV1, OrganizationV1 } from '.';

export interface ApplicationV1 {
  id?: number;
  name?: string;
  workdir?: string;
  domain?: string;
  source?: string;
  source_type?: string;
  bundle_type?: string;
  default_branch?: string;
  repo_org?: string;
  repo_name?: string;
  repo_url?: string;
  owner?: number;
  organization_id?: string;
  organization?: OrganizationV1;
  user_id?: number;
  user?: {
    username: string;
    fullname: string;
  };
  created_at?: string;
  updated_at?: string;
  deploys?: DeployV1[];
  artifacts?: ArtifactV1[];
  app_definition?: AppDefinition;
  app_config?: AppConfig;
}

export interface AppDefinition {
  version: string;
  setup: {
    language: {
      name: string;
      version: string | number;
    };
    languages?: Array<{
      name: string;
      version: string;
    }>;
    router: unknown;
  };
  build: {
    target: {
      machine: {
        workdir: string;
        steps: Array<{
          name: string;
          command?: string[];
          archive?: string[];
        }>;
        environment?: Array<{
          key: string;
          value: string;
        }>;
      };
    };
  };
  run: {
    name: string;
    description: string;
    command: string;
    port: number;
    no_service: boolean;
    environment?: Array<{
      key: string;
      value: string;
    }>;
    config: null;
  };
}

interface AppConfig {
  auto_deploy: AutoDeploy;
}

interface AutoDeploy {
  enabled?: boolean;
  branch?: string;
}

// =============================================================================
//
//     Data Transfer Object ()
//
// =============================================================================

import type { MachineV1 } from './machine';
import type { OrganizationV1 } from './organization';

export interface LoadBalancerRuleUpstreamV2 {
  address?: string;
  port?: string;
}

export interface LoadBalancerRuleV2 {
  path_match?: string;
  type?: string;
  wildcard?: boolean;
  target?: {
    application_id?: string;
    upstreams?: LoadBalancerRuleUpstreamV2[];
  };
}

export interface LoadBalancerConfigV2 {
  domain?: {
    cloudflare?: {
      proxied?: boolean;
    };
    id?: string;
    subdomain?: string;
  };
  lb_kind?: string;
  protocol?: string;
  ssl_enabled?: boolean;
}

export interface LoadBalancerV2 {
  id?: number;
  name?: string;
  domain?: string;
  engine?: string;
  type?: string;
  upstream?: string;
  machine_id?: number;
  advance_mode?: boolean;
  config?: LoadBalancerConfigV2;
  rules?: LoadBalancerRuleV2[];
  organization_id?: string;
  organization?: OrganizationV1;
  user_id?: number;
  user?: {
    username: string;
    fullname: string;
  };
  installer_status?: string;
  error?: string;
  created_at?: string;
  updated_at?: string;
  machine?: MachineV1;
}

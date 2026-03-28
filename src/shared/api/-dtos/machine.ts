// =============================================================================
//
//     Data Transfer Object ()
//
// =============================================================================

import type { OrganizationV1, User } from '.';

export interface MachineV1 {
  id?: number;
  hostname?: string;
  address?: string;
  vpc_id?: string;
  private_address?: string;
  private_subnet?: string;
  http_port?: string;
  ssh_port?: string;
  organization_id?: string;
  organization?: OrganizationV1;
  user_id?: number;
  user?: User;
  cloud_id?: string;
  source?: string;
  provider?: string;
  region_id?: string;
  region?: string;
  zone?: string;
  access?: string;
  default_user?: string;
  agent_version?: string;
  token?: string;
  token_version?: string;
  secret_id?: string;
  id_rsa?: string;
  distributor?: string;
  version?: string;
  vcpu?: number;
  cpu_core?: number;
  ram?: number;
  domain_id?: number;
  domain?: string;
  status?: string;
  error?: string;
  created_at?: string;
  updated_at?: string;
}

export interface MachineUser {
    id?: number;
    username?: string;
    password?: string;
    group?: string;
    uid?: number;
    gid?: number;
    comment?: string;
    machine_id?: number;
    user_id?: number;
    installer?: string;
    installer_status?: string;
    error?: string;
    created_at?: string;
    updated_at?: string;
}

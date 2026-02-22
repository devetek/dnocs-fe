import type { MachineV1 } from './machine';
import type { OrganizationV1 } from './organization';

export interface InputRouterV1 {
  id?: number;
  engine?: string;
  type?: string;
  name?: string;
  domain?: string;
  upstream?: string;
  advance_mode?: boolean;
  installer_status?: string;
  error?: string;
  owner?: number;
  machine_id?: number;
}

export interface RouterV1 {
  id?: number;
  engine?: string;
  type?: string;
  name?: string;
  domain?: string;
  upstream?: string;
  advance_mode?: boolean;
  organization_id?: string;
  organization?: OrganizationV1;
  user_id?: number;
  user?: {
    username: string;
    fullname: string;
  };
  machine_id?: number;
  installer_status?: string;
  error?: string;
  created_at?: string;
  updated_at?: string;
  machine?: MachineV1;
}

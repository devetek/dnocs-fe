import type { MachineV1 } from './machine';

export interface DatabaseV1 {
  id?: number;
  engine?: string;
  name?: string;
  owner?: number;
  machine_id?: number;
  tables?: Table[];
  created_at?: string;
  updated_at?: string;
  machine?: MachineV1;
}

export interface Table {
  table: string;
  size: string;
}

export interface DatabaseUserV1 {
  id?: number;
  engine?: string;
  name?: string;
  password?: string;
  owner?: number;
  host?: string;
  machine_id?: number;
  created_at?: string;
  updated_at?: string;
  machine?: MachineV1;
}

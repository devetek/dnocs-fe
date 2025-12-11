import type { MachineV1, ServiceOriginDetailV1 } from '.';

export interface DeployV1 {
  id?: number;
  machine_id: number;
  application_id?: number;
  installer_status?: string;
  error?: string;
  user_id?: number;
  artifact_id: number;
  created_at?: string;
  updated_at?: string;
  machine?: MachineV1;
  service: Partial<ServiceOriginDetailV1>;
}

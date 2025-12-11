import type { AppDefinition } from './application';
import type { MachineV1 } from './machine';

export interface ArtifactV1 {
  id?: number;
  branch?: string;
  description?: string;
  head?: string;
  meta_file?: string;
  build_artifact?: boolean;
  installer_status?: string;
  error?: string;
  // file_url?: ApplicationArtifactFileURLV1;
  app_definition?: AppDefinition;
  machine_id?: number;
  user_id: number;
  user?: {
    id: number;
    username: string;
  };
  application_id?: number;
  created_at?: string;
  updated_at?: string;
  machine: MachineV1;
}

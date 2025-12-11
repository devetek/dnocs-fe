export interface CloudProjectV1 {
  id?: number;
  provider?: string;
  name?: string;
  owner?: number;
  error?: string;
  installer_status?: string;
  credential?: Record<string, string>;
  created_at?: string;
  updated_at?: string;
}

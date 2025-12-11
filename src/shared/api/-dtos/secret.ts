export interface SshKeyV1 {
  id?: number;
  type?: string;
  name?: string;
  user_id?: number;
  token_version?: string;
  data?: SshKeyDataV1;
  error?: string;
  created_at?: string;
  updated_at?: string;
}

export interface SshKeyDataV1 {
  private: string;
  public: string;
  length: string;
}

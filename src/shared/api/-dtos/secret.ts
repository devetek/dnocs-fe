export interface SshKeyV1 {
  id?: number;
  type?: string;
  name?: string;
  user_id?: number;
  organization_id?: string;
  token_version?: string;
  data?: SshKeyDataV1;
  error?: string;
  created_at?: string;
  updated_at?: string;
  user?: {
    id?: number;
    fullname?: string;
    username?: string;
    email?: string;
    avatar_url?: string;
  };
  organization?: {
    id?: string;
    name?: string;
  };
}

export interface SshKeyDataV1 {
  private: string;
  public: string;
  length: string;
}

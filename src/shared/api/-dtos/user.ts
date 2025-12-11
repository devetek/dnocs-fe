export interface User {
  id: number;
  fullname: string;
  username: string;
  email: string;
  register_from_user_id?: string;
  register_from?: string;
  avatar_url?: string;
  actived_at?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Github {
  provider?: string;
  nickname?: string;
  access_token?: string;
  access_token_secret?: string;
  refresh_token?: string;
  expires_at?: string;
  id_token?: string;
}

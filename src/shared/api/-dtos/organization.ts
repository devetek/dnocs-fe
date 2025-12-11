import type { User } from '.';

export interface OrganizationV1 {
  id?: string;
  name?: string;
  description?: string;
  status?: string;
  error?: string;
  user_id?: string;
  created_at?: string;
  updated_at?: string;
}

export interface OrganizationPeopleV1 {
  id?: string;
  organization_id?: string;
  organization?: OrganizationV1;
  user_id?: string;
  user?: User;
  created_at?: string;
  updated_at?: string;
}

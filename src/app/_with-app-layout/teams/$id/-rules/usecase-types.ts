export interface MemberDeletePayload {
  id: string;
  name: string;
}

export interface OrgEditPayload {
  orgId: string;
  name: string;
  description?: string;
}

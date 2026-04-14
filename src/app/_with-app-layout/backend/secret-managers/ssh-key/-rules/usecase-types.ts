export interface SshKeyDeletePayload {
  id: number;
  name: string;
}

export interface SshKeyDetailsPayload {
  sshKeyId: number;
  sshKeyName: string;
}

export interface SshKeyMigrateOwnershipPayload {
  id: number;
  name: string;
  teamName?: string | null;
}

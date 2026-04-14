export interface CloudProjectDeletePayload {
  id: number;
  name: string;
}

export interface CloudProjectDetailsPayload {
  cloudProjectId: string;
  cloudProjectName: string;
}

export interface CloudProjectMigrateOwnershipPayload {
  id: number;
  name: string;
  teamName?: string | null;
}

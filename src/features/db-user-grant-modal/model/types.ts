export interface DbUserGrantModalProps {
  selectedUserId: string;
  selectedUserName: string;
  selectedUserDbEngine: string;
  selectedUserAccess: string;

  onSubmitSuccess?: () => void;
}

export interface SelectedDB {
  dbID: number;
  dbName: string;
  dbEngine: string;
}

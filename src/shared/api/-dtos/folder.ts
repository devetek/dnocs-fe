export interface FolderOrigin {
  name?: string;
  size?: string;
  real_size: number;
  mode?: string;
  permissions?: string;
  last_modified?: string;
  is_dir: boolean;
}

export interface FolderOriginContent {
  content: string;
}

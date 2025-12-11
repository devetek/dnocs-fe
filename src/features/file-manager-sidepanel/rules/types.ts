import type { SchemaFileManagerParts } from '@/entities/file-manager/rules/schema';
import type { SchemaCommon } from '@/entities/shared/rules/schema';

export interface FileManagerSidepanelProps {
  serverId: SchemaCommon.UnitId;
  onPreviewFile?: (
    fullPath: string,
    selectedFile: SchemaFileManagerParts.ContentFile,
  ) => void;
}

export interface FilesystemBrowserHistory {
  stack: string[];
  currentIndex: number;
}

export type ViewMode = 'table' | 'grid';

// =============================================================================
//   Operation
// =============================================================================

export type FsOperationStatus = 'loading' | 'done' | 'failed';

type Op<Kind extends string, T> = T & {
  timestamp: string;
  id: string;
  operationKind: Kind;
  status: FsOperationStatus;
};

export type FsOperationReport =
  | Op<'upload', FsOpUpload>
  | Op<'delete', FsOpDelete>
  | Op<'folder_new', FsOpFolderNew>;

export interface FsOpUpload {
  fileName: string;
}

export interface FsOpFolderNew {
  folderName: string;
}

export interface FsOpDelete {
  fsKind: 'file' | 'folder';
  itemName: string;
}

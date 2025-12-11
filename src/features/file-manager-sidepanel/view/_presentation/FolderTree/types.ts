import type { CSSProperties } from 'react';

import type { FilesystemRegistry } from '@/entities/file-manager/rules/filesystem';

import type { ResponseError } from '@/shared/libs/api-client/rules/types';

export interface FolderTreeProps {
  isEager: boolean;
  registry: FilesystemRegistry;
  basePath: string;
  currentFullPath?: string;
  onClickFolderItem: (fullPath: string) => void;
}

export interface FolderItemRowProps {
  folderName: string;
  folderStatus: FolderStatus;
  isSelected?: boolean;
  isOpened?: boolean;
  style?: CSSProperties;
  onClick?: () => void;
}

export interface FolderRootRowProps {
  basePath: string;
}

export type FolderStatus = 'unloaded' | 'loaded' | 'failed';

export interface BasePathFailedProps {
  error: ResponseError;
}

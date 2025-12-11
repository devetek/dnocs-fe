import type {
  FilesystemRegistry,
  FilesystemRegistryEntry,
  FullPath,
} from '@/entities/file-manager/rules/filesystem';
import type { SchemaFilesystemContent } from '@/entities/file-manager/rules/schema';

import { registerEvents } from '@/shared/libs/events';
import type { Rescope } from '@/shared/libs/events/models/registerEvents';

import type {
  FilesystemBrowserHistory,
  FsOperationReport,
  FsOperationStatus,
  ViewMode,
} from '../rules/types';

type EventsRegistry = Rescope<
  '#file-manager-sidepanel',
  {
    'filesystem-[internal]-registry-update': FilesystemRegistry;
    'filesystem-[internal]-registry-add': {
      fullPath: FullPath;
      entry: FilesystemRegistryEntry;
    };
    'filesystem-[internal]-registry-remove': {
      fullPath: FullPath;
    };
    'filesystem-[internal]-history-update': FilesystemBrowserHistory;
    'filesystem-history-navigate': 'back' | 'forward';
    'filesystem-history-navigate-to': FullPath;
    'filesystem-history-navigate-refresh': null;

    'browser-fs-operation-add': FsOperationReport;
    'browser-fs-operation-update': FsOperationReport;
    'browser-fs-operation-update-status': {
      id: string;
      status: FsOperationStatus;
      timestamp: string;
    };
    'browser-select-item': SchemaFilesystemContent | undefined | null;
    'browser-search-query': string;
    'browser-view-mode': ViewMode;

    'tool-current-path-copy': null;
    'tool-current-path-upload': null;
    'tool-current-path-folder-new': {
      folderName: string;
      permissionCode: string;
    };
    'tool-selected-file-preview': null;
    'tool-selected-file-download': null;
    'tool-selected-item-delete': null;
  }
>;

export const [useEmit, useSubscribe] = registerEvents<EventsRegistry>();

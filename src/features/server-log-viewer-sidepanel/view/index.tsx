import { useState } from 'react';

import {
  FileIcon,
  FolderIcon,
  FolderOpenIcon,
  RefreshCwIcon,
  ScrollTextIcon,
} from 'lucide-react';

import Layout from '@/services/sidepanel/ui/presentation/Layout/General';

import { ApiFolder } from '@/shared/api';
import { cn } from '@/shared/libs/tailwind/cn';
import { Spinner } from '@/shared/presentation/atoms/Spinner';

import type { ServerLogViewerSidepanelProps as Props } from '../rules/types';

const DEFAULT_BASE_PATH = '/var/log';

export default function ServerLogViewerSidepanel(props: Props) {
  const { serverId, serverName } = props;

  const [currentPath, setCurrentPath] = useState(DEFAULT_BASE_PATH);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);

  const [watchResponse, fetchWatch] = ApiFolder.Origin.$ServerId.Watch.useGetLazy();
  const [folderResponse] = ApiFolder.Origin.$ServerId.useGet({
    serverId,
    basePath: currentPath,
  });

  const handleClickItem = (name: string, isDir: boolean) => {
    const fullPath = `${currentPath}/${name}`.replace(/\/\//g, '/');
    if (isDir) {
      setCurrentPath(fullPath);
    } else {
      setSelectedFile(fullPath);
      fetchWatch({ serverId, filePath: fullPath, line: 20 });
    }
  };

  const handleClickBack = () => {
    const parts = currentPath.split('/').filter(Boolean);
    if (parts.length <= 1) return;
    setCurrentPath('/' + parts.slice(0, -1).join('/'));
  };

  const handleRefresh = () => {
    if (!selectedFile) return;
    fetchWatch({ serverId, filePath: selectedFile, line: 20 });
  };

  const items =
    folderResponse.$status === 'success'
      ? [...folderResponse].sort((a, b) => {
          if (a.is_dir !== b.is_dir) return a.is_dir ? -1 : 1;
          return (a.name ?? '').localeCompare(b.name ?? '');
        })
      : [];

  const logLines =
    watchResponse.$status === 'success'
      ? [...watchResponse]
      : [];

  return (
    <Layout classNameFrame="w-[calc(100svw_-_16px)] max-w-[900px]">
      <Layout.Title
        className="bg-background"
        title="Log Viewer"
        subtitle={serverName || `Server ID: ${serverId}`}
        hasCloseButton
      />

      <div className="flex-1 grid grid-cols-[260px_1fr] border-t overflow-hidden min-h-0 h-full">
        {/* Sidebar — folder browser */}
        <aside className="flex flex-col border-r bg-background overflow-hidden">
          {/* Path bar */}
          <div className="px-3 py-2 border-b flex items-center gap-1.5 min-h-10">
            <button
              className="cursor-pointer text-xs text-muted-foreground hover:text-foreground transition-colors disabled:opacity-40 disabled:cursor-default"
              disabled={currentPath === '/'}
              onClick={handleClickBack}
            >
              ←
            </button>
            <p
              className="text-xs text-muted-foreground truncate"
              title={currentPath}
            >
              {currentPath}
            </p>
          </div>

          {/* Item list */}
          <div className="flex-1 overflow-y-auto px-1 py-1">
            {folderResponse.$status === 'initial' ||
            folderResponse.$status === 'loading' ? (
              <div className="flex justify-center pt-6">
                <Spinner />
              </div>
            ) : folderResponse.$status === 'failed' ? (
              <p className="text-xs text-destructive px-2 py-2">
                Failed to load directory.
              </p>
            ) : items.length === 0 ? (
              <p className="text-xs text-muted-foreground px-2 py-2">
                Empty directory.
              </p>
            ) : (
              items.map((item) => {
                const name = item.name ?? '';
                const fullPath = `${currentPath}/${name}`.replace(/\/\//g, '/');
                const isSelected = selectedFile === fullPath;

                return (
                  <button
                    key={name}
                    title={name}
                    onClick={() => handleClickItem(name, item.is_dir)}
                    className={cn(
                      'w-full flex items-center gap-2 px-2 py-1.5 rounded text-left text-sm transition-colors cursor-pointer',
                      isSelected
                        ? 'bg-primary text-primary-foreground'
                        : 'hover:bg-muted/60 text-foreground',
                    )}
                  >
                    {item.is_dir ? (
                      <FolderIcon className="size-3.5 shrink-0 text-amber-500" />
                    ) : (
                      <FileIcon className="size-3.5 shrink-0 text-muted-foreground" />
                    )}
                    <span className="truncate text-xs">{name}</span>
                  </button>
                );
              })
            )}
          </div>
        </aside>

        {/* Content — log viewer */}
        <div className="flex flex-col bg-zinc-950 dark:bg-zinc-950 overflow-hidden min-h-0">
          {/* Log toolbar */}
          <div className="flex items-center justify-between px-3 py-2 border-b border-zinc-800 bg-zinc-900 shrink-0">
            <div className="flex items-center gap-2 min-w-0">
              <ScrollTextIcon className="size-3.5 text-zinc-400 shrink-0" />
              <span className="text-xs text-zinc-400 truncate">
                {selectedFile ?? 'Select a file to watch'}
              </span>
            </div>
            <button
              className="cursor-pointer p-1 rounded hover:bg-zinc-700 disabled:opacity-40 disabled:cursor-default transition-colors shrink-0 ml-2"
              disabled={!selectedFile || watchResponse.$status === 'loading'}
              onClick={handleRefresh}
              title="Refresh"
            >
              <RefreshCwIcon
                className={cn(
                  'size-3.5 text-zinc-400',
                  watchResponse.$status === 'loading' && 'animate-spin',
                )}
              />
            </button>
          </div>

          {/* Log output */}
          <div className="flex-1 overflow-y-auto font-mono text-xs leading-5 p-3 min-h-0">
            {!selectedFile ? (
              <div className="flex flex-col items-center justify-center h-full gap-3 opacity-40">
                <FolderOpenIcon className="size-10 text-zinc-500" />
                <p className="text-zinc-500 text-xs">
                  Select a file from the sidebar to view its logs
                </p>
              </div>
            ) : watchResponse.$status === 'loading' ? (
              <div className="flex justify-center pt-8">
                <Spinner />
              </div>
            ) : watchResponse.$status === 'failed' ? (
              <p className="text-red-400">
                Failed to load file: {watchResponse.error?.message ?? 'Unknown error'}
              </p>
            ) : watchResponse.$status === 'success' ? (
              logLines.length === 0 ? (
                <p className="text-zinc-500">File is empty.</p>
              ) : (
                <table className="w-full border-collapse">
                  <tbody>
                    {logLines.map((line, i) => (
                      <tr key={i} className="group hover:bg-zinc-800/50 transition-colors">
                        <td className="pr-4 py-0 text-right text-zinc-600 select-none w-10 shrink-0 align-top group-hover:text-zinc-500">
                          {i + 1}
                        </td>
                        <td className="py-0 text-zinc-200 whitespace-pre-wrap break-all align-top">
                          {line || ' '}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )
            ) : null}
          </div>
        </div>
      </div>
    </Layout>
  );
}

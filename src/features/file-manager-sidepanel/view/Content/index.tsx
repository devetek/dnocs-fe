import { useEffect, useState } from 'react';

import type { SchemaFilesystemContent } from '@/entities/file-manager/rules/schema';

import { iife } from '@/shared/libs/browser/iife';
import { useBreakpoint } from '@/shared/libs/react-hooks/useBreakpoint';
import { FailedState } from '@/widgets/failed-state';

import { useBrowserModel } from '../../model/browser';
import { useEmit } from '../../model/events';
import { useFilesystemModel } from '../../model/filesystem';
import FilesystemBrowser from '../_presentation/FilesystemBrowser';
import PathBreadcrumb from '../_presentation/PathBreadcrumb';

import { PlaceholderState } from './_Partials';

export default function Content() {
  const emit = useEmit();
  const mobileMode = !useBreakpoint('sm', false);

  const [selectedItem, searchQuery, viewMode] = useBrowserModel((s) => [
    s.selectedItem,
    s.searchQuery,
    s.viewMode,
  ]);
  const [registry, basePath, currentFullPath] = useFilesystemModel((s) => [
    s.registry,
    s.basePath,
    s.history.currentFullPath,
  ]);

  const [deferredSearchQuery, setDeferredSearchQuery] = useState('');

  if (!searchQuery && deferredSearchQuery) {
    setDeferredSearchQuery('');
  }

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setDeferredSearchQuery(searchQuery);
    }, 300);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [searchQuery]);

  const handleClickBrowserItem = (content: SchemaFilesystemContent) => {
    emit('#file-manager-sidepanel/browser-select-item', content);
  };

  const handleDoubleClickBrowserItem = (content: SchemaFilesystemContent) => {
    if (content.kind === 'folder') {
      emit(
        '#file-manager-sidepanel/filesystem-history-navigate-to',
        `${currentFullPath}/${content.name}`,
      );
    } else {
      emit('#file-manager-sidepanel/tool-selected-file-preview', null);
    }
  };

  const handleClickCopyPath = () => {
    emit('#file-manager-sidepanel/tool-current-path-copy', null);
  };

  const handleClickBrowserBackground = () => {
    emit('#file-manager-sidepanel/browser-select-item', null);
  };

  const handleClickFooterSegments = (newPath: string) => {
    emit('#file-manager-sidepanel/filesystem-history-navigate-to', newPath);
  };

  const elContent = iife(() => {
    if (!currentFullPath) {
      return <PlaceholderState variant="initial" />;
    }

    const currentFolderMeta = registry.get(currentFullPath);
    if (currentFolderMeta == null) {
      return <PlaceholderState variant="loading" />;
    }

    if (currentFolderMeta.status !== 'success') {
      return (
        <FailedState.WallCentered
          errorPayload={currentFolderMeta.error.message}
        />
      );
    }

    return (
      <FilesystemBrowser
        contents={currentFolderMeta.contents}
        searchQuery={deferredSearchQuery}
        selectedItem={selectedItem}
        viewMode={mobileMode ? 'grid' : viewMode}
        onItemClick={handleClickBrowserItem}
        onItemDoubleClick={handleDoubleClickBrowserItem}
        onClickBackground={handleClickBrowserBackground}
      />
    );
  });

  return (
    <div className="h-full rounded-tl-xl bg-card grid grid-rows-[1fr_auto] overflow-hidden">
      {elContent}

      <div className="min-h-12 border-t grid grid-cols-[1fr_auto] overflow-hidden overflow-x-auto w-full">
        <PathBreadcrumb
          basePath={basePath}
          selectedFileName={
            selectedItem?.kind === 'file' ? selectedItem.name : undefined
          }
          fullPath={currentFullPath || basePath}
          onClickSegments={handleClickFooterSegments}
          onClickCopy={handleClickCopyPath}
        />
      </div>
    </div>
  );
}

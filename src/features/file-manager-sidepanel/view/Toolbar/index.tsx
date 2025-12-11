import { useState } from 'react';

import {
  BellIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  DownloadIcon,
  EyeIcon,
  FolderPlusIcon,
  GridIcon,
  ListIcon,
  TrashIcon,
  UploadIcon,
} from 'lucide-react';

import { useBreakpoint } from '@/shared/libs/react-hooks/useBreakpoint';
import { SearchInput } from '@/shared/presentation/atoms/SearchInput';

import { useBrowserModel } from '../../model/browser';
import { useEmit } from '../../model/events';
import { useFilesystemModel } from '../../model/filesystem';
import type { ViewMode } from '../../rules/types';
import ToolbarButtonGroup from '../_presentation/Toolbar/ButtonGroup';

import DeletePopup from './DeletePopup';
import NewFolderPopup from './NewFolderPopup';
import OperationsPopup from './OperationsPopup';

export default function Toolbar() {
  const emit = useEmit();
  const mobileMode = !useBreakpoint('sm', false);

  const [refButtonDelete, setRefButtonDelete] =
    useState<HTMLButtonElement | null>(null);

  const [refButtonOperations, setRefButtonOperations] =
    useState<HTMLButtonElement | null>(null);

  const [refNewFolderPopup, setRefNewFolderPopup] =
    useState<HTMLButtonElement | null>(null);

  const [selectedItem, searchQuery, viewMode] = useBrowserModel((s) => [
    s.selectedItem,
    s.searchQuery,
    s.viewMode,
  ]);

  const [currentFullPath, canGoBack, canGoForward] = useFilesystemModel((s) => [
    s.history.currentFullPath,
    s.history.canGoBack,
    s.history.canGoForward,
  ]);

  const handleClickViewMode = (newViewMode: ViewMode) => {
    return () => {
      emit('#file-manager-sidepanel/browser-view-mode', newViewMode);
    };
  };

  const handleClickBack = () => {
    emit('#file-manager-sidepanel/filesystem-history-navigate', 'back');
  };

  const handleClickForward = () => {
    emit('#file-manager-sidepanel/filesystem-history-navigate', 'forward');
  };

  const handleClickPreview = () => {
    emit('#file-manager-sidepanel/tool-selected-file-preview', null);
  };

  const handleClickDownload = () => {
    emit('#file-manager-sidepanel/tool-selected-file-download', null);
  };

  const handleClickUpload = () => {
    emit('#file-manager-sidepanel/tool-current-path-upload', null);
  };

  return (
    <>
      <div className="flex items-center w-full overflow-hidden overflow-x-auto">
        <div className="w-full min-w-max flex items-center gap-4 px-2 py-3.5">
          <ToolbarButtonGroup
            actions={[
              {
                icon: ChevronLeftIcon,
                isDisabled: !canGoBack,
                onClick: handleClickBack,
              },
              {
                icon: ChevronRightIcon,
                isDisabled: !canGoForward,
                onClick: handleClickForward,
              },
            ]}
          />

          {!mobileMode && (
            <ToolbarButtonGroup
              actions={[
                {
                  isActive: viewMode === 'grid',
                  icon: GridIcon,
                  onClick: handleClickViewMode('grid'),
                },
                {
                  isActive: viewMode === 'table',
                  icon: ListIcon,
                  onClick: handleClickViewMode('table'),
                },
              ]}
            />
          )}

          <div className="grow shrink-0" />

          {selectedItem != null && (
            <ToolbarButtonGroup
              actions={[
                {
                  icon: EyeIcon,
                  isDisabled: selectedItem.kind !== 'file',
                  onClick: handleClickPreview,
                },
                {
                  icon: DownloadIcon,
                  isDisabled: selectedItem.kind !== 'file',
                  onClick: handleClickDownload,
                },
                {
                  ref: setRefButtonDelete,
                  icon: TrashIcon,
                  iconColor: 'danger',
                  isDisabled: false,
                },
              ]}
            />
          )}

          <div className="grow shrink-0" />

          <ToolbarButtonGroup
            actions={[
              {
                icon: UploadIcon,
                isDisabled: !currentFullPath,
                onClick: handleClickUpload,
              },
              {
                icon: FolderPlusIcon,
                isDisabled: !currentFullPath,
                ref: setRefNewFolderPopup,
              },
              {
                icon: BellIcon,
                ref: setRefButtonOperations,
              },
            ]}
          />
        </div>

        <SearchInput
          classNameWrapper="min-w-[200px]"
          value={searchQuery}
          onChange={(value) => {
            emit('#file-manager-sidepanel/browser-search-query', value);
          }}
        />
      </div>

      <DeletePopup refTarget={refButtonDelete} />
      <NewFolderPopup refTarget={refNewFolderPopup} />
      <OperationsPopup refTarget={refButtonOperations} />
    </>
  );
}

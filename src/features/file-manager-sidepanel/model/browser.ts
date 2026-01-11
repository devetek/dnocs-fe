import { useState } from 'react';

import type { SchemaFilesystemContent } from '@/entities/file-manager/rules/schema';

import buildSelector from '@/shared/libs/react-factories/buildSelector';

import type { FsOperationReport, ViewMode } from '../rules/types';

import { useSubscribe } from './events';
import { useFilesystemModel } from './filesystem';

export const [BrowserModelProvider, useBrowserModel] = buildSelector(
  'FileManagerSidepanelBrowserModel',
)(() => {
  const [selectedItem, setSelectedItem] = useState<
    SchemaFilesystemContent | null | undefined
  >();

  const [fsOperationReports, setFsOperationReports] = useState<
    FsOperationReport[]
  >([]);

  const [viewMode, setViewMode] = useState<ViewMode>('table');

  const [searchQuery, setSearchQuery] = useState('');

  const [currentFullPath] = useFilesystemModel((s) => [
    s.history.currentFullPath,
  ]);

  const [prevFullPath, setPrevFullPath] = useState(currentFullPath);

  if (prevFullPath !== currentFullPath) {
    setPrevFullPath(currentFullPath);
    setSelectedItem(null);
    setSearchQuery('');
  }

  useSubscribe('#file-manager-sidepanel/browser-select-item', setSelectedItem);

  useSubscribe('#file-manager-sidepanel/browser-search-query', setSearchQuery);

  useSubscribe('#file-manager-sidepanel/browser-view-mode', setViewMode);

  useSubscribe(
    '#file-manager-sidepanel/browser-fs-operation-add',
    (opReport) => {
      setFsOperationReports((prev) => [...prev, opReport]);
    },
  );

  useSubscribe(
    '#file-manager-sidepanel/browser-fs-operation-update',
    (opReport) => {
      setFsOperationReports((prev) => {
        const newList = [...prev];

        const targetIdx = newList.findIndex((item) => item.id === opReport.id);
        if (targetIdx < 0) return prev;

        newList[targetIdx] = opReport;
        return newList;
      });
    },
  );

  useSubscribe(
    '#file-manager-sidepanel/browser-fs-operation-update-status',
    (opStatusPayload) => {
      setFsOperationReports((prev) => {
        const newList = [...prev];

        const targetIdx = newList.findIndex(
          (item) => item.id === opStatusPayload.id,
        );
        if (targetIdx < 0) return prev;

        // SAFETY: TS fails to track the discriminated union member when spreading.
        // We are only updating 'status' (shared property), so the object remains valid.
        // @ts-expect-error TS2322
        newList[targetIdx] = {
          ...newList[targetIdx],
          status: opStatusPayload.status,
        };
        return newList;
      });
    },
  );

  return {
    viewMode,
    selectedItem,
    searchQuery,
    fsOperationReports,
  };
});

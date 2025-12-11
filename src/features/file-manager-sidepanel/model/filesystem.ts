import { useState } from 'react';

import { shallowEqual } from 'fast-equals';

import { useAuthLoggedIn } from '@/services/auth';

import type { FilesystemRegistry } from '@/entities/file-manager/rules/filesystem';

import { iife } from '@/shared/libs/browser/iife';
import buildSelector from '@/shared/libs/react-factories/buildSelector';

import type { FilesystemBrowserHistory } from '../rules/types';

import { useSubscribe } from './events';

export const [FilesystemModelProvider, useFilesystemModel] = buildSelector(
  'FileManagerSidepanelFilesystemModel',
)(() => {
  const { userProfile } = useAuthLoggedIn();

  const basePath = `/home/${userProfile.username}`;
  const eager = true;

  const [registry, setRegistryInternal] = useState<FilesystemRegistry>(
    new Map(),
  );

  const [history, setHistoryInternal] = useState<FilesystemBrowserHistory>({
    currentIndex: 0,
    stack: [basePath],
  });

  useSubscribe(
    '#file-manager-sidepanel/filesystem-[internal]-registry-update',
    setRegistryInternal,
  );

  useSubscribe(
    '#file-manager-sidepanel/filesystem-[internal]-registry-add',
    (payload) => {
      setRegistryInternal((prev) => {
        const newRegistry = new Map(prev);

        newRegistry.set(payload.fullPath, payload.entry);

        return newRegistry;
      });
    },
  );

  useSubscribe(
    '#file-manager-sidepanel/filesystem-[internal]-registry-remove',
    (payload) => {
      setRegistryInternal((prev) => {
        const newRegistry = new Map(prev);

        newRegistry.delete(payload.fullPath);

        return newRegistry;
      });
    },
  );

  useSubscribe(
    '#file-manager-sidepanel/filesystem-[internal]-history-update',
    (payload) => {
      setHistoryInternal((prev) => {
        if (shallowEqual(prev, payload)) return prev;
        return payload;
      });
    },
  );

  const canGoBack = history.currentIndex !== 0 && history.stack.length > 1;

  const canGoForward = iife(() => {
    if (history.currentIndex === -1) return false;

    const finalIndex = history.stack.length > 0 ? history.stack.length - 1 : 0;

    return history.currentIndex !== finalIndex;
  });

  return {
    basePath,
    eager,
    registry,
    history: {
      stack: history.stack,
      index: history.currentIndex,
      currentFullPath: history.stack.at(history.currentIndex),
      canGoBack,
      canGoForward,
    },
  };
});

import { useRef } from 'react';

import { iife } from '@/shared/libs/browser/fn';
import { excludeNully } from '@/shared/libs/browser/typeguards';
import useHandler from '@/shared/libs/react-hooks/useHandler';

import { useEmit, useSubscribe } from '../model/events';
import { useFilesystemModel } from '../model/filesystem';
import type { FilesystemBrowserHistory } from '../rules/types';

export default function useFilesystemHistoryUsecase() {
  const emit = useEmit();

  const [
    isEager,
    registry,
    basePath,
    currentHistoryIndex,
    currentHistoryStack,
    currentFullPath,
  ] = useFilesystemModel((s) => [
    s.eager,
    s.registry,
    s.basePath,
    s.history.index,
    s.history.stack,
    s.history.currentFullPath,
  ]);

  const refPrevHistoryIndex = useRef<number | undefined>(undefined);
  const refPrevFullPath = useRef<string | undefined>(undefined);

  const setHistory = useHandler(
    (newHistory: Partial<FilesystemBrowserHistory>) => {
      const newHistoryStack = newHistory.stack ?? currentHistoryStack;
      const newHistoryIndex = iife(() => {
        const index = newHistory.currentIndex ?? currentHistoryIndex;

        if (index !== -1) {
          return index;
        }

        return newHistoryStack.length < 1 ? 0 : newHistoryStack.length - 1;
      });
      const newFullPath = newHistoryStack.at(newHistoryIndex);

      const prevHistoryIndex = refPrevHistoryIndex.current;

      refPrevHistoryIndex.current = currentHistoryIndex;
      refPrevFullPath.current = currentFullPath;

      if (!isEager || !newFullPath) {
        emit('#file-manager-sidepanel/filesystem-[internal]-history-update', {
          stack: newHistoryStack,
          currentIndex: newHistoryIndex,
        });
        return;
      }

      const direction = iife<'back' | 'forward' | null>(() => {
        if (prevHistoryIndex != null) {
          if (prevHistoryIndex < newHistoryIndex) {
            return 'forward';
          }

          if (prevHistoryIndex > newHistoryIndex) {
            return 'back';
          }
        }

        return null;
      });

      // =============================================================================
      //   Task: Filter history stack with items to remove
      // =============================================================================

      const historyStackIndexToRemove = new Set<number>();

      const isDescendant = (p: string, base: string) => {
        return (
          p === base || p.startsWith(base.endsWith('/') ? base : base + '/')
        );
      };

      for (let i = 0; i < newHistoryStack.length; i++) {
        const stackItem = newHistoryStack[i];
        if (!stackItem) continue;

        if (
          !isDescendant(stackItem, newFullPath) ||
          stackItem === newFullPath
        ) {
          continue;
        }

        historyStackIndexToRemove.add(i);
      }

      const filteredHistoryStack = newHistoryStack
        .map((v, i) => {
          for (const removedIndex of historyStackIndexToRemove) {
            if (removedIndex === i) return null;
          }

          return v;
        })
        .filter(excludeNully)
        .filter((v, i, a) => v !== a[i - 1]);

      const proposedIndex = iife(() => {
        switch (direction) {
          case 'back':
            return newHistoryIndex;

          case 'forward':
            if (newHistoryIndex > filteredHistoryStack.length - 1) {
              return filteredHistoryStack.length - 1;
            }

            return newHistoryIndex;

          default:
            if (newHistoryIndex > filteredHistoryStack.length - 1) {
              return filteredHistoryStack.length - 1;
            }

            return newHistoryIndex;
        }
      });

      emit('#file-manager-sidepanel/filesystem-[internal]-history-update', {
        stack: filteredHistoryStack,
        currentIndex: proposedIndex,
      });

      // =============================================================================
      //   Task: Clean up registry of removed history stack items
      // =============================================================================

      const newRegistry = new Map(registry);

      const keysToDelete = [...newRegistry]
        .map(([key]) => key)
        .filter((key) => !filteredHistoryStack.includes(key))
        .filter((key) => key !== basePath);

      for (const key of keysToDelete) {
        newRegistry.delete(key);
      }

      emit(
        '#file-manager-sidepanel/filesystem-[internal]-registry-update',
        newRegistry,
      );
    },
  );

  useSubscribe(
    '#file-manager-sidepanel/filesystem-history-navigate-to',
    (newFullPath) => {
      if (currentFullPath === newFullPath) return;

      let newHistoryStack = [...currentHistoryStack];

      if (
        currentHistoryIndex === -1 ||
        currentHistoryIndex === currentHistoryStack.length - 1
      ) {
        newHistoryStack = [...newHistoryStack, newFullPath];
      } else {
        newHistoryStack = [...newHistoryStack].slice(
          0,
          currentHistoryIndex + 1,
        );
        newHistoryStack = [...newHistoryStack, newFullPath];
      }

      setHistory({
        currentIndex: newHistoryStack.length - 1,
        stack: newHistoryStack,
      });
    },
  );

  useSubscribe(
    '#file-manager-sidepanel/filesystem-history-navigate',
    (direction) => {
      switch (direction) {
        case 'back': {
          if (currentHistoryIndex === 0) return;

          let newIndex = currentHistoryIndex;

          if (newIndex < 0) {
            newIndex = currentHistoryStack.length - 1;
          }

          setHistory({
            currentIndex: newIndex - 1,
          });
          break;
        }

        case 'forward': {
          if (
            currentHistoryIndex === -1 ||
            currentHistoryIndex >= currentHistoryStack.length - 1
          )
            return;

          setHistory({
            currentIndex: currentHistoryIndex + 1,
          });
          break;
        }
      }
    },
  );
}

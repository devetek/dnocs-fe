import { useEffect } from 'react';

import { AdapterFileManagerFromDto } from '@/entities/file-manager/adapter';
import type { FilesystemRegistryEntry } from '@/entities/file-manager/rules/filesystem';

import type { DTOs } from '@/shared/api';
import { ApiFolder } from '@/shared/api';
import { processError } from '@/shared/libs/api-client/lib/processor';
import type { ApiClientResponse } from '@/shared/libs/api-client/rules/types';
import useHandler from '@/shared/libs/react-hooks/useHandler';

import { useCommonModel } from '../model/common';
import { useEmit, useSubscribe } from '../model/events';
import { useFilesystemModel } from '../model/filesystem';

export default function useFilesystemWatchUsecase() {
  const emit = useEmit();

  const [serverId] = useCommonModel((s) => [s.serverId]);

  const [basePath, eager, currentFullPath, registry] = useFilesystemModel(
    (s) => [s.basePath, s.eager, s.history.currentFullPath, s.registry],
  );

  const checkHasLoaded = useHandler((fullPath: string) => {
    const found = registry.get(fullPath);
    return found && found.status === 'success';
  });

  const mapResponse = useHandler(
    (
      response: ApiClientResponse<DTOs.FolderOrigin[]>,
    ): FilesystemRegistryEntry => {
      try {
        if (response.$status !== 'success') {
          return {
            status: 'failed',
            ...response,
          };
        }

        return {
          status: 'success',
          contents: response.map((content) =>
            AdapterFileManagerFromDto.toFilesystemContent(content).unwrap(),
          ),
        };
      } catch (error) {
        return {
          status: 'failed',
          ...processError(error),
        };
      }
    },
  );

  useEffect(() => {
    ApiFolder.Origin.$ServerId
      .fetchGet({
        basePath,
        serverId: serverId,
      })
      .then(mapResponse)
      .then((mappedResponse) => {
        emit('#file-manager-sidepanel/filesystem-[internal]-registry-add', {
          fullPath: basePath,
          entry: mappedResponse,
        });
      });
  }, [serverId, basePath, emit, mapResponse]);

  useSubscribe(
    '#file-manager-sidepanel/filesystem-history-navigate-refresh',
    () => {
      if (!currentFullPath) return;

      ApiFolder.Origin.$ServerId
        .fetchGet({
          basePath: currentFullPath,
          serverId,
        })
        .then(mapResponse)
        .then((mappedResponse) => {
          emit('#file-manager-sidepanel/filesystem-[internal]-registry-add', {
            entry: mappedResponse,
            fullPath: currentFullPath,
          });
        });
    },
  );

  useEffect(() => {
    if (!currentFullPath || (!eager && checkHasLoaded(currentFullPath))) return;

    ApiFolder.Origin.$ServerId
      .fetchGet({
        basePath: currentFullPath,
        serverId,
      })
      .then(mapResponse)
      .then((mappedResponse) => {
        emit('#file-manager-sidepanel/filesystem-[internal]-registry-add', {
          entry: mappedResponse,
          fullPath: currentFullPath,
        });
      });
  }, [checkHasLoaded, currentFullPath, eager, emit, mapResponse, serverId]);
}

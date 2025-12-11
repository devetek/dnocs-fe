import dayjs from 'dayjs';

import { useAuthLoggedIn } from '@/services/auth';
import { useToaster } from '@/services/toaster';

import {
  LS_ORGANIZATION_ID,
  X_AUTH_ORGANIZATION_ID,
} from '@/shared/libs/api-client/config';
import { apiClient } from '@/shared/libs/api-client/lib/client';
import { openUploadDialog } from '@/shared/libs/browser/upload-dialog';

import { useBrowserModel } from '../model/browser';
import { useCommonModel } from '../model/common';
import { useEmit, useSubscribe } from '../model/events';
import { useFilesystemModel } from '../model/filesystem';

export default function useToolsActionsUsecase() {
  const [pushToast] = useToaster();

  const emit = useEmit();

  const { userProfile } = useAuthLoggedIn();

  const [serverId, onPreviewFile] = useCommonModel((s) => [
    s.serverId,
    s.onPreviewFile,
  ]);

  const [currentFullPath] = useFilesystemModel((s) => [
    s.history.currentFullPath,
  ]);

  const [selectedItem] = useBrowserModel((s) => [s.selectedItem]);

  useSubscribe('#file-manager-sidepanel/tool-current-path-copy', async () => {
    if (!currentFullPath) return;

    try {
      const toWrite =
        selectedItem != null
          ? `${currentFullPath}/${selectedItem.name}`
          : currentFullPath;

      await navigator.clipboard.writeText(toWrite);

      pushToast({
        variant: 'info',
        message: 'Copied full path to clipboard.',
      });
    } catch (error) {
      pushToast({
        variant: 'error',
        title: 'Failed to copy full path to clipboard!',
        message: error instanceof Error ? error.message : String(error),
      });
    }
  });

  useSubscribe('#file-manager-sidepanel/tool-current-path-upload', async () => {
    const uploadDialogResult = await openUploadDialog({
      allowMultiple: true,
    });

    if (!uploadDialogResult.ok) {
      if (uploadDialogResult.err.reason === 'closed') return;

      pushToast({
        variant: 'error',
        title: 'Failed to select files to upload!',
        message: uploadDialogResult.err.error.message,
      });
      return;
    }

    const wrappedFormPackage = uploadDialogResult.data.map((file) => {
      const id = String(Math.floor(Math.random() * 1_000_000));

      const form = new FormData();

      form.append('username', userProfile.username);
      form.append('file', file);

      return [id, file.name, form] as const;
    });

    for (const formPkg of wrappedFormPackage) {
      const [currentId, fileName, currentFormData] = formPkg;

      const xhr = new XMLHttpRequest();

      const onError = () => {
        emit('#file-manager-sidepanel/browser-fs-operation-update-status', {
          id: currentId,
          timestamp: dayjs().format(),
          status: 'failed',
        });
      };

      xhr.onload = () => {
        if (xhr.status !== 200) {
          onError();
          return;
        }

        emit(
          '#file-manager-sidepanel/filesystem-history-navigate-refresh',
          null,
        );
        emit('#file-manager-sidepanel/browser-fs-operation-update-status', {
          id: currentId,
          timestamp: dayjs().format(),
          status: 'done',
        });
      };

      xhr.onerror = onError;

      xhr.open(
        'post',
        `${import.meta.env.VITE_BACKEND}/v1/folder/origin/${serverId}/upload?workdir=${currentFullPath}&username=${userProfile.username}`,
        true,
      );

      xhr.withCredentials = true;

      xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

      const organizationId = localStorage.getItem(LS_ORGANIZATION_ID) || null;

      if (organizationId) {
        xhr.setRequestHeader(X_AUTH_ORGANIZATION_ID, organizationId);
      }

      emit('#file-manager-sidepanel/browser-fs-operation-add', {
        operationKind: 'upload',
        id: currentId,
        timestamp: dayjs().format(),
        status: 'loading',
        fileName,
      });

      xhr.send(currentFormData);
    }
  });

  useSubscribe(
    '#file-manager-sidepanel/tool-current-path-folder-new',
    async (payload) => {
      if (!currentFullPath) return;

      const { folderName, permissionCode } = payload;

      const operationId = String(Math.floor(Math.random() * 1_000_000));

      emit('#file-manager-sidepanel/browser-fs-operation-add', {
        operationKind: 'folder_new',
        id: operationId,
        folderName,
        status: 'loading',
        timestamp: dayjs().format(),
      });

      const response = await apiClient({
        url: `v2/folder/origin/${serverId}/create`,
        method: 'POST',
        data: {
          name: folderName,
          type: 'folder',
          path: currentFullPath,
          permission: permissionCode,
        },
      });

      if (response.$status === 'failed') {
        emit('#file-manager-sidepanel/browser-fs-operation-update-status', {
          id: operationId,
          status: 'failed',
          timestamp: dayjs().format(),
        });

        pushToast({
          variant: 'error',
          title: `Failed to create folder named "${folderName}"!`,
          message: response.error.message,
        });
        return;
      }

      emit('#file-manager-sidepanel/browser-fs-operation-update-status', {
        id: operationId,
        status: 'done',
        timestamp: dayjs().format(),
      });

      emit('#file-manager-sidepanel/filesystem-history-navigate-refresh', null);
    },
  );

  useSubscribe('#file-manager-sidepanel/tool-selected-file-download', () => {
    if (!selectedItem || !currentFullPath || selectedItem.kind === 'folder')
      return;

    window.open(
      `${import.meta.env.VITE_BACKEND}/v1/folder/origin/${serverId}/download?workdir=${currentFullPath}&file=${selectedItem.name}`,
      '_blank',
    );
  });

  useSubscribe('#file-manager-sidepanel/tool-selected-file-preview', () => {
    if (!selectedItem || !currentFullPath || selectedItem.kind === 'folder')
      return;

    onPreviewFile?.(currentFullPath, selectedItem);
  });

  useSubscribe(
    '#file-manager-sidepanel/tool-selected-item-delete',
    async () => {
      if (!selectedItem || !currentFullPath) return;

      const operationId = String(Math.floor(Math.random() * 1_000_000));

      emit('#file-manager-sidepanel/browser-fs-operation-add', {
        operationKind: 'delete',
        fsKind: selectedItem.kind,
        id: operationId,
        itemName: selectedItem.name,
        status: 'loading',
        timestamp: dayjs().format(),
      });

      const response = await apiClient({
        url: `v2/folder/origin/${serverId}/delete`,
        method: 'POST',
        data: {
          name: selectedItem.name,
          path: currentFullPath,
        },
      });

      if (response.$status === 'failed') {
        emit('#file-manager-sidepanel/browser-fs-operation-update-status', {
          id: operationId,
          status: 'failed',
          timestamp: dayjs().format(),
        });

        pushToast({
          variant: 'error',
          title: `Failed to delete ${selectedItem.name}!`,
          message: response.error.message,
        });
        return;
      }

      emit('#file-manager-sidepanel/browser-fs-operation-update-status', {
        id: operationId,
        status: 'done',
        timestamp: dayjs().format(),
      });

      emit('#file-manager-sidepanel/filesystem-history-navigate-refresh', null);
    },
  );
}

import { useMemo } from 'react';

import { ApiFolder } from '@/shared/api';
import { useAdapter } from '@/shared/libs/api-client';
import buildSelector from '@/shared/libs/react-factories/buildSelector';

import { FILEMATCH_REGISTRY } from '../config';
import type { FilePreviewSidepanelProps as Props } from '../rules/types';

import { useSubscribe } from './events';

export const [PreviewModelProvider, usePreviewModel] = buildSelector(
  'FileManagerSidepanelPreviewModel',
)((props: Props) => {
  const { serverId, selectedFile, selectedFileFullPath } = props;

  const matchedConfig = useMemo(() => {
    for (const [k, v] of Object.entries(FILEMATCH_REGISTRY)) {
      const matcher = new RegExp(k);

      if (matcher.test(selectedFile.name)) {
        return v;
      }
    }
  }, [selectedFile.name]);

  const [responseFileContent, getFileContent] =
    ApiFolder.Origin.$ServerId.Content.useGet({
      serverId,
      fileFullName: selectedFile.name,
      fullFolderPath: selectedFileFullPath,
      options: {
        skip: !matchedConfig,
      },
    });

  useSubscribe('#file-preview-sidepanel/preview-get', () => {
    getFileContent();
  });

  const fileContent = useAdapter(responseFileContent, (raw) => {
    return {
      content: raw.content,
    };
  });

  return {
    fileContent,
    matchedConfig,
  };
});

import { useMemo, useState } from 'react';

import { ApiFolder } from '@/shared/api';
import { excludeNully } from '@/shared/libs/browser/typeguards';
import { buildContext } from '@/shared/libs/react-factories/buildContext';

import type { LogBrowserModalProps } from './types';

export const [LogListRepoProvider, useLogListRepo] = buildContext(
  'LogListRepo',
  (props: LogBrowserModalProps) => {
    const { machineID: initialMachineID, appName, userName } = props;

    const [searchQuery, setSearchQuery] = useState('');
    const [selectedMachineID, setSelectedMachineID] = useState(initialMachineID);

    const [responseFolderOrigin] = ApiFolder.Origin.$ServerId.useGet({
      serverId: String(selectedMachineID),
      basePath: `/home/${userName}/logs/${appName}`,
    });

    const logFiles = useMemo(() => {
      if (responseFolderOrigin.$status !== 'success') return [];

      return responseFolderOrigin
        .filter((value) => value.name?.includes(searchQuery))
        .filter((value) => !value.name?.includes('build-artifact'))
        .map((file) => {
          if (!file.name || file.is_dir) return null;

          return {
            name: file.name,
          };
        })
        .filter(excludeNully);
    }, [responseFolderOrigin, searchQuery]);

    return {
      searchQuery,
      setSearchQuery,
      logFiles,
      selectedMachineID,
      setSelectedMachineID,
    };
  },
);

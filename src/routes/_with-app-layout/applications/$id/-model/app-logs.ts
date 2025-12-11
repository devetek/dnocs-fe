import { useState } from 'react';

import type { SchemaCommon } from '@/entities/shared/rules/schema';

import { ApiServer } from '@/shared/api';
import buildSelector from '@/shared/libs/react-factories/buildSelector';

import { useAppDataModel } from './app-data';
import { useArtifactHistoryModel } from './artifact-history';

export const [AppLogsModelProvider, useAppLogsModel] = buildSelector(
  'AppLogsModel',
)(() => {
  const appDetail = useAppDataModel((s) => s.appDetail);
  const [lastDeployment, artifactHistory] = useArtifactHistoryModel((s) => [
    s.lastDeployment,
    s.artifactHistory,
  ]);

  const [logFilename, setLogFilename] = useState<string>();
  const [logMetadata, setLogMetadata] = useState<{
    serverId: SchemaCommon.UnitId;
    userName: string;
    appName: string;
  }>();

  if (
    appDetail.$status === 'success' &&
    artifactHistory.$status === 'success'
  ) {
    const serverId = lastDeployment?.pointerIds.machine;
    const userName = appDetail.ownership.owner;
    const appName: string | undefined =
      artifactHistory.list[0]?.configSnapshot.lifecycle.run.name;

    if (!logFilename && logMetadata) {
      setLogMetadata(undefined);
    } else if (logFilename && !logMetadata) {
      if (appName && serverId && userName) {
        setLogMetadata({
          serverId,
          userName,
          appName,
        });
      }
    }
  }

  const [responseLog] = ApiServer.Detail.$Id.Log.useGet({
    serverId: logMetadata?.serverId,
    file: logMetadata
      ? `/home/${logMetadata.userName}/logs/${logMetadata.appName}/${logFilename}`
      : undefined,
    line: 100,
    options: {
      skip: !logMetadata || !logFilename,
      refreshIntervalMs: 5000,
    },
  });

  return {
    log: responseLog,
    logMetadata,
    logFilename,
    setLogFilename,
  };
});

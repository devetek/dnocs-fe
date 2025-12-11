import { useState } from 'react';

import { ModalLayoutGeneral } from '@/services/modal/ui/presentation';

import { ApiServer } from '@/shared/api';

import type { ArtifactLogsModalProps } from '../rules/types';

import LogViewer from './LogViewer';

const Content = (props: ArtifactLogsModalProps) => {
  const { serverId, appName, userName, artifactId } = props;

  const [buffer, setBuffer] = useState<string>('');

  const [responseLog] = ApiServer.Origin.$Id.Log.useGet({
    serverId,
    file: `/home/${userName}/logs/${appName}/build-artifact-${artifactId}.log`,
    line: 1000,
    options: {
      refreshIntervalMs: 2000,
    },
  });

  if (responseLog.$status === 'success') {
    const newBuffer = responseLog.join('\n');

    if (newBuffer !== buffer) {
      setBuffer(newBuffer);
    }
  }

  return <LogViewer log={buffer} />;
};

export default function ArtifactLogsModal(props: ArtifactLogsModalProps) {
  const { commitHead } = props;

  return (
    <ModalLayoutGeneral maxWidth="1280px">
      <ModalLayoutGeneral.Title
        canClickClose
        title="Artifact Logs"
        description={`Commit ${commitHead}`}
      />

      <ModalLayoutGeneral.Content>
        <Content {...props} />
      </ModalLayoutGeneral.Content>
    </ModalLayoutGeneral>
  );
}

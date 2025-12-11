import { useArtifactLogsModal } from '@/features/artifact-logs-modal';
import { useItemStatusLogModal } from '@/features/item-status-log-modal';

import { useEmit } from '../../-model/events';

import { mapDeploymentStatus } from './_lib';
import { ArtifactCard } from './_presentation';
import type { ArtifactsHistoryListProps } from './types';

export function ArtifactsHistoryList(props: ArtifactsHistoryListProps) {
  const { appOwner, list, lastDeployment, selectedServerId } = props;

  const emit = useEmit();

  const [openArtifactLogsModal] = useArtifactLogsModal();
  const [openItemStatusLogModal] = useItemStatusLogModal();

  return list.map((artifact) => {
    const deploymentStatus = mapDeploymentStatus({
      artifact,
      lastDeployment,
    });

    const handleClickLogs = () => {
      openArtifactLogsModal({
        artifactId: artifact.id,
        serverId: selectedServerId,
        commitHead: artifact.commitMetadata.head,
        appName: artifact.configSnapshot.lifecycle.run.name,
        userName: appOwner,
      });
    };

    const handleClickStatus = () => {
      openItemStatusLogModal({
        logTopicTitle: 'Artifact',
        logTopicMessage: `Commit ${artifact.commitMetadata.head.slice(0, 7)}`,
        mainLogs: `Status: ${deploymentStatus}`,
        additionalLogs: artifact.state.message,
      });
    };

    const handleClickDelete = () => {
      if (lastDeployment.pointerIds.artifact === artifact.id) {
        emit('@applications::detail/deployment-delete', {
          deploymentId: lastDeployment.id,
        });
      } else {
        emit('@applications::detail/artifact-delete', {
          artifactId: artifact.id,
        });
      }
    };

    const handleClickCancel = () => {
      emit('@applications::detail/artifact-progress-cancel', {
        commitHead: artifact.commitMetadata.head,
        serverId: selectedServerId,
      });
    };

    const handleClickRollback = () => {
      emit('@applications::detail/artifact-rollback', {
        commitHead: artifact.commitMetadata.head,
        artifactId: artifact.id,
      });
    };

    return (
      <ArtifactCard
        key={artifact.id}
        data={artifact}
        deploymentStatus={deploymentStatus}
        onClickLogs={handleClickLogs}
        onClickStatus={handleClickStatus}
        onClickDelete={handleClickDelete}
        onClickCancel={handleClickCancel}
        onClickRollback={handleClickRollback}
      />
    );
  });
}

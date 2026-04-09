import { useArtifactLogsModal } from '@/features/artifact-logs-modal';
import { useItemStatusLogModal } from '@/features/item-status-log-modal';

import { useAppDataModel } from '../../-model/app-data';
import { useEmit } from '../../-model/events';

import { ArtifactCard } from './_presentation';
import type { ArtifactsHistoryListProps } from './types';

export function ArtifactsHistoryList(props: ArtifactsHistoryListProps) {
  const { appOwner, list } = props;

  const emit = useEmit();
  const selectedServerId = useAppDataModel((s) => s.selectedServerId);

  const [openArtifactLogsModal] = useArtifactLogsModal();
  const [openItemStatusLogModal] = useItemStatusLogModal();

  return list.map((artifact) => {
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
        mainLogs: `Status: ${artifact.state.status}`,
        additionalLogs: artifact.state.message,
      });
    };

    const handleClickDelete = () => {
      emit('@applications::detail/artifact-delete', {
        artifactId: artifact.id,
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
        onClickLogs={handleClickLogs}
        onClickStatus={handleClickStatus}
        onClickDelete={handleClickDelete}
        onClickRollback={handleClickRollback}
      />
    );
  });
}

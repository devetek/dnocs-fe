import { useArtifactLogsModal } from '@/features/artifact-logs-modal';
import { useItemStatusLogModal } from '@/features/item-status-log-modal';

import { useAppDataModel } from '../../-model/app-data';
import { useEmit } from '../../-model/events';

import { ArtifactCard } from './_presentation';
import type { ArtifactsHistoryListProps } from './types';

export function ArtifactsHistoryList(props: ArtifactsHistoryListProps) {
  const { appOwner, list, deploymentList } = props;

  const emit = useEmit();
  const selectedServerId = useAppDataModel((s) => s.selectedServerId);

  const [openArtifactLogsModal] = useArtifactLogsModal();
  const [openItemStatusLogModal] = useItemStatusLogModal();

  return list.map((artifact) => {
    const openLogsForMachine = (machineId: string) => {
      openArtifactLogsModal({
        artifactId: artifact.id,
        serverId: machineId,
        commitHead: artifact.commitMetadata.head,
        appName: artifact.configSnapshot.lifecycle.run.name,
        userName: appOwner,
      });
    };

    const related = deploymentList.filter(
      (d) => d.pointerIds.artifact === artifact.id,
    );

    const logsOptions =
      related.length > 1
        ? related.map((d) => ({
            label: d.serverSnapshot.hostName,
            machineId: d.pointerIds.machine,
            onClick: () => openLogsForMachine(d.pointerIds.machine),
          }))
        : undefined;

    const handleClickLogs = () => {
      if (related.length === 0) {
        if (selectedServerId) openLogsForMachine(selectedServerId);
        return;
      }
      const machine = related[0]?.pointerIds.machine;
      if (machine) openLogsForMachine(machine);
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
        applicationId: artifact.pointerIds.application,
      });
    };

    const isUsed = related.length > 0;
    const isDeploying = related.some((d) => d.state.status === 'progress');

    return (
      <ArtifactCard
        key={artifact.id}
        data={artifact}
        isUsed={isUsed}
        isDeploying={isDeploying}
        onClickLogs={handleClickLogs}
        logsOptions={logsOptions}
        onClickStatus={handleClickStatus}
        onClickDelete={handleClickDelete}
        onClickRollback={handleClickRollback}
      />
    );
  });
}

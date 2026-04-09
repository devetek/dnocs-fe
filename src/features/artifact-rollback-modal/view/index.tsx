import { useState } from 'react';

import { useModalEmit } from '@/services/modal/model/event';
import { ModalLayoutGeneral } from '@/services/modal/ui/presentation';
import { useToaster } from '@/services/toaster';

import { ApiDeploy } from '@/shared/api';
import { Button } from '@/shared/presentation/atoms/Button';
import { Checkbox } from '@/shared/presentation/atoms/Checkbox';

import type { ArtifactRollbackModalProps as Props } from './types';

export default function ArtifactRollbackModal(props: Props) {
  const { commitHead, artifactId, applicationId, deploymentTargets, onSuccess } =
    props;

  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(false);

  const emitModal = useModalEmit();
  const [openToaster] = useToaster();

  const toggleId = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleConfirm = async () => {
    setIsLoading(true);

    let successCount = 0;

    for (const serverId of selectedIds) {
      const hostname =
        deploymentTargets.find((t) => t.id === serverId)?.hostname ?? serverId;

      const response = await ApiDeploy.Create.doPost({
        applicationId,
        artifactId,
        workerId: serverId,
      });

      if (response.$status === 'success') {
        successCount++;
      } else {
        openToaster({
          variant: 'error',
          title: `Failed to rollback on "${hostname}"`,
          message: response.error.message,
        });
      }
    }

    setIsLoading(false);

    if (successCount > 0) {
      openToaster({
        variant: 'success',
        message: `Successfully rolled back to "${commitHead.slice(0, 7)}" on ${successCount} server(s).`,
      });
      emitModal('%%modal/close', null);
      onSuccess();
    }
  };

  return (
    <ModalLayoutGeneral>
      <ModalLayoutGeneral.Title
        canClickClose={!isLoading}
        title="Rollback Deployment"
        description={`Select servers to rollback to commit "${commitHead.slice(0, 7)}"`}
      />

      <ModalLayoutGeneral.Content className="flex flex-col gap-2">
        {deploymentTargets.map((target) => (
          <label
            key={target.id}
            className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-black/5 dark:hover:bg-white/5"
          >
            <Checkbox
              checked={selectedIds.has(target.id)}
              onCheckedChange={() => toggleId(target.id)}
              disabled={isLoading}
            />
            <span className="text-sm font-medium">{target.hostname}</span>
          </label>
        ))}

        <Button
          className="mt-2 w-full"
          disabled={selectedIds.size === 0 || isLoading}
          onClick={handleConfirm}
        >
          {isLoading ? 'Rolling back...' : 'Rollback'}
        </Button>
      </ModalLayoutGeneral.Content>
    </ModalLayoutGeneral>
  );
}

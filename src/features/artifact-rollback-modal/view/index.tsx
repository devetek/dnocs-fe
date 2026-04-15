import { useMemo, useState } from 'react';

import { useModalEmit } from '@/services/modal/model/event';
import { ModalLayoutGeneral } from '@/services/modal/ui/presentation';
import { useToaster } from '@/services/toaster';

import { AdapterCicdDeploymentFromDto } from '@/entities/cicd-deployment/adapter';

import { ApiDeploy } from '@/shared/api';
import { useAdapter } from '@/shared/libs/api-client';
import { excludeNully } from '@/shared/libs/browser/typeguards';
import { Button } from '@/shared/presentation/atoms/Button';
import { Checkbox } from '@/shared/presentation/atoms/Checkbox';
import { Pagination } from '@/shared/presentation/atoms/Pagination';
import Shimmer from '@/shared/presentation/atoms/Shimmer';

import type { ArtifactRollbackModalProps as Props } from './types';

const PER_PAGE = 3;

export default function ArtifactRollbackModal(props: Props) {
  const { commitHead, artifactId, applicationId, onSuccess } = props;

  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);

  const emitModal = useModalEmit();
  const [openToaster] = useToaster();

  const [responseDeployments] = ApiDeploy.Find.useGet({
    applicationId,
    page,
    limit: PER_PAGE,
  });

  const deployments = useAdapter(responseDeployments, (raw) => {
    const list = (raw.deploys ?? [])
      .map((d) => AdapterCicdDeploymentFromDto.toCicdDeployment(d).okay())
      .filter(excludeNully);

    return { list, pagination: raw.pagination };
  });

  const targets = useMemo(() => {
    if (deployments.$status !== 'success') return [];
    return deployments.list.map((d) => ({
      id: d.pointerIds.machine,
      hostname: d.serverSnapshot.hostName,
    }));
  }, [deployments]);

  const totalPage = useMemo(() => {
    if (deployments.$status !== 'success') return 1;
    return Math.max(1, deployments.pagination?.total_page ?? 1);
  }, [deployments]);

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
        targets.find((t) => t.id === serverId)?.hostname ?? serverId;

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
        {deployments.$status === 'loading' && (
          <>
            <Shimmer className="h-12 w-full rounded-lg" />
            <Shimmer className="h-12 w-full rounded-lg" />
            <Shimmer className="h-12 w-full rounded-lg" />
          </>
        )}

        {deployments.$status === 'success' && targets.length === 0 && (
          <p className="text-sm text-muted-foreground italic text-center py-4">No active deployments found</p>
        )}

        {targets.map((target) => (
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

        {totalPage > 1 && (
          <Pagination
            currentPage={page}
            maxPage={totalPage}
            onPageChange={setPage}
          />
        )}

        <Button
          className="mt-2 w-full"
          disabled={selectedIds.size === 0 || isLoading || deployments.$status !== 'success'}
          onClick={handleConfirm}
        >
          {isLoading ? 'Rolling back...' : 'Rollback'}
        </Button>
      </ModalLayoutGeneral.Content>
    </ModalLayoutGeneral>
  );
}

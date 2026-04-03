import dayjs from 'dayjs';

import { useCloudProjectDetailModal } from '@/features/cloud-project-detail-modal';

import { useBreakpoint } from '@/shared/libs/react-hooks/useBreakpoint';
import LayoutAutoGridList from '@/shared/presentation/atoms/LayoutAutoGridList';
import { EmptyState } from '@/shared/presentation/organisms/EmptyState';

import useDeleteCloudProjectDialog from '../../-lib/useDeleteCloudProjectDialog';
import { useCloudData } from '../../-model/cloud-data';
import { useFilter } from '../../-model/filters';
import { CloudListState } from '../-presentation/CloudListState';

import CloudCard from './CloudCard';

export default function MainList() {
  const { response, refresh } = useCloudData();
  const { viewMode } = useFilter();

  const isDesktop = useBreakpoint('lg');
  const derivedViewMode: 'grid' | 'list' =
    viewMode === 'auto' ? (isDesktop ? 'list' : 'grid') : viewMode;

  const [openDetailModal] = useCloudProjectDetailModal();
  const [handleClickDeleteCloudProject] = useDeleteCloudProjectDialog(() => {
    refresh();
  });

  if (response.$status === 'failed') {
    return <CloudListState.Error error={response.error} />;
  }

  if (response.$status !== 'success') {
    return <CloudListState.Loading />;
  }

  const { clouds } = response;

  if (clouds.length < 1) {
    return (
      <EmptyState
        title="No cloud accounts connected"
        message="Connect your first cloud provider account to start managing resources like virtual machines and networks directly from dNocs."
        ctaText="Connect Cloud Account"
      />
    );
  }

  return (
    <LayoutAutoGridList viewMode={viewMode}>
      {clouds.map((cloud) => {
        const { id, name, provider, updated_at } = cloud;
        if (!id) return null;

        const lastUpdated = updated_at
          ? dayjs(updated_at).format('YYYY-MM-DD HH:mm:ss')
          : null;

        return (
          <CloudCard
            key={id}
            data={{ name, provider, lastUpdated }}
            variant={derivedViewMode === 'grid' ? 'compact' : 'full'}
            onClickDetails={() =>
              openDetailModal({
                cloudProjectId: String(id),
                cloudProjectName: name ?? '',
              })
            }
            onClickDelete={() =>
              handleClickDeleteCloudProject(id, name ?? String(id))
            }
          />
        );
      })}
    </LayoutAutoGridList>
  );
}

import dayjs from 'dayjs';

import { useCloudProjectCreateModal } from '@/features/cloud-project-create-modal';
import { useCloudProjectDetailModal } from '@/features/cloud-project-detail-modal';

import { ApiCloud } from '@/shared/api';
import { FlexGrid } from '@/shared/presentation/atoms/FlexGrid';
import { Pagination } from '@/shared/presentation/atoms/Pagination';
import { Spinner } from '@/shared/presentation/atoms/Spinner';
import { FailedState } from '@/widgets/failed-state';

import useDeleteCloudProjectDialog from '../../-lib/useDeleteCloudProjectDialog';
import { useFilter } from '../../-model/filters';
import { AddNewCard } from '../../-presentation/AddNewCard';
import { CloudProjectCard } from '../../-presentation/CloudProjectCard';

export default function GridList() {
  const { searchQuery, pagination, setPagination } = useFilter();

  const [response, refresh] = ApiCloud.Project.Find.useGet({
    page: 1,
    searchQuery,
  });

  const [openCreationModal] = useCloudProjectCreateModal();
  const [openDetailModal] = useCloudProjectDetailModal();

  const [handleClickDeleteCloudProject] = useDeleteCloudProjectDialog(() => {
    refresh();
  });

  if (response.$status === 'failed') {
    return <FailedState.WallCentered errorPayload={response.error.message} />;
  }

  if (response.$status !== 'success') {
    return (
      <div className="w-full flex justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <>
      <div className="flex justify-end items-center gap-2">
        <div>
          <Pagination
            currentPage={pagination}
            maxPage={response.pagination.total_page}
            onPageChange={(newPage) => setPagination(newPage)}
          />
        </div>
      </div>

      <br />

      <FlexGrid gridItemsMax={4}>
        <AddNewCard
          onClick={() => {
            openCreationModal({
              onSubmitSuccess: () => {
                refresh();
              },
            });
          }}
        />

        {response.clouds.map((cloud) => {
          const { id, name, provider, updated_at } = cloud;

          if (!id || !updated_at || !name) return null;

          const lastUpdatedFormatted = dayjs(updated_at).format(
            'YYYY-MM-DD HH:mm:ss',
          );

          return (
            <CloudProjectCard
              key={id}
              cloudProvider={provider}
              projectName={name}
              lastUpdatedFormatted={lastUpdatedFormatted}
              onClickDelete={() => handleClickDeleteCloudProject(id, name)}
              onClickDetails={() =>
                openDetailModal({
                  cloudProjectId: String(id),
                  cloudProjectName: name,
                })
              }
            />
          );
        })}
      </FlexGrid>
    </>
  );
}

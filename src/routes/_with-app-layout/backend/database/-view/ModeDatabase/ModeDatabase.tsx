import { useNavigate } from '@tanstack/react-router';
import dayjs from 'dayjs';

import { useAuthLoggedIn } from '@/services/auth';

import { useDbCreateModal } from '@/features/db-create-modal';

import { ApiDatabase } from '@/shared/api';
import type { RecipeParams as ApiDatabaseFindParams } from '@/shared/api/database.find';
import { FlexGrid } from '@/shared/presentation/atoms/FlexGrid';
import { Pagination } from '@/shared/presentation/atoms/Pagination';
import { Spinner } from '@/shared/presentation/atoms/Spinner';
import { FailedState } from '@/widgets/failed-state';

import useHandleDeleteDB from '../../-model/handle-delete-db';
import { useFilters } from '../../-model/store/filters';
import { AddNewCard, DbInfoCard } from '../../-presentation';

export default function ModeDatabase() {
  const { userProfile } = useAuthLoggedIn();
  const { engineType, searchQuery, pagination, setPagination } = useFilters();

  const [openDbCreateModal] = useDbCreateModal();
  const navigate = useNavigate();

  let engineParam: ApiDatabaseFindParams['engine'];
  if (engineType !== 'all') {
    engineParam = engineType as ApiDatabaseFindParams['engine'];
  }

  const [responseDatabase, refresh] = ApiDatabase.Find.useGet({
    searchQuery,
    engine: engineParam,
    userId: userProfile.id,
    page: pagination,
  });

  const { handleDeleteDB } = useHandleDeleteDB(() => refresh());

  const handleClickDetails = (dbId: number, dbEngine: string) => {
    return () => {
      window.location.assign(`/database/${dbEngine}/${dbId}`);
    };
  };

  const handleClickHostInfo = (hostID?: number) => {
    return () => {
      if (!hostID) return;

      navigate({
        to: '/servers/$id',
        params: {
          id: String(hostID),
        },
      });
    };
  };

  if (responseDatabase.$status === 'failed') {
    return (
      <FailedState.WallCentered errorPayload={responseDatabase.error.message} />
    );
  }

  if (responseDatabase.$status !== 'success') {
    return (
      <div className="w-full flex justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <>
      <div className="flex justify-between items-center gap-2">
        <div />

        <div>
          <Pagination
            currentPage={pagination}
            maxPage={responseDatabase.pagination.total_page}
            onPageChange={(newPage) => setPagination(newPage)}
          />
        </div>
      </div>
      <br />

      <FlexGrid gridItemsMax={4}>
        <AddNewCard
          onClick={() => {
            openDbCreateModal({
              onSubmitSuccess: () => {
                refresh();
              },
            });
          }}
        />

        {responseDatabase.databases?.map((database) => {
          const { id, engine, name, updated_at } = database;

          if (!id || !engine || !name) return null;

          let dbEngine: 'postgresql' | 'mariadb';

          switch (database.engine) {
            case 'postgresql':
              dbEngine = 'postgresql';
              break;

            case 'mysql':
              dbEngine = 'mariadb';
              break;

            default:
              return null;
          }

          let formattedDate = 'Unknown Date';
          if (updated_at) {
            formattedDate = dayjs(updated_at).format('YYYY-MM-DD HH:mm:ss');
          }

          return (
            <DbInfoCard
              key={id}
              dbId={id}
              dbEngine={dbEngine}
              dbTitle={name}
              hostAddress={database.machine?.address || 'Unknown Address'}
              lastUpdated={formattedDate}
              onClickDetails={handleClickDetails(id, dbEngine)}
              onClickHostInfo={handleClickHostInfo(database.machine_id ?? 0)}
              onClickDelete={handleDeleteDB(id, name)}
            />
          );
        })}
      </FlexGrid>
    </>
  );
}

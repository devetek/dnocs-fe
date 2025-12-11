import dayjs from 'dayjs';

import { useAuthLoggedIn } from '@/services/auth';
import { useDialog } from '@/services/dialog';
import { useToaster } from '@/services/toaster';

import { useDbUserCreateModal } from '@/features/db-user-create-modal';
import { useDbUserGrantModal } from '@/features/db-user-grant-modal';

import { ApiDatabaseUser } from '@/shared/api';
import type { RecipeParams as ApiDatabaseUserFindParams } from '@/shared/api/database-user.find';
import { FlexGrid } from '@/shared/presentation/atoms/FlexGrid';
import { Pagination } from '@/shared/presentation/atoms/Pagination';
import { Spinner } from '@/shared/presentation/atoms/Spinner';
import { FailedState } from '@/widgets/failed-state';

import { useFilters } from '../../-model/store/filters';
import { AddNewCard, UserInfoCard } from '../../-presentation';

export default function ModeDbUser() {
  const { userProfile } = useAuthLoggedIn();
  const { engineType, searchQuery, pagination, setPagination } = useFilters();

  const [openDbUserGrantModal] = useDbUserGrantModal();
  const [openDbUserCreateModal] = useDbUserCreateModal();

  const [openToaster] = useToaster();
  const [openDialog] = useDialog();

  let engine: ApiDatabaseUserFindParams['engine'];
  if (engineType !== 'all') {
    engine = engineType as ApiDatabaseUserFindParams['engine'];
  }

  const [response, refresh] = ApiDatabaseUser.Find.useGet({
    searchQuery,
    engine,
    userId: userProfile.id,
    page: pagination,
  });

  const handleClickDeleteUser = (dbUserId: number, dbUserName: string) => {
    return () => {
      openDialog({
        title: 'Delete Database User',
        content: (
          <>
            Are you sure you want to delete user <br />
            <code>{dbUserName}</code> (<code>{dbUserId}</code>) ?
          </>
        ),
        variant: 'warning',
        actions: {
          variant: 'YesNo',
          yes: async () => {
            const deleteResponse =
              await ApiDatabaseUser.Delete.$DbUserId.doDelete({
                dbUserId: String(dbUserId),
              });
            if (deleteResponse.$status === 'success') {
              openToaster({
                variant: 'success',
                message: (
                  <>
                    Successfully deleted user <code>{dbUserName}</code> (
                    <code>{dbUserId}</code>)
                  </>
                ),
              });

              refresh();
              return;
            }

            openToaster({
              variant: 'error',
              title: (
                <>
                  Failed to delete user <code>{dbUserName}</code> (
                  <code>{dbUserId}</code>)
                </>
              ),
              message: deleteResponse.error.message,
            });
          },
        },
      });
    };
  };

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
      <div className="flex justify-between items-center gap-2">
        <div />

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
            openDbUserCreateModal({
              onSubmitSuccess: () => {
                refresh();
              },
            });
          }}
        />

        {response.database_users?.map((user) => {
          const {
            id,
            engine: dbUserEngine,
            name,
            machine,
            updated_at,
            host,
          } = user;

          if (!id || !dbUserEngine || !name || !host) return null;

          let dbEngine: 'postgresql' | 'mariadb';

          switch (dbUserEngine) {
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
            <UserInfoCard
              key={id}
              dbEngine={dbEngine}
              userId={id}
              hostAddress={machine?.address || 'Unknown Address'}
              lastUpdated={formattedDate}
              userAccess={host}
              userName={name}
              onClickGrant={() => {
                openDbUserGrantModal({
                  selectedUserId: String(id),
                  selectedUserName: name,
                  selectedUserDbEngine: dbEngine,
                  selectedUserAccess: host,
                  onSubmitSuccess: () => {
                    refresh();
                  },
                });
              }}
              onClickDelete={handleClickDeleteUser(id, name)}
            />
          );
        })}
      </FlexGrid>
    </>
  );
}

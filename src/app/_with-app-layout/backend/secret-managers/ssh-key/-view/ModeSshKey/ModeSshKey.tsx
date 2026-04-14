import { useNavigate } from '@tanstack/react-router';
import dayjs from 'dayjs';

import { useDialog } from '@/services/dialog';
import { useDevetekTranslations } from '@/services/i18n';
import { useToaster } from '@/services/toaster';

import { useSSHKeyCreateModal } from '@/features/ssh-create-modal';

import { ApiSecret } from '@/shared/api';
import { FlexGrid } from '@/shared/presentation/atoms/FlexGrid';
import { Pagination } from '@/shared/presentation/atoms/Pagination';
import { Spinner } from '@/shared/presentation/atoms/Spinner';
import { FailedState } from '@/widgets/failed-state';

import { useFilter } from '../../-model/filters';
import { AddNewCard, SshKeyInfoCard } from '../../-presentation';

export default function ModeSshKey() {
  const navigate = useNavigate();
  const t = useDevetekTranslations();
  const { searchQuery, pagination, setPagination } = useFilter();

  // const [deleteSSHKey] = useDeleteSSHKey();
  const [openSSHKeyCreateModal] = useSSHKeyCreateModal();

  const [openToaster] = useToaster();
  const [openDialog] = useDialog();

  const [responseSSHKey, refresh] = ApiSecret.SshKey.Find.useGet({
    searchQuery,
    page: pagination,
  });

  const handleClickDeleteSSHKey = (sshKeyId: number, sshKeyName: string) => {
    return () => {
      openDialog({
        title: t('page.sshKeys.deleteDialog.title'),
        content: t('page.sshKeys.deleteDialog.message', {
          name: sshKeyName,
          id: sshKeyId,
        }),
        variant: 'warning',
        actions: {
          variant: 'YesNo',
          yes: async () => {
            const deleteResponse = await ApiSecret.SshKey.Delete.$Id.doDelete({
              id: String(sshKeyId),
            });
            if (deleteResponse.$status === 'success') {
              openToaster({
                variant: 'success',
                message: t('page.sshKeys.toaster.deleteSuccess', {
                  name: sshKeyName,
                }),
              });

              refresh();
              return;
            }

            openToaster({
              variant: 'error',
              title: t('page.sshKeys.toaster.deleteError', {
                name: sshKeyName,
              }),
              message: deleteResponse.error.message,
            });
          },
        },
      });
    };
  };

  const handleClickDetails = (sshKeyId: number) => {
    return () => {
      navigate({
        to: '/backend/secret-managers/ssh-key/$id',
        params: {
          id: String(sshKeyId),
        },
      });
    };
  };

  if (responseSSHKey.$status === 'failed') {
    return (
      <FailedState.WallCentered errorPayload={responseSSHKey.error.message} />
    );
  }

  if (responseSSHKey.$status !== 'success') {
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
            maxPage={responseSSHKey.pagination.total_page}
            onPageChange={(newPage) => setPagination(newPage)}
          />
        </div>
      </div>
      <br />

      <FlexGrid gridItemsMax={5}>
        <AddNewCard
          onClick={() => {
            openSSHKeyCreateModal({
              onSubmitSuccess: () => {
                refresh();
              },
            });
          }}
        />

        {responseSSHKey.secrets?.map((sshkey) => {
          if (!sshkey.id || !sshkey.name || !sshkey.type) return null;

          let formattedDate = t('common.terms.unknown');
          if (sshkey.updated_at) {
            formattedDate = dayjs(sshkey.updated_at).format(
              'YYYY-MM-DD HH:mm:ss',
            );
          }

          return (
            <SshKeyInfoCard
              key={sshkey.id}
              sshkeyId={sshkey.id}
              sshkeyTitle={sshkey.name}
              lastUpdated={formattedDate}
              onClickDetails={handleClickDetails(sshkey.id)}
              onClickDelete={handleClickDeleteSSHKey(sshkey.id, sshkey.name)}
            />
          );
        })}
      </FlexGrid>
    </>
  );
}

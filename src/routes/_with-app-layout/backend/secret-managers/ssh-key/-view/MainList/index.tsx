import { useNavigate } from '@tanstack/react-router';
import dayjs from 'dayjs';

import { useDialog } from '@/services/dialog';
import { useToaster } from '@/services/toaster';

import { ApiSecret } from '@/shared/api';
import { useBreakpoint } from '@/shared/libs/react-hooks/useBreakpoint';
import LayoutAutoGridList from '@/shared/presentation/atoms/LayoutAutoGridList';
import { EmptyState } from '@/shared/presentation/organisms/EmptyState';

import { useSshData } from '../../-model/ssh-data';
import { useFilter } from '../../-model/filters';
import { SshListState } from '../-presentation/SshListState';

import SshCard from './SshCard';

export default function MainList() {
  const navigate = useNavigate();
  const { response, refresh } = useSshData();
  const { viewMode } = useFilter();

  const isDesktop = useBreakpoint('lg');
  const derivedViewMode: 'grid' | 'list' =
    viewMode === 'auto' ? (isDesktop ? 'list' : 'grid') : viewMode;

  const [openToaster] = useToaster();
  const [openDialog] = useDialog();

  const handleClickDelete = (sshKeyId: number, sshKeyName: string) => {
    openDialog({
      title: 'Delete SSH Key',
      content: (
        <>
          Are you sure you want to delete <br />
          <code>{sshKeyName}</code> (<code>id</code> <code>{sshKeyId}</code>)?
        </>
      ),
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
              message: (
                <>
                  Successfully deleted SSH key <code>{sshKeyName}</code> (
                  <code>{sshKeyId}</code>)
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
                Failed to delete SSH key <code>{sshKeyName}</code> (
                <code>{sshKeyId}</code>)
              </>
            ),
            message: deleteResponse.error.message,
          });
        },
      },
    });
  };

  const handleClickDetails = (sshKeyId: number) => {
    navigate({
      to: '/backend/secret-managers/ssh-key/$id',
      params: { id: String(sshKeyId) },
    });
  };

  if (response.$status === 'failed') {
    return <SshListState.Error error={response.error} />;
  }

  if (response.$status !== 'success') {
    return <SshListState.Loading />;
  }

  const secrets = response.secrets ?? [];

  if (secrets.length < 1) {
    return (
      <EmptyState
        title="No SSH keys added yet"
        message="Add an SSH key to securely access your virtual machines without entering a password each time."
        ctaText="Add SSH Key"
      />
    );
  }

  return (
    <LayoutAutoGridList viewMode={viewMode}>
      {secrets.map((sshkey) => {
        if (!sshkey.id || !sshkey.name) return null;

        const lastUpdated = sshkey.updated_at
          ? dayjs(sshkey.updated_at).format('YYYY-MM-DD HH:mm:ss')
          : null;

        return (
          <SshCard
            key={sshkey.id}
            data={{ name: sshkey.name, type: sshkey.type, lastUpdated }}
            variant={derivedViewMode === 'grid' ? 'compact' : 'full'}
            onClickDetails={() => handleClickDetails(sshkey.id!)}
            onClickDelete={() => handleClickDelete(sshkey.id!, sshkey.name!)}
          />
        );
      })}
    </LayoutAutoGridList>
  );
}

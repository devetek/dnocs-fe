import { useNavigate } from '@tanstack/react-router';
import dayjs from 'dayjs';
import { useMetaTags } from 'react-metatags-hook';

import { useDialog } from '@/services/dialog';
import { useToaster } from '@/services/toaster';

import type { DTOs } from '@/shared/api';
import { ApiSecret } from '@/shared/api';

import { SshKeyInfoCard } from '../../-presentation';

interface ModeSSHKeyProps {
  sshkey: DTOs.SshKeyV1;
  refresh: () => void;
}

export default function ModeSshKey({ sshkey, refresh }: ModeSSHKeyProps) {
  const sshKeyID = sshkey.id ?? 0;
  const sshKeyName = sshkey.name ?? '';
  const sshPrivKey = sshkey.data?.private ?? '';
  const sshPubKey = sshkey.data?.public ?? '';

  let formattedDate = 'Unknown Date';
  if (sshkey.updated_at) {
    formattedDate = dayjs(sshkey.updated_at).format('YYYY-MM-DD HH:mm:ss');
  }

  const navigate = useNavigate();

  useMetaTags(
    {
      title: `${sshKeyName} - SSH Key | dPanel`,
    },
    [sshKeyID],
  );

  const [openToaster] = useToaster();
  const [openDialog] = useDialog();

  const handleClickDeleteSSHKey = (
    sshKeyId: number,
    targetSshKeyName: string,
  ) => {
    return () => {
      openDialog({
        title: 'Delete SSH Key',
        content: (
          <>
            Are you sure you want to delete <br />
            <code>{targetSshKeyName}</code> (<code>id</code>{' '}
            <code>{sshKeyId}</code>) ?
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
                    Successfully deleted SSH key
                    <code>{targetSshKeyName}</code> (<code>{sshKeyId}</code>)
                  </>
                ),
              });

              refresh();
              navigate({
                to: '/backend/secret-managers/ssh-key',
                replace: true,
              });
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
  };

  return (
    <>
      <SshKeyInfoCard
        sshkeyId={sshKeyID}
        sshkeyTitle={sshKeyName}
        lastUpdated={formattedDate}
        sshPrivKey={sshPrivKey}
        sshPubKey={sshPubKey}
        onClickDelete={handleClickDeleteSSHKey(sshKeyID, sshKeyName)}
      />
    </>
  );
}

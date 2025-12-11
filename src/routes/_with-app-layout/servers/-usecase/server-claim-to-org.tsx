import { useDialog } from '@/services/dialog';
import { useDevetekTranslations } from '@/services/i18n';
import { useToaster } from '@/services/toaster';

import { ApiServer } from '@/shared/api';
import useHandler from '@/shared/libs/react-hooks/useHandler';

import type { ServerClaimToOrgPayload } from './types';

interface Params {
  onSuccess: () => void;
}

export default function useServerClaimToOrgUsecase(params: Params) {
  const { onSuccess } = params;

  const t = useDevetekTranslations();

  const [openDialog] = useDialog();

  const [openToaster] = useToaster();

  const handleUsecase = useHandler((payload: ServerClaimToOrgPayload) => {
    const { serverId, serverName } = payload;

    const action = async () => {
      const selectedOrganization =
        localStorage.getItem('organization_id') || '';

      if (!selectedOrganization) {
        openToaster({
          variant: 'error',
          title: t.rich('toaster.claimToTeam.noteam', {
            code: (chunks) => <code>{chunks}</code>,
            type: 'server',
            name: serverName,
          }),
          message: '',
        });
        return;
      }

      const response = await ApiServer.Update.$Id.doPost({
        serverId,
        payload: {
          organization_id: selectedOrganization,
        },
      });

      if (response.$status === 'success') {
        openToaster({
          variant: 'success',
          message: t.rich('toaster.claimToTeam.success', {
            code: (chunks) => <code>{chunks}</code>,
            type: 'server',
            name: serverName,
          }),
        });
        onSuccess();
        return;
      }

      openToaster({
        variant: 'error',
        title: t.rich('toaster.claimToTeam.error', {
          code: (chunks) => <code>{chunks}</code>,
          type: 'server',
          name: serverName,
        }),
        message: response.error.message,
      });
    };

    openDialog({
      title: t('dialog.claimToTeam.title'),
      content: t.rich('dialog.claimToTeam.message', {
        code: (chunks) => <code>{chunks}</code>,
        type: 'server',
        name: serverName,
      }),
      variant: 'warning',
      actions: {
        variant: 'YesNo',
        yes: action,
      },
    });
  });

  return [handleUsecase] as const;
}

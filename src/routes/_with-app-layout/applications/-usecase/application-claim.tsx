import { useDialog } from '@/services/dialog';
import { useDevetekTranslations } from '@/services/i18n';
import { useToaster } from '@/services/toaster';

import { ApiApplication } from '@/shared/api';
import useHandler from '@/shared/libs/react-hooks/useHandler';

import type { ApplicationClaimPayload as Payload } from '../-rules/usecase-types';

interface Params {
  onSuccess: () => void;
}

export default function useApplicationClaimUsecase(params: Params) {
  const { onSuccess } = params;

  const t = useDevetekTranslations();

  const [openDialog] = useDialog();

  const [openToaster] = useToaster();

  const handleUsecase = useHandler((payload: Payload) => {
    const { appName, id } = payload;

    const handleUpdateApplication = async () => {
      const selectedOrganization =
        localStorage.getItem('organization_id') || '';

      if (!selectedOrganization) {
        openToaster({
          variant: 'error',
          title: t.rich('toaster.claimToTeam.noteam', {
            code: (chunks) => <code>{chunks}</code>,
            type: 'application',
            name: appName,
          }),
          message: '',
        });
        return;
      }

      const response = await ApiApplication.Update.$Id.doPost({
        applicationId: id,
        payload: {
          organization_id: selectedOrganization,
        },
      });

      if (response.$status === 'success') {
        openToaster({
          variant: 'success',
          message: t.rich('toaster.claimToTeam.success', {
            code: (chunks) => <code>{chunks}</code>,
            type: 'application',
            name: appName,
          }),
        });

        onSuccess();
        return;
      }

      openToaster({
        variant: 'error',
        title: t.rich('toaster.claimToTeam.error', {
          code: (chunks) => <code>{chunks}</code>,
          type: 'application',
          name: appName,
        }),
        message: response.error.message,
      });
    };

    openDialog({
      title: t('dialog.claimToTeam.title'),
      content: t.rich('dialog.claimToTeam.message', {
        code: (chunks) => <code>{chunks}</code>,
        type: 'application',
        name: appName,
      }),
      variant: 'warning',
      actions: {
        variant: 'YesNo',
        yes: handleUpdateApplication,
      },
    });
  });

  return [handleUsecase] as const;
}

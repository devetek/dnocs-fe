import { useDialog } from '@/services/dialog';
import { useDevetekTranslations } from '@/services/i18n';
import { useToaster } from '@/services/toaster';

import { ApiSecret } from '@/shared/api';
import useHandler from '@/shared/libs/react-hooks/useHandler';

import type { SshKeyDeletePayload as Payload } from '../-rules/usecase-types';

interface Params {
  onSuccess: () => void;
}

export default function useDeleteSshKeyUsecase(params: Params) {
  const { onSuccess } = params;
  const t = useDevetekTranslations();

  const [openToaster] = useToaster();
  const [openDialog] = useDialog();

  const handleUsecase = useHandler((payload: Payload) => {
    const { id, name } = payload;

    openDialog({
      title: t('page.sshKeys.deleteDialog.title'),
      content: t('page.sshKeys.deleteDialog.message', {
        name,
        id,
      }),
      variant: 'warning',
      actions: {
        variant: 'YesNo',
        yes: async () => {
          const response = await ApiSecret.SshKey.Delete.$Id.doDelete({
            id: String(id),
          });

          if (response.$status === 'success') {
            openToaster({
              variant: 'success',
              message: t('page.sshKeys.toaster.deleteSuccess', {
                name,
              }),
            });
            onSuccess();
          } else {
            openToaster({
              variant: 'error',
              message: t('page.sshKeys.toaster.deleteError', {
                name,
              }),
            });
          }
        },
      },
    });
  });

  return [handleUsecase] as const;
}

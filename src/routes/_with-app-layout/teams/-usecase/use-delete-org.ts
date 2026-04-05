import { useDialog } from '@/services/dialog';
import { useDevetekTranslations } from '@/services/i18n';
import { useToaster } from '@/services/toaster';

import { ApiOrganization } from '@/shared/api';
import useHandler from '@/shared/libs/react-hooks/useHandler';

import type { OrgDeletePayload as Payload } from '../-rules/usecase-types';

interface Params {
  onSuccess: () => void;
}

export default function useDeleteOrgUsecase(params: Params) {
  const { onSuccess } = params;

  const [openToaster] = useToaster();
  const [openDialog] = useDialog();
  const t = useDevetekTranslations();

  const handleUsecase = useHandler((payload: Payload) => {
    const { id, name } = payload;

    openDialog({
      title: t('dialog.teamDelete.title'),
      content: t('dialog.teamDelete.message', { name, id }),
      variant: 'warning',
      actions: {
        variant: 'YesNo',
        yes: async () => {
          const response = await ApiOrganization.Delete.$Id.doDelete({ id });

          if (response.$status === 'success') {
            openToaster({
              variant: 'success',
              message: t('toaster.teamDelete.success', { name }),
            });
            onSuccess();
          } else {
            openToaster({
              variant: 'error',
              message: t('toaster.teamDelete.error', { name }),
            });
          }
        },
      },
    });
  });

  return [handleUsecase] as const;
}

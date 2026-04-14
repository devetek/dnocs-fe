import { useDialog } from '@/services/dialog';
import { useDevetekTranslations } from '@/services/i18n';
import { useToaster } from '@/services/toaster';

import { ApiOrganizationPeople } from '@/shared/api';
import useHandler from '@/shared/libs/react-hooks/useHandler';

import type { MemberDeletePayload as Payload } from '../-rules/usecase-types';

interface Params {
  onSuccess: () => void;
}

export default function useDeleteMemberUsecase(params: Params) {
  const { onSuccess } = params;

  const [openToaster] = useToaster();
  const [openDialog] = useDialog();
  const t = useDevetekTranslations();

  const handleUsecase = useHandler((payload: Payload) => {
    const { id, name } = payload;

    openDialog({
      title: t('dialog.teamMemberRemove.title'),
      content: t('dialog.teamMemberRemove.message', { name }),
      variant: 'warning',
      actions: {
        variant: 'YesNo',
        yes: async () => {
          const response = await ApiOrganizationPeople.Delete.$Id.doDelete({
            id,
          });

          if (response.$status === 'success') {
            openToaster({
              variant: 'success',
              message: t('toaster.teamMemberRemove.success', { name }),
            });
            onSuccess();
          } else {
            openToaster({
              variant: 'error',
              message: t('toaster.teamMemberRemove.error', { name }),
            });
          }
        },
      },
    });
  });

  return [handleUsecase] as const;
}

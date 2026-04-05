import { useDialog } from '@/services/dialog';
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

  const handleUsecase = useHandler((payload: Payload) => {
    const { id, name } = payload;

    openDialog({
      title: 'Delete Team',
      content: `Are you sure you want to delete "${name}" (${id})?`,
      variant: 'warning',
      actions: {
        variant: 'YesNo',
        yes: async () => {
          const response = await ApiOrganization.Delete.$Id.doDelete({ id });

          if (response.$status === 'success') {
            openToaster({
              variant: 'success',
              message: `Successfully deleted team "${name}"`,
            });
            onSuccess();
          } else {
            openToaster({
              variant: 'error',
              message: `Failed to delete team "${name}"`,
            });
          }
        },
      },
    });
  });

  return [handleUsecase] as const;
}

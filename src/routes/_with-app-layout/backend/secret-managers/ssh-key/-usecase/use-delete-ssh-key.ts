import { useDialog } from '@/services/dialog';
import { useToaster } from '@/services/toaster';

import { ApiSecret } from '@/shared/api';
import useHandler from '@/shared/libs/react-hooks/useHandler';

import type { SshKeyDeletePayload as Payload } from '../-rules/usecase-types';

interface Params {
  onSuccess: () => void;
}

export default function useDeleteSshKeyUsecase(params: Params) {
  const { onSuccess } = params;

  const [openToaster] = useToaster();
  const [openDialog] = useDialog();

  const handleUsecase = useHandler((payload: Payload) => {
    const { id, name } = payload;

    openDialog({
      title: 'Delete SSH Key',
      content: `Are you sure you want to delete "${name}" (${id})?`,
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
              message: `Successfully deleted SSH key "${name}"`,
            });
            onSuccess();
          } else {
            openToaster({
              variant: 'error',
              message: `Failed to delete SSH key "${name}"`,
            });
          }
        },
      },
    });
  });

  return [handleUsecase] as const;
}

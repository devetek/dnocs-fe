import { useDialog } from '@/services/dialog';
import { useToaster } from '@/services/toaster';

import { ApiCloud } from '@/shared/api';
import useHandler from '@/shared/libs/react-hooks/useHandler';

import type { CloudProjectDeletePayload as Payload } from '../-rules/usecase-types';

interface Params {
  onSuccess: () => void;
}

export default function useDeleteCloudProjectUsecase(params: Params) {
  const { onSuccess } = params;

  const [openToaster] = useToaster();
  const [openDialog] = useDialog();

  const handleUsecase = useHandler((payload: Payload) => {
    const { id, name } = payload;

    openDialog({
      title: 'Delete Cloud Project',
      content: `Are you sure you want to delete "${name}" (${id})?`,
      variant: 'warning',
      actions: {
        variant: 'YesNo',
        yes: async () => {
          const response = await ApiCloud.Project.Delete.$Id.doDelete({
            id: String(id),
          });

          if (response.$status === 'success') {
            openToaster({
              variant: 'success',
              message: `Successfully deleted cloud project "${name}"`,
            });
            onSuccess();
          } else {
            openToaster({
              variant: 'error',
              message: `Failed to delete cloud project "${name}"`,
            });
          }
        },
      },
    });
  });

  return [handleUsecase] as const;
}


import { useDialog } from '@/services/dialog';
import { useToaster } from '@/services/toaster';

import { ApiService } from '@/shared/api';
import useHandler from '@/shared/libs/react-hooks/useHandler';

import { useBaseContext } from '../../config/base-context';

export default function useHandleDeleteModule(onSuccess: () => void) {
  const [openDialog] = useDialog();
  const { moduleInfo } = useBaseContext();

  const [openToaster] = useToaster();

  const deleteModule = useHandler((version: string, id: number) => {
    openDialog({
      title: 'Delete module',
      content: <>Are you sure you want to delete module {moduleInfo.name}?</>,
      variant: 'warning',
      actions: {
        variant: 'YesNo',
        yes: async () => {
          const response = await ApiService.Delete.$Id.doDelete({
            serviceId: String(id),
          });

          if (response.$status === 'failed') {
            openToaster({
              variant: 'error',
              title: (
                <>
                  Failed to delete module {moduleInfo.name} version {version}
                </>
              ),
              message: response.error.message,
            });
            return;
          }

          openToaster({
            variant: 'success',
            message: (
              <>
                Successfully deleted module {moduleInfo.name} version {version}
              </>
            ),
          });

          onSuccess();
        },
      },
    });
  });

  return {
    deleteModule,
  };
}

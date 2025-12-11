import { useDialog } from '@/services/dialog';
import { useToaster } from '@/services/toaster';

import { ApiService } from '@/shared/api';
import useHandler from '@/shared/libs/react-hooks/useHandler';

import { useBaseContext } from '../../config/base-context';

export default function useHandleInstallModule() {
  const [openDialog] = useDialog();
  const { moduleInfo } = useBaseContext();

  const [openToaster] = useToaster();

  const installModule = useHandler(
    (version: string, configuration: Record<string, unknown>) => {
      openDialog({
        title: 'Install module',
        content: (
          <>
            Are you sure you want to install module {moduleInfo.name} version{' '}
            {version}?
          </>
        ),
        variant: 'info',
        actions: {
          variant: 'YesNo',
          yes: async () => {
            const response = await ApiService.Create.doPost({
              payload: {
                ...configuration,
              },
            });

            if (response.$status === 'failed') {
              openToaster({
                variant: 'error',
                title: (
                  <>
                    Failed to install module {moduleInfo.name} version {version}
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
                  Successfully installed module {moduleInfo.name} version{' '}
                  {version}
                </>
              ),
            });
          },
        },
      });
    },
  );

  return {
    installModule,
  };
}

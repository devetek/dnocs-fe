import { useDialog } from '@/services/dialog';
import { useDevetekTranslations } from '@/services/i18n';
import { useToaster } from '@/services/toaster';

import { ApiServer } from '@/shared/api';
import useHandler from '@/shared/libs/react-hooks/useHandler';

import type { MachineReinstallPayload } from './types';

interface Params {
  onSuccess: () => void;
}

export default function useMachineReinstallUsecase(params: Params) {
  const { onSuccess } = params;

  const t = useDevetekTranslations();

  const [openToaster] = useToaster();
  const [openDialog] = useDialog();

  const handleUsecase = useHandler((payload: MachineReinstallPayload) => {
    const { serverId } = payload;

    const action = async () => {
      const response = await ApiServer.Setup.$Id.doPost({
        id: serverId,
      });

      if (response.$status === 'success') {
        openToaster({
          variant: 'success',
          message: t.rich('toaster.machineReinstall.success', {
            code: (chunks) => <code>{chunks}</code>,
            machineID: serverId,
          }),
        });
        onSuccess();
        return;
      }

      openToaster({
        variant: 'error',
        title: t.rich('toaster.machineReinstall.error', {
          code: (chunks) => <code>{chunks}</code>,
          machineID: serverId,
        }),
        message: response.error.message,
      });
    };

    openDialog({
      title: t('dialog.machineReinstall.title'),
      content: t.rich('dialog.machineReinstall.message', {
        code: (chunks) => <code>{chunks}</code>,
        machineID: serverId,
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

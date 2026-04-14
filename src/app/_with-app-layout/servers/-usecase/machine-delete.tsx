import { useDialog } from '@/services/dialog';
import { useDevetekTranslations } from '@/services/i18n';
import { useToaster } from '@/services/toaster';

import { ApiServer } from '@/shared/api';
import useHandler from '@/shared/libs/react-hooks/useHandler';

import type { MachineDeletePayload } from './types';

interface Params {
  onSuccess: () => void;
}

export default function useMachineDeleteUsecase(params: Params) {
  const { onSuccess } = params;

  const t = useDevetekTranslations();

  const [openToaster] = useToaster();
  const [openDialog] = useDialog();

  const handleUsecase = useHandler((payload: MachineDeletePayload) => {
    const { serverId, serverName } = payload;

    const action = async () => {
      const response = await ApiServer.Delete.$Id.doDelete({
        id: serverId,
      });

      if (response.$status === 'success') {
        openToaster({
          variant: 'success',
          message: t.rich('toaster.machineDelete.success', {
            code: (chunks) => <code>{chunks}</code>,
            machineName: serverName || '',
            machineID: serverId,
          }),
        });
        onSuccess();
        return;
      }

      openToaster({
        variant: 'error',
        title: t.rich('toaster.machineDelete.error', {
          code: (chunks) => <code>{chunks}</code>,
          machineName: serverName || '',
          machineID: serverId,
        }),
        message: response.error.message,
      });
    };

    openDialog({
      title: t('dialog.machineDelete.title'),
      content: t.rich('dialog.machineDelete.message', {
        code: (chunks) => <code>{chunks}</code>,
        machineName: serverName || '',
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

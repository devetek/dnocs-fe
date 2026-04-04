import z from 'zod';

import { useDevetekTranslations } from '@/services/i18n';
import { useToaster } from '@/services/toaster';

import { ApiRouter } from '@/shared/api';
import useHandler from '@/shared/libs/react-hooks/useHandler';
import buildDialog from '@/widgets/dialog-builder';

import type { LbDeletePayload as Payload } from '../-rules/usecase-types';

const useConfirmDeleteDialog = buildDialog({
  variant: 'warning',
  action: 'yesNo',
  actionManualResolve: 'yes',
  title: '@dialog.loadBalancerDelete.title',
  content: ({ t, loadBalancer }) =>
    t('dialog.loadBalancerDelete.message', {
      loadBalancer,
    }),
  extraProps: z.object({
    loadBalancer: z.string(),
  }),
});

interface Params {
  onSuccess: () => void;
}

export default function useLbDeleteUsecase(params: Params) {
  const { onSuccess } = params;

  const t = useDevetekTranslations();
  const [openToaster] = useToaster();

  const [openDialog] = useConfirmDeleteDialog();

  const handleUsecase = useHandler(async (payload: Payload) => {
    const { id, domain } = payload;

    const dialog = await openDialog({
      loadBalancer: domain.fqdn,
    });

    while (dialog.isUnresolved && dialog.response === 'yes') {
      const apiResponse = await ApiRouter.Delete.$Id.doDelete({
        routerId: id,
      });

      if (apiResponse.$status === 'success') {
        openToaster({
          variant: 'success',
          message: t('toaster.loadBalancerDelete.success'),
        });
        onSuccess();
        return;
      }

      openToaster({
        variant: 'error',
        title: t('toaster.loadBalancerDelete.error'),
        message: apiResponse.error.message,
      });

      await dialog.reject(apiResponse.error);
    }
  });

  return [handleUsecase] as const;
}

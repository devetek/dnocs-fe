import z from 'zod';

import { useDevetekTranslations } from '@/services/i18n';
import { useToaster } from '@/services/toaster';

import { ApiDomain } from '@/shared/api';
import useHandler from '@/shared/libs/react-hooks/useHandler';
import buildDialog from '@/widgets/dialog-builder';

import type { DomainDeletePayload as Payload } from '../-rules/usecase-types';

const useConfirmDeletionDialog = buildDialog({
  variant: 'warning',
  action: 'yesNo',
  actionManualResolve: 'yes',
  title: '@dialog.domainDelete.title',
  content: ({ t, domain }) =>
    t('dialog.domainDelete.message', {
      domain,
    }),
  extraProps: z.object({
    domain: z.string(),
  }),
});

interface Params {
  onSuccess: () => void;
}

export default function useDomainDeleteUsecase(params: Params) {
  const { onSuccess } = params;

  const t = useDevetekTranslations();

  const [openDialogConfirmDeletion] = useConfirmDeletionDialog();

  const [openToaster] = useToaster();

  const handleUsecase = useHandler(async (payload: Payload) => {
    const { domain } = payload;

    const dialog = await openDialogConfirmDeletion({
      domain: domain.hostname,
    });

    while (dialog.isUnresolved && dialog.response === 'yes') {
      const apiResponse = await ApiDomain.Delete.$Id.doDelete({
        id: payload.id,
      });

      if (apiResponse.$status === 'success') {
        openToaster({
          variant: 'success',
          message: t('toaster.domainDelete.success', {
            domain: domain.hostname,
          }),
        });
        dialog.resolve();
        onSuccess();
        return;
      }

      openToaster({
        variant: 'error',
        title: t('toaster.domainDelete.error', {
          domain: domain.hostname,
        }),
        message: apiResponse.error.message,
      });

      await dialog.reject(apiResponse.error);
    }
  });

  return [handleUsecase] as const;
}

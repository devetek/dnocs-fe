import { useDialog } from '@/services/dialog';
import { useToaster } from '@/services/toaster';

import { ApiRouter } from '@/shared/api';
import useHandler from '@/shared/libs/react-hooks/useHandler';

import type { LbeletePayload as Payload } from '../-rules/usecase-types';

interface Params {
  onSuccess: () => void;
}

export default function useLbDeleteUsecase(params: Params) {
  const { onSuccess } = params;

  const [openDialog] = useDialog();

  const [openToaster] = useToaster();

  const handleUsecase = useHandler((payload: Payload) => {
    const { id, domain } = payload;

    const handleDeleteLb = async () => {
      const response = await ApiRouter.Delete.$Id.doDelete({
        routerId: id,
      });

      if (response.$status === 'success') {
        openToaster({
          variant: 'success',
          message: `Successfully deleted load balancer «${domain.fqdn}».`,
        });
        onSuccess();
        return;
      }
      openToaster({
        variant: 'error',
        title: `Failed to delete load balancer «${domain.fqdn}»!`,
        message: response.error.message,
      });
    };

    openDialog({
      title: 'Delete load balancer',
      content: (
        <>
          Are you sure you want to delete load balancer &laquo;{domain.fqdn}
          &raquo; ?
        </>
      ),
      variant: 'warning',
      actions: {
        variant: 'YesNo',
        yes: handleDeleteLb,
      },
    });
  });

  return [handleUsecase] as const;
}

import { useDevetekTranslations } from '@/services/i18n';
import { useToaster } from '@/services/toaster';

import { ApiLoadBalancer } from '@/shared/api';
import useHandler from '@/shared/libs/react-hooks/useHandler';

import type { LbRestorePayload as Payload } from '../-rules/usecase-types';

interface Params {
  onSuccess: () => void;
}

export default function useLbRestoreUsecase(params: Params) {
  const { onSuccess } = params;

  const t = useDevetekTranslations();
  const [openToaster] = useToaster();

  const handleUsecase = useHandler(async (payload: Payload) => {
    const { id, domain } = payload;

    const apiResponse = await ApiLoadBalancer.Update.$Id.$.Restore.doPost({
      loadBalancerId: id,
    });

    if (apiResponse.$status === 'success') {
      openToaster({
        variant: 'success',
        message: t('toaster.loadBalancerRestore.success', {
          loadBalancer: domain.fqdn,
        }),
      });
      onSuccess();
      return;
    }

    openToaster({
      variant: 'error',
      title: t('toaster.loadBalancerRestore.error', {
        loadBalancer: domain.fqdn,
      }),
      message: apiResponse.error.message,
    });
  });

  return [handleUsecase] as const;
}

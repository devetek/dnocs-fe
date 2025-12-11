import { useDialog } from '@/services/dialog';
import { useDevetekTranslations } from '@/services/i18n';
import { useToaster } from '@/services/toaster';

import { ApiService } from '@/shared/api';
import useHandler from '@/shared/libs/react-hooks/useHandler';

import type { PushActivityPayload as Payload } from '../rules/types';

interface Params {
  onSuccess: () => void;
}

export default function usePushServiceActivityUsecase(props: Params) {
  const { onSuccess } = props;

  const [openToaster] = useToaster();
  const [openDialog] = useDialog();

  const t = useDevetekTranslations();

  const handleUsecase = useHandler((payload: Payload) => {
    const { activity, targetServerId, serviceName } = payload;

    const dispatchActivity = async () => {
      const response = await ApiService.Trigger.$Name.doPost({
        eventName: activity,
        serverId: targetServerId,
        serviceName,
      });

      if (response.$status === 'success') {
        openToaster({
          variant: 'success',
          message: t('toaster.osServicePushActivity.success', {
            activity,
            serviceName,
          }),
        });
        onSuccess();
        return;
      }

      openToaster({
        variant: 'error',
        title: t('toaster.osServicePushActivity.error', {
          activity,
          serviceName,
        }),
        message: response.error.message,
      });
    };

    openDialog({
      title: t('dialog.osServicePushActivity.title'),
      content: t.rich('dialog.osServicePushActivity.message', {
        strong: (chunks) => <strong>{chunks}</strong>,
        em: (chunks) => <em>{chunks}</em>,
        activity,
        serviceName,
      }),
      variant: 'warning',
      actions: {
        variant: 'YesNo',
        yes: dispatchActivity,
      },
    });
  });

  return [handleUsecase] as const;
}

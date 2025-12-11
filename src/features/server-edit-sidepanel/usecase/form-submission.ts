import { useDevetekTranslations } from '@/services/i18n';
import { useToaster } from '@/services/toaster';

import { ApiServer } from '@/shared/api';

import { useServerEditModel } from '../model';
import { useEmit, useSubscribe } from '../model/events';

export default function useFormSubmissionUsecase() {
  const { serverId, form, onSuccess } = useServerEditModel();

  const t = useDevetekTranslations('toaster.updateServer');

  const [openToaster] = useToaster();

  const sidepanelEmit = useEmit();

  const handleSubmit = form.handleSubmit(async (values) => {
    const response = await ApiServer.Update.$Id.doPost({
      serverId,
      payload: {
        address: values.serverAddress,
        domain: values.agent.domain,
        http_port: String(values.agent.httpPort),
        ssh_port: String(values.ssh.port),
        default_user: values.ssh.username,
      },
    });

    if (response.$status === 'failed') {
      openToaster({
        variant: 'error',
        title: t('error', { id: serverId }),
        message: response.error.message,
      });
      return;
    }

    openToaster({
      variant: 'success',
      message: t('success', { id: serverId }),
    });

    sidepanelEmit('#server-edit-sidepanel/sidepanel-close', { bypass: true });
    onSuccess();
  });

  useSubscribe('#server-edit-sidepanel/form-submit', () => handleSubmit());
}

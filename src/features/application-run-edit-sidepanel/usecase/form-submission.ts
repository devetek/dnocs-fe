import { useToaster } from '@/services/toaster';

import { ApiApplication } from '@/shared/api';

import { useApplicationRunEditModel } from '../model';
import { useEmit, useSubscribe } from '../model/events';

export default function useFormSubmissionUsecase() {
  const { props, form, onSuccess } = useApplicationRunEditModel();

  const [openToaster] = useToaster();

  const sidepanelEmit = useEmit();

  const handleSubmit = form.handleSubmit(async (values) => {
    const { rawAppDefinition, applicationId } = props;

    const response = await ApiApplication.Update.$Id.doPost({
      applicationId,
      payload: {
        app_definition: {
          ...rawAppDefinition,
          run: {
            ...rawAppDefinition.run,
            command: values.command,
            environment: values.envs.map((env) => ({
              key: env.key,
              value: env.value,
            })),
          },
        },
      },
    });

    if (response.$status === 'success') {
      openToaster({
        variant: 'success',
        message: `Runtime configuration for ${props.applicationName} saved.`,
      });

      sidepanelEmit('#application-run-edit-sidepanel/sidepanel-close', {
        bypass: true,
      });
      onSuccess();
      return;
    }

    openToaster({
      variant: 'error',
      title: 'Failed to save runtime configuration',
      message: response.error.message,
    });
  });

  useSubscribe('#application-run-edit-sidepanel/form-submit', () =>
    handleSubmit(),
  );
}

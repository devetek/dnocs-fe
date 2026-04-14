import { useToaster } from '@/services/toaster';

import { ApiApplication } from '@/shared/api';

import { useApplicationSetupEditModel } from '../model';
import { useEmit, useSubscribe } from '../model/events';

export default function useFormSubmissionUsecase() {
  const { props, form, onSuccess } = useApplicationSetupEditModel();

  const [openToaster] = useToaster();

  const sidepanelEmit = useEmit();

  const handleSubmit = form.handleSubmit(async (values) => {
    const { rawAppDefinition, applicationId } = props;

    const response = await ApiApplication.Update.$Id.doPost({
      applicationId,
      payload: {
        app_definition: {
          ...rawAppDefinition,
          setup: {
            ...rawAppDefinition.setup,
            language: {
              name: values.language.name,
              version: values.language.version,
            },
            languages: values.languages.map((lang) => ({
              name: lang.name,
              version: lang.version,
            })),
          },
        },
      },
    });

    if (response.$status === 'success') {
      openToaster({
        variant: 'success',
        message: `Setup configuration for ${props.applicationName} saved.`,
      });

      sidepanelEmit('#application-setup-edit-sidepanel/sidepanel-close', {
        bypass: true,
      });

      onSuccess();
    } else {
      openToaster({
        variant: 'error',
        message: 'Failed to save setup configuration.',
      });
    }
  });

  useSubscribe('#application-setup-edit-sidepanel/form-submit', handleSubmit);
}

import { useToaster } from '@/services/toaster';

import { ApiApplication } from '@/shared/api';

import { useApplicationBuildEditModel } from '../model';
import { useEmit, useSubscribe } from '../model/events';

export default function useFormSubmissionUsecase() {
  const { props, form, onSuccess } = useApplicationBuildEditModel();

  const [openToaster] = useToaster();

  const sidepanelEmit = useEmit();

  const handleSubmit = form.handleSubmit(async (values) => {
    const { rawAppDefinition, applicationId } = props;

    const newSteps = values.steps.map((step) => ({
      name: step.name,
      command: step.commandText
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean),
      ...(step.archive ? { archive: step.archive } : {}),
    }));

    const newEnvs = values.envs.map((env) => ({
      key: env.key,
      value: env.value,
    }));

    const response = await ApiApplication.Update.$Id.doPost({
      applicationId,
      payload: {
        app_definition: {
          ...rawAppDefinition,
          build: {
            ...rawAppDefinition.build,
            target: {
              ...rawAppDefinition.build.target,
              machine: {
                ...rawAppDefinition.build.target.machine,
                steps: newSteps,
                environment: newEnvs,
              },
            },
          },
        },
      },
    });

    if (response.$status === 'success') {
      openToaster({
        variant: 'success',
        message: `Build configuration for ${props.applicationName} saved.`,
      });

      sidepanelEmit('#application-build-edit-sidepanel/sidepanel-close', {
        bypass: true,
      });
      onSuccess();
      return;
    }

    openToaster({
      variant: 'error',
      title: 'Failed to save build configuration',
      message: response.error.message,
    });
  });

  useSubscribe('#application-build-edit-sidepanel/form-submit', () =>
    handleSubmit(),
  );
}

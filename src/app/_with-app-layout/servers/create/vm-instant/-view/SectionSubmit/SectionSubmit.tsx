import { useNavigate } from '@tanstack/react-router';
import { AxiosError } from 'axios';

import { useDialog } from '@/services/dialog';
import { useDevetekTranslations } from '@/services/i18n';
import { useToaster } from '@/services/toaster';

import { ApiServer } from '@/shared/api';
// import usePostMachineCreate from '@/shared/api/machine/post-machine-create';
// import usePostMachineSetup from '@/shared/api/machine/setup/post-machine-setup';
import { Button } from '@/shared/presentation/atoms/Button';
import { Spinner } from '@/shared/presentation/atoms/Spinner';

import { useForm } from '../../-model';

export default function SectionSubmit() {
  const [openToaster] = useToaster();
  const [openDialog] = useDialog();

  const navigate = useNavigate();
  const t = useDevetekTranslations();

  const { handleFormReset, form } = useForm();

  // const [postMachineCreate] = usePostMachineCreate();
  // const [postMachineSetup] = usePostMachineSetup();

  const handleSubmit = form.handleSubmit(async (values) => {
    const constructedValues = {
      cloud_id: String(values.cloud.projectID),
      secret_id: String(values.cloud.sshKeyID),
      os_template: values.spec.osTemplate,
      cpu_core: values.spec.cpuCore,
      ram: values.spec.ramSizeGB,
      disk: values.spec.diskSizeGB,
      default_user: values.login.username,
      default_password: values.login.password,
      region_id: values.regionSlug,
      vpc_id: values.vpcBulk.id,
      private_subnet: values.vpcBulk.subnet,
    };

    try {
      const createResponse = await ApiServer.Create.doPost({
        payload: constructedValues,
      });

      if (createResponse.$status !== 'success') throw createResponse;

      const newServerId = createResponse.id;
      if (!newServerId) throw Error('New server ID is empty!');

      const setupResponse = await ApiServer.Setup.$Id.doPost({
        id: newServerId,
      });
      if (setupResponse.$status !== 'success') throw setupResponse;

      openDialog({
        title: 'Successfully created VM!',
        content:
          'The VM is now being set up. In the meantime, would you like to create more machines?',
        variant: 'info',
        actions: [
          {
            label: t('common.actions.yes'),
            isPrimary: true,
            onClick: () => {
              handleFormReset();
            },
          },
          {
            label: 'Go to server',
            onClick: () => {
              navigate({
                to: '/servers',
              });
            },
          },
        ],
      });
    } catch (error) {
      let message = 'Something went wrong, please try again.';

      if (error instanceof AxiosError) {
        message = error.message;
      }

      if (error instanceof Error) {
        message = error.message;
      }

      openToaster({
        message,
        variant: 'error',
      });
    }
  });

  return (
    <div className="mb-8 flex gap-2 justify-end">
      <Button variant="ghost" onClick={handleFormReset}>
        Clear
      </Button>
      <Button
        disabled={form.formState.isSubmitting}
        className="w-[100px]"
        onClick={handleSubmit}
      >
        {form.formState.isSubmitting ? (
          <Spinner className="text-white" />
        ) : (
          'Submit'
        )}
      </Button>
    </div>
  );
}

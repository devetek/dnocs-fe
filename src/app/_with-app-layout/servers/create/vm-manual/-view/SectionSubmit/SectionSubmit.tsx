import { useNavigate } from '@tanstack/react-router';
import { AxiosError } from 'axios';

import { useDialog } from '@/services/dialog';
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

  const { handleFormReset, form } = useForm();

  const handleSubmit = form.handleSubmit(async (values) => {
    const constructedValues = {
      provider: String(values.cloud.provider),
      secret_id: String(values.cloud.sshKeyID),
      address: values.server.address,
      ssh_port: values.server.ssh_port,
      http_port: values.server.http_port,
      domain: values.server.domain,
      default_user: values.login.default_user,
    };

    try {
      const createResponse = await ApiServer.Create.doPost({
        payload: constructedValues,
      });

      if (createResponse.$status !== 'success') throw createResponse;

      const newServerID = createResponse.id;
      if (!newServerID) throw Error('New server ID is empty!');

      const setupResponse = await ApiServer.Setup.$Id.doPost({
        id: newServerID,
      });
      if (setupResponse.$status !== 'success') throw setupResponse;

      openDialog({
        title: 'Successfully created VM!',
        content:
          'The VM is now being set up. In the meantime, would you like to create more machines?',
        variant: 'info',
        actions: [
          {
            label: 'Yes',
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

import { useModalEmit } from '@/services/modal/model/event';
import { useToaster } from '@/services/toaster';

import { ApiCloud } from '@/shared/api';

import { useCpcPropsContext } from '../../config/context';
import { useCpcFormContext } from '../forms/context';
import type { SchemaGcpForm, SchemaIDCloudHostForm, SchemaProxmoxForm } from '../forms/schema';

export default function useModelSubmission() {
  const { onSubmitSuccess } = useCpcPropsContext();
  const { formGCP, formIDCloudHost, formBase, formProxmox } = useCpcFormContext();

  const [openToaster] = useToaster();
  const emitModal = useModalEmit();

  const handleSubmitGCP = async () => {
    return new Promise<SchemaGcpForm | undefined>((resolve) => {
      formGCP.handleSubmit(
        (data) => resolve(data),
        () => resolve(undefined),
      )();
    });
  };

  const handleSubmitIDCloudHost = async () => {
    return new Promise<SchemaIDCloudHostForm | undefined>((resolve) => {
      formIDCloudHost.handleSubmit(
        (data) => resolve(data),
        () => resolve(undefined),
      )();
    });
  };

  const handleSubmitProxmox = async () => {
    return new Promise<SchemaProxmoxForm | undefined>((resolve) => {
      formProxmox.handleSubmit(
        (data) => resolve(data),
        () => resolve(undefined),
      )();
    });
  };

  const handleSubmit = formBase.handleSubmit(async (baseData) => {
    let credential: Record<string, unknown> | undefined;

    switch (baseData.cloudProvider) {
      case 'gcp':
        credential = await handleSubmitGCP();
        break;

      case 'proxmox': {
        const proxmoxData = await handleSubmitProxmox();
        credential = proxmoxData?.credential;
        break;
      }

      case 'IDCloudHost':
        credential = await handleSubmitIDCloudHost();
        break;
    }

    if (!credential) return;

    emitModal('%%modal/allow-trivial-close', false);

    const response = await ApiCloud.Project.Create.doPost({
      credential,
      name: baseData.metaTitle,
      cloudProvider: baseData.cloudProvider,
    });

    if (response.$status === 'failed') {
      openToaster({
        title: <>Error while creating cloud project</>,
        message: response.error.message,
        variant: 'error',
        duration: 5000,
      });

      emitModal('%%modal/allow-trivial-close', true);
      return;
    }

    emitModal('%%modal/close', null);
    openToaster({
      variant: 'success',
      message: <>Successfully created new cloud project!</>,
    });

    onSubmitSuccess();
  });

  const isSubmitting =
    formBase.formState.isSubmitting ||
    formIDCloudHost.formState.isSubmitting ||
    formGCP.formState.isSubmitting ||
    formProxmox.formState.isSubmitting;

  return {
    handleSubmit,
    isSubmitting,
  };
}

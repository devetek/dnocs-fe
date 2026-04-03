import { useWatch } from 'react-hook-form';

import { ModalLayoutGeneral } from '@/services/modal/ui/presentation';

import { CpcPropsContext } from '../config/context';
import { CpcFormContext, useCpcFormContext } from '../model/forms/context';

import { FormBase } from './FormBase';
import { FormGCP } from './FormGCP';
import { FormIDCloudHost } from './FormIDCloudHost';
import { FormProxmox } from './FormProxmox';
import type { CloudProjectCreateModalProps as Props } from './types';

const CloudProviderForm = () => {
  const { formBase } = useCpcFormContext();

  const cloudProvider = useWatch({
    control: formBase.control,
    name: 'cloudProvider',
  });

  switch (cloudProvider) {
    case 'IDCloudHost':
      return <FormIDCloudHost />;

    case 'gcp':
      return <FormGCP />;

    case 'proxmox':
      return <FormProxmox />;
  }
};

export default function CloudProjectCreateModal(props: Props) {
  return (
    <ModalLayoutGeneral maxWidth="632px">
      <ModalLayoutGeneral.Title
        canClickClose
        title="Connect Cloud Account"
        description="Give this connection a name, pick your cloud provider, then paste the API token or upload credentials. Once connected, you can create resources directly from dNocs."
      />

      <ModalLayoutGeneral.Content>
        <CpcPropsContext value={props}>
          <CpcFormContext>
            <FormBase />

            <CloudProviderForm />
          </CpcFormContext>
        </CpcPropsContext>
      </ModalLayoutGeneral.Content>
    </ModalLayoutGeneral>
  );
}

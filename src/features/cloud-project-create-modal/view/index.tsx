import { useWatch } from 'react-hook-form';

import { ModalLayoutGeneral } from '@/services/modal/ui/presentation';

import { CpcPropsContext } from '../config/context';
import { CpcFormContext, useCpcFormContext } from '../model/forms/context';

import { FormBase } from './FormBase';
import { FormGCP } from './FormGCP';
import { FormIDCloudHost } from './FormIDCloudHost';
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
  }
};

export default function CloudProjectCreateModal(props: Props) {
  return (
    <ModalLayoutGeneral maxWidth="632px">
      <ModalLayoutGeneral.Title
        canClickClose
        title="Create new Cloud Project"
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

import Layout from '@/services/sidepanel/ui/presentation/Layout/General';

import { ApplicationSetupEditModelProvider as ModelProvider } from '../model';
import type { ApplicationSetupEditSidepanelProps as Props } from '../rules/types';
import useFormSubmissionUsecase from '../usecase/form-submission';

import Actions from './Actions';
import Forms from './Forms';

const Controller = () => {
  useFormSubmissionUsecase();

  return null;
};

export default function ApplicationSetupEditSidepanel(props: Props) {
  const { applicationName, applicationId } = props;

  return (
    <ModelProvider {...props}>
      <Controller />

      <Layout classNameFrame="max-w-[520px]">
        <Layout.Title
          title="Edit Setup Configuration"
          subtitle={applicationName || `Id: ${applicationId}`}
          hasCloseButton
        />

        <Layout.Content>
          <Forms />
        </Layout.Content>

        <Layout.Cta className="gap-y-2">
          <Actions />
        </Layout.Cta>
      </Layout>
    </ModelProvider>
  );
}

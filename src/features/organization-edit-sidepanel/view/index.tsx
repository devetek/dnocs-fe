import Layout from '@/services/sidepanel/ui/presentation/Layout/General';

import { DisclaimersLabel } from '@/widgets/disclaimers-label';

import { OrgEditModelProvider as ModelProvider } from '../model';
import type { OrgEditSidepanelProps as Props } from '../rules/types';
import useFormBhvGuardUsecase from '../usecase/form-bhv-guard';
import useFormSubmissionUsecase from '../usecase/form-submission';

import Actions from './Actions';
import Forms from './Forms';

const Controller = () => {
  useFormBhvGuardUsecase();
  useFormSubmissionUsecase();

  return null;
};

export default function OrgEditSidepanel(props: Props) {
  const { orgId, name } = props;

  return (
    <ModelProvider {...props}>
      <Controller />

      <Layout>
        <Layout.Title
          title="Edit Team"
          subtitle={name || `Id: ${orgId}`}
          hasCloseButton
        />

        <Layout.Content>
          <Forms />
        </Layout.Content>

        <Layout.Cta className="gap-y-2">
          <DisclaimersLabel.ImmediatelyCommitOnSave />
          <Actions />
        </Layout.Cta>
      </Layout>
    </ModelProvider>
  );
}

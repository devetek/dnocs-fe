import { useDevetekTranslations } from '@/services/i18n';
import Layout from '@/services/sidepanel/ui/presentation/Layout/General';

import { DisclaimersLabel } from '@/widgets/disclaimers-label';

import { ApplicationEditModelProvider as ModelProvider } from '../model';
import { GitBranchModelProvider } from '../model/git-branch';
import type { ApplicationEditSidepanelProps as Props } from '../rules/types';
import useFormBhvGuardUsecase from '../usecase/form-bhv-guard';
import useFormSubmissionUsecase from '../usecase/form-submission';

import Actions from './Actions';
import Forms from './Forms';

const Controller = () => {
  useFormBhvGuardUsecase();
  useFormSubmissionUsecase();

  return null;
};

export default function ApplicationEditSidepanel(props: Props) {
  const { applicationName, applicationId, repoName, repoOrganization } = props;

  const t = useDevetekTranslations();

  return (
    <ModelProvider {...props}>
      <GitBranchModelProvider
        repoName={repoName}
        repoOrganization={repoOrganization}
      >
        <Controller />

        <Layout>
          <Layout.Title
            title={t('sidepanel.editApplication.title')}
            subtitle={applicationName || `Id: ${applicationId}`}
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
      </GitBranchModelProvider>
    </ModelProvider>
  );
}

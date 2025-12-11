import { useDevetekTranslations } from '@/services/i18n';
import Layout from '@/services/sidepanel/ui/presentation/Layout/General';

import { DisclaimersLabel } from '@/widgets/disclaimers-label';

import { ArtifactNewGeneralModelProvider } from '../model/general';
import { GitBranchModelProvider } from '../model/git-branch';
import { WorkersModelProvider } from '../model/workers';
import type { ArtifactNewSidepanelProps as Props } from '../rules/types';
import useFormBhvGuardUsecase from '../usecase/form-bhv-guard';
import useFormSubmissionUsecase from '../usecase/form-submission';

import Actions from './Actions';
import Forms from './Forms';

const Controller = () => {
  useFormBhvGuardUsecase();
  useFormSubmissionUsecase();

  return null;
};

export default function ArtifactNewSidepanel(props: Props) {
  const { repoName, repoOrganization } = props;

  const t = useDevetekTranslations();

  return (
    <ArtifactNewGeneralModelProvider {...props}>
      <GitBranchModelProvider
        repoName={repoName}
        repoOrganization={repoOrganization}
      >
        <WorkersModelProvider>
          <Controller />

          <Layout>
            <Layout.Title
              title={t('sidepanel.artifactNew.title')}
              subtitle={t('sidepanel.artifactNew.subtitle')}
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
        </WorkersModelProvider>
      </GitBranchModelProvider>
    </ArtifactNewGeneralModelProvider>
  );
}

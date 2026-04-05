import Layout from '@/services/sidepanel/ui/presentation/Layout/General';
import { useDevetekTranslations } from '@/services/i18n';

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
  const t = useDevetekTranslations();

  return (
    <ModelProvider {...props}>
      <Controller />

      <Layout>
        <Layout.Title
          title={t('sidepanel.editTeam.title')}
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

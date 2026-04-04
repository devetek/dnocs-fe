import { useDevetekTranslations } from '@/services/i18n';
import Layout from '@/services/sidepanel/ui/presentation/Layout/General';

import { DomainRegistrationModelProvider } from '../-model/general';
import type { SidepanelProps } from '../-rules/types';
import useContextualBehavior from '../-usecase/use-contextual-behavior';
import useFormSubmissionUsecase from '../-usecase/use-form-submission';

import CtaActions from './CtaActions';
import RegistrationForm from './RegistrationForm';

export default function DomainRegistrationSidepanelView(props: SidepanelProps) {
  const t = useDevetekTranslations();

  return (
    <DomainRegistrationModelProvider {...props}>
      <Controller />

      <Layout>
        <Layout.Title
          title={t('sidepanel.domainRegistration.title')}
          hasCloseButton
        />
        <Layout.Content className="px-0">
          <RegistrationForm />
        </Layout.Content>
        <Layout.Cta>
          <CtaActions />
        </Layout.Cta>
      </Layout>
    </DomainRegistrationModelProvider>
  );
}

function Controller() {
  useFormSubmissionUsecase();
  useContextualBehavior();
  return null;
}

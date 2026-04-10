import { useWatch } from 'react-hook-form';

import { useDevetekTranslations } from '@/services/i18n';
import Layout from '@/services/sidepanel/ui/presentation/Layout/General';

import { cn } from '@/shared/libs/tailwind/cn';

import { useSubscribe } from '../-models/events';
import { FormProvider, useLbCreationForm } from '../-models/form';
import { ResourcesModelProvider } from '../-models/resources';
import type { SidepanelProps } from '../-rules/types';
import useContextualBehavior from '../-usecase/use-contextual-behavior';
import useFormSubmissionUsecase from '../-usecase/use-form-submission';

import CreationForm from './CreationForm';
import CtaActions from './CtaActions';

export default function LoadBalancerCreationSidepanelView(
  props: SidepanelProps,
) {
  useSubscribe('#load-balancer-creation-sidepanel/on-success', props.onSuccess);

  return (
    <ResourcesModelProvider {...props}>
      <FormProvider>
        <Controller />
        <ViewContent />
      </FormProvider>
    </ResourcesModelProvider>
  );
}

function ViewContent() {
  const t = useDevetekTranslations();

  const form = useLbCreationForm();

  const lbKind = useWatch({ control: form.control, name: 'lbKind' });

  const cnLayout = cn(
    'w-[calc(100svw-16px)]',
    lbKind === 'l7' ? 'max-w-[1200px]' : 'max-w-[400px]',
  );

  return (
    <Layout classNameFrame={cnLayout}>
      <Layout.Title
        title={t('sidepanel.loadBalancerCreation.title')}
        hasCloseButton
      />
      <Layout.Content className="px-0 h-full">
        <CreationForm />
      </Layout.Content>
      <Layout.Cta className="border-t">
        <CtaActions />
      </Layout.Cta>
    </Layout>
  );
}

function Controller() {
  useFormSubmissionUsecase();
  useContextualBehavior();
  return null;
}

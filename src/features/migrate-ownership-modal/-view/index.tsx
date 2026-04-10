import { useDevetekTranslations } from '@/services/i18n';
import { ModalLayoutGeneral } from '@/services/modal/ui/presentation';

import { iife } from '@/shared/libs/browser/fn';
import { kebabCaseToCamelCase } from '@/shared/libs/browser/string';

import { PropsModelProvider, usePropsModel } from '../-models';
import { FormProvider } from '../-models/form';
import { ResourcesModelProvider } from '../-models/resources';
import type { MigrateOwnershipModalProps as Props } from '../-rules/types';
import useContextualBehavior from '../-usecase/use-contextual-behavior';
import useFormSubmissionUsecase from '../-usecase/use-form-submission';

import DisclaimerBanner from './-presentation/DisclaimerBanner';
import InfoCard from './-presentation/InfoCard';
import CtaActions from './CtaActions';
import OwnerTransfer from './OwnerTransfer';

export default function MigrateOwnershipModal(props: Props) {
  return (
    <PropsModelProvider {...props}>
      <ResourcesModelProvider>
        <FormProvider>
          <Controller />

          <ModalLayoutGeneral maxWidth="480px">
            <Title />

            <ModalLayoutGeneral.Content>
              <InfoCard mod={props.mod} />

              <OwnerTransfer />

              <DisclaimerBanner />

              <CtaActions />
            </ModalLayoutGeneral.Content>
          </ModalLayoutGeneral>
        </FormProvider>
      </ResourcesModelProvider>
    </PropsModelProvider>
  );
}

function Title() {
  const { mod } = usePropsModel();

  const t = useDevetekTranslations();

  const elSubtitle = iife(() => {
    return t('common.terms.forX', {
      0: iife(() => {
        switch (mod.type) {
          case 'secret-ssh':
            return t('common.terms.ssh');

          case 'cloud-project':
            return t('common.terms.cloudProject');

          default:
            return t(`common.terms.${kebabCaseToCamelCase(mod.type)}`);
        }
      }),
    });
  });

  return (
    <ModalLayoutGeneral.Title
      canClickClose
      title={t('modal.migrateOwnership.title')}
      description={elSubtitle}
    />
  );
}

function Controller() {
  useContextualBehavior();
  useFormSubmissionUsecase();

  return null;
}

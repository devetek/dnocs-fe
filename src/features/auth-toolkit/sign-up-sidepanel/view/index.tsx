import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';

import { useDevetekTranslations } from '@/services/i18n';
import Layout from '@/services/sidepanel/ui/presentation/Layout/General';

import { iife } from '@/shared/libs/browser/iife';
import { Button } from '@/shared/presentation/atoms/ButtonV2';
import type { ButtonState } from '@/shared/presentation/atoms/ButtonV2/types';
import { DisclaimersLabel } from '@/widgets/disclaimers-label';

import { schemaSignUpForm } from '../rules/login';
import useContextualBehavior from '../usecase/use-contextual-behavior';
import useSubmitUsecase from '../usecase/use-submit';

import InputField from './-presentation/InputField';

const Content = () => {
  const t = useDevetekTranslations();

  const [handleClickSubmit, { submitState }] = useSubmitUsecase();

  const { handleCloseSidepanel, onlyStrictClosing } = useContextualBehavior();

  const blockActions = submitState === 'loading' || submitState === 'success';

  const buttonState: ButtonState = iife(() => {
    if (submitState === 'failed') {
      return 'initial';
    }

    return submitState || 'initial';
  });

  return (
    <Layout>
      <Layout.Title
        title={t('sidepanel.signUp.title')}
        hasCloseButton={!onlyStrictClosing}
      />

      <Layout.Content className="flex flex-col w-full gap-y-3">
        <InputField formName="email" inputType="email" />
        <InputField formName="username" inputType="text" />
        <InputField formName="password" inputType="password" />
        <InputField formName="confirmPassword" inputType="password" />
      </Layout.Content>

      <Layout.Cta className="gap-y-2">
        <DisclaimersLabel.ImmediatelyCommitOnSave />

        <Button.Action onClick={handleClickSubmit} buttonState={buttonState}>
          {t('common.actions.signUp')}
        </Button.Action>
        <Button
          disabled={blockActions}
          buttonColor="secondary"
          onClick={handleCloseSidepanel}
        >
          {t('common.actions.login')}
        </Button>
      </Layout.Cta>
    </Layout>
  );
};

export default function SignUpSidepanel() {
  const form = useForm({
    resolver: zodResolver(schemaSignUpForm),
    defaultValues: {
      confirmPassword: '',
      email: '',
      password: '',
      username: '',
    },
  });

  return (
    <FormProvider {...form}>
      <Content />
    </FormProvider>
  );
}

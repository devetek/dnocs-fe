import { useState } from 'react';

import { useFormContext } from 'react-hook-form';

import { useDevetekTranslations } from '@/services/i18n';
import { useSidepanelEmit } from '@/services/sidepanel/model/event';
import { useToaster } from '@/services/toaster';

import { ApiUser } from '@/shared/api';

import type { SignUpForm } from '../rules/login';

export default function useSubmitUsecase() {
  const form = useFormContext<SignUpForm>();

  const sidepanelEmit = useSidepanelEmit();

  const t = useDevetekTranslations();

  const [openToaster] = useToaster();

  const [submitState, setSubmitState] = useState<
    'loading' | 'success' | 'failed'
  >();

  const handleSubmit = form.handleSubmit(async (payload) => {
    const { username, email, password, confirmPassword } = payload;

    setSubmitState('loading');

    const response = await ApiUser.Register.doPost({
      payload: {
        confirm: confirmPassword,
        username,
        email,
        password,
      },
    });

    if (response.$status === 'failed') {
      setSubmitState('failed');

      openToaster({
        variant: 'error',
        title: t('toaster.signUp.error', {
          email,
        }),
        message: response.error.message,
      });
      return;
    }

    setSubmitState('success');

    openToaster({
      variant: 'info',
      message: t('toaster.signUp.success'),
    });

    sidepanelEmit('%%sidepanel/close', null);
  });

  return [handleSubmit, { submitState }] as const;
}

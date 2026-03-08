import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { useDevetekTranslations } from '@/services/i18n';

import LoginButton from '../-presentation/LoginButton';
import LoginField from '../-presentation/LoginField';
import { schemaLoginTraditional } from '../-rules/login';
import useLoginUsecase from '../-usecase/use-login';
import { useForgotPasswordModal } from '../../forgot-password-modal';
import { useSignUpSidepanel } from '../../sign-up-sidepanel';

export default function LoginForm() {
  const t = useDevetekTranslations();

  const [openModalForgotPassword] = useForgotPasswordModal();
  const [openSidepanelSignUp] = useSignUpSidepanel();

  const { handleLoginTraditional, handleLoginWithGoogle } = useLoginUsecase();

  const form = useForm({
    resolver: zodResolver(schemaLoginTraditional),
  });

  const handleClickLoginTraditional = async () => {
    if (!(await form.trigger())) {
      throw Error('Invalid fields');
    }

    await handleLoginTraditional(form.getValues());
  };

  const handleClickForgotPassword = () => {
    openModalForgotPassword({});
  };

  const handleClickSignUp = () => {
    openSidepanelSignUp({});
  };

  return (
    <div className="flex justify-center items-center">
      <div className="flex flex-col items-start">
        <h1 className="text-2xl font-medium text-primary/30">
          {t('page.landing.asideLogin.welcomeBack')}
        </h1>
        <h1 className="text-2xl font-medium text-primary mb-4">
          {t('page.landing.asideLogin.pleaseLogIntoYourAcc')}
        </h1>

        <LoginButton variant="with-google" onClick={handleLoginWithGoogle} />

        <div className="relative mt-4 w-full flex justify-center">
          <div className="absolute top-1/2 w-full h-0.25 border-t border-dashed border-primary/15" />
          <p className="relative text-xs text-primary/30 bg-background px-2">
            {t('page.landing.asideLogin.orSignInWith')}
          </p>
        </div>

        <div className="mt-4 w-full flex flex-col gap-y-2">
          <LoginField form={form} formName="email" />
          <LoginField
            form={form}
            formName="password"
            appendSlot={
              <LoginField.ForgotPasswordCta
                onClick={handleClickForgotPassword}
              />
            }
          />
        </div>

        <LoginButton
          className="mt-4"
          variant="traditional"
          onClick={handleClickLoginTraditional}
        />

        <div className="mt-8 w-full flex justify-center">
          <a
            className="text-xs text-primary/70 bg-background px-2 group cursor-pointer"
            onClick={handleClickSignUp}
          >
            {t('page.landing.asideLogin.dontHaveAnAccQM')}&nbsp;
            <strong className="group-hover:underline">
              {t('common.actions.signUp')}.
            </strong>
          </a>
        </div>
      </div>
    </div>
  );
}

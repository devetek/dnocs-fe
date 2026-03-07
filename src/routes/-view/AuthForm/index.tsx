import { useAuthEmit } from '@/services/auth/model/events';
import { useAuthBase } from '@/services/auth/usecase';
import { useDevetekTranslations } from '@/services/i18n';

import {
  LoggedInGreeting,
  LoginForm,
} from '@/features/auth-toolkit/login-widget';

import { Spinner } from '@/shared/presentation/atoms/Spinner';
import { FailedState } from '@/widgets/failed-state';

export default function AuthForm() {
  const t = useDevetekTranslations();

  const authBase = useAuthBase();
  const authEmit = useAuthEmit();

  if (authBase.$status === 'success') {
    return authBase.isLoggedIn ? <LoggedInGreeting /> : <LoginForm />;
  }

  if (authBase.$status === 'failed') {
    const handleRefresh = () => {
      authEmit('%%auth/refresh', null);
    };

    return (
      <div className="w-full h-full flex items-center justify-center">
        <FailedState.WallCentered
          errorPayload={authBase.error.message}
          ctaText={t('common.actions.retry')}
          ctaOnClick={handleRefresh}
        />
      </div>
    );
  }

  return (
    <div className="w-full h-full flex items-center justify-center">
      <Spinner />
    </div>
  );
}

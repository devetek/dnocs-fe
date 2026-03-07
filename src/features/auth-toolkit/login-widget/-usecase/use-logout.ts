import { useNavigate } from '@tanstack/react-router';

import { useAuthEmit } from '@/services/auth/model/events';
import { useDevetekTranslations } from '@/services/i18n';
import { useToaster } from '@/services/toaster';

import { ApiAuth } from '@/shared/api';
import useHandler from '@/shared/libs/react-hooks/useHandler';

export default function useLogoutUsecase() {
  const t = useDevetekTranslations();

  const navigate = useNavigate();

  const authEmit = useAuthEmit();

  const [pushToast] = useToaster();

  const handleLogout = useHandler(async (redirect = true) => {
    const response = await ApiAuth.Logout.doLogout();

    if (response.$status === 'failed') {
      pushToast({
        variant: 'error',
        title: t('toaster.logout.error'),
        message: response.error.message,
      });

      throw response.error;
    }

    localStorage.clear();
    authEmit('%%auth/refresh', null);

    if (redirect) {
      navigate({
        to: '/',
        replace: true,
      });
      return;
    }
  });

  return { handleLogout };
}

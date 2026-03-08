import { useNavigate } from '@tanstack/react-router';
import { LayoutDashboard, LogOutIcon, UserIcon } from 'lucide-react';

import { useAuthLoggedIn } from '@/services/auth/usecase';
import { useDevetekTranslations } from '@/services/i18n';

import { Button } from '@/shared/presentation/atoms/ButtonV2';

import UserAvatar from '../-presentation/UserAvatar';
import useLogoutUsecase from '../-usecase/use-logout';

export default function LoggedInGreeting() {
  const t = useDevetekTranslations();

  const navigate = useNavigate();

  const { userProfile } = useAuthLoggedIn();

  const { handleLogout } = useLogoutUsecase();

  const handleClickLogout = () => {
    handleLogout(true);
  };

  const handleGoToDashboard = () => {
    navigate({
      to: '/dashboard',
    });
  };

  const handleGoToViewProfile = () => {
    navigate({
      to: '/profile',
    });
  };

  return (
    <div className="flex justify-center items-center">
      <div className="flex flex-col items-center w-80">
        <UserAvatar imgSrc={userProfile.avatarSrc} />

        <h1 className="pt-6 text-2xl font-medium text-primary/30">
          {t('page.landing.asideGreeting.helloAgain')}
        </h1>
        <h1 className="text-2xl font-medium text-primary mb-4">
          {userProfile.fullname || userProfile.email}
        </h1>

        <div className="flex flex-col w-full gap-y-2">
          <Button buttonStyle="3d" onClick={handleGoToDashboard}>
            <LayoutDashboard />
            {t('page.landing.asideGreeting.goToDashboard')}
          </Button>

          <div className="grid grid-cols-2 gap-x-2">
            <Button
              buttonStyle="3d"
              buttonColor="secondary"
              onClick={handleGoToViewProfile}
            >
              <UserIcon />
              {t('page.landing.asideGreeting.viewProfile')}
            </Button>

            <Button
              buttonStyle="3d"
              buttonColor="secondary"
              danger
              onClick={handleClickLogout}
            >
              <LogOutIcon />
              {t('page.landing.asideGreeting.logout')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

import type { ReactNode } from 'react';
import { useEffect } from 'react';

import { useAuthBase } from '@/services/auth/usecase';

import { FailedState } from '@/widgets/failed-state';

import AppSkeleton from '../presentation/AppSkeleton';

interface GuardProps {
  children: ReactNode;
}

export default function AuthGuard({ children }: GuardProps) {
  const authBase = useAuthBase();

  useEffect(() => {
    if (authBase.$status === 'failed') {
      console.error(authBase.error);
    }
  }, [authBase.$status, authBase.error]);

  useEffect(() => {
    if (
      authBase.$status !== 'success' ||
      authBase.isLoggedIn ||
      window.location.pathname === '/'
    )
      return;

    window.location.assign('/');
  }, [authBase]);

  if (authBase.$status === 'loading') {
    return <AppSkeleton />;
  }

  if (authBase.$status === 'failed') {
    const handleClickReload = () => {
      window.location.reload();
    };

    return (
      <div className="w-[100vw] h-[100vh] flex flex-col items-center justify-center">
        <FailedState.WallCentered
          errorPayload={authBase.error.message}
          ctaText="Reload Page"
          ctaOnClick={handleClickReload}
        />
      </div>
    );
  }

  if (!authBase.isLoggedIn) {
    return <AppSkeleton />;
  }

  return <>{children}</>;
}

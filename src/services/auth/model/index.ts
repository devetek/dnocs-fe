import { ApiGitUser, ApiUser } from '@/shared/api';
import { buildContext } from '@/shared/libs/react-factories/buildContext';

import { useAuthSubscribe } from './events';

export const [AuthModelProvider, useAuthModel] = buildContext(
  'AuthModel',
  () => {
    const [resUserProfile, getUserProfile] = ApiUser.Profile.useGet();
    const [resGitUser, getGitUser] = ApiGitUser.useGet();

    useAuthSubscribe('%%auth/user-profile::refresh', () => {
      getUserProfile({ abortInFlight: true });
    });

    useAuthSubscribe('%%auth/git-user::refresh', () => {
      getGitUser({ abortInFlight: true });
    });

    useAuthSubscribe('%%auth/refresh', () => {
      getUserProfile({ abortInFlight: true });
      getGitUser({ abortInFlight: true });
    });

    return {
      resUserProfile,
      resGitUser,
    };
  },
);

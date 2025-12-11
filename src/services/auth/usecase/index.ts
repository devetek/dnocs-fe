import { iife } from '@/shared/libs/browser/iife';

import { useAuthModel } from '../model';

export function useAuthBase() {
  const { resUserProfile, resGitUser } = useAuthModel();

  if (
    resUserProfile.$status === 'initial' ||
    resUserProfile.$status === 'loading' ||
    resGitUser.$status === 'initial' ||
    resGitUser.$status === 'loading'
  ) {
    return {
      $status: 'loading',
    } as const;
  }

  // Check if failed because OTHER THAN NOT logged in
  const axiosNotLoggedIn =
    resUserProfile.$status === 'failed' &&
    resUserProfile.kind === 'api' &&
    Number(resUserProfile.error.status) === 401;

  if (resUserProfile.$status === 'failed' && !axiosNotLoggedIn) {
    return {
      $status: 'failed',
      error: resUserProfile.error,
    } as const;
  }

  const mappedResponse = iife(() => {
    if (resUserProfile.$status !== 'success') return null;

    const { user, github } = resUserProfile;

    if (!user) return null;
    const {
      id,
      avatar_url: avatarSrc,
      email,
      username,
      fullname,
      created_at,
    } = user;

    if (!id) return null;

    const userProfile = {
      id: String(id),
      avatarSrc,
      email,
      username,
      fullname,
      createAt: created_at,
    };

    if (!github.access_token) {
      return {
        userProfile,
      };
    }

    return {
      userProfile,
      githubAccessToken: github.access_token,
    };
  });

  if (!mappedResponse) {
    return {
      $status: 'success',
      isLoggedIn: false,
    } as const;
  }

  return {
    $status: 'success',
    isLoggedIn: true,
    userProfile: mappedResponse.userProfile,
    gitProfile: iife(() => {
      if (resGitUser.$status !== 'success' || !mappedResponse.githubAccessToken)
        return null;

      const { id, login, organizations } = resGitUser;

      return {
        id,
        login,
        organizations,
        githubAccessToken: mappedResponse.githubAccessToken,
      };
    }),
  } as const;
}

export function useAuthLoggedIn() {
  const authBase = useAuthBase();

  if (authBase.$status !== 'success' || !authBase.isLoggedIn) {
    throw Error('useAuthLoggedIn is only allowed in a logged in page!');
  }

  const { gitProfile, userProfile } = authBase;

  return {
    gitProfile,
    userProfile,
  };
}

import { useAuthLoggedIn } from '@/services/auth';

import { useResourcesModel } from '../-models/resources';

export default function useIsGithubLoginRequired() {
  const { gitProfile } = useAuthLoggedIn();

  const [source] = useResourcesModel((s) => [s.appDetails.identity.source.$]);

  if (source.$ !== 'success') {
    return {
      ready: false,
    } as const;
  }

  return {
    ready: true,
    loginRequired: source() === 'repository' && gitProfile === null,
  } as const;
}

import useHandler from '@/shared/libs/react-hooks/useHandler';

import { useAppDataModel } from '../-model/app-data';

export default function useGithubLoginUsecase() {
  const [applicationId] = useAppDataModel((s) => [s.applicationId]);

  const handleUsecase = useHandler(() => {
    const publicEndpoint = import.meta.env.VITE_FRONTEND ?? '';
    const backendEndpoint = import.meta.env.VITE_BACKEND ?? '';
    localStorage.setItem('auth:provider', 'github');
    window.location.href = `${backendEndpoint}/v1/auth/github?state=${encodeURI(
      `${publicEndpoint}/applications/${applicationId}`,
    )}`;
  });

  return [handleUsecase] as const;
}

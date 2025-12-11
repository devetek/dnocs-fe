import useHandler from '@/shared/libs/react-hooks/useHandler';

export default function useGithubLoginUsecase() {
  const handleUsecase = useHandler(() => {
    const publicEndpoint = import.meta.env.VITE_FRONTEND ?? '';
    const backendEndpoint = import.meta.env.VITE_BACKEND ?? '';
    localStorage.setItem('auth:provider', 'github');
    window.location.href = `${backendEndpoint}/v0/auth/github?state=${encodeURI(
      `${publicEndpoint}/v2/applications`,
    )}`;
  });

  return [handleUsecase] as const;
}

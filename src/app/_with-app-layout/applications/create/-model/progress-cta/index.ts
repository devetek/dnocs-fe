import useHandler from '@/shared/libs/react-hooks/useHandler';

import { useFormStore } from '../store/form';

export default function useProgressCta() {
  const [
    progress,
    setProgress,
    appSourceMode,
    appSourceBundleIdent,
    appSourceGithubRepo,
    hostedServerID,
    appName,
    appProgLang,
    appProgLangVersion,
    appPort,
  ] = useFormStore((s) => [
    s.progress,
    s.setProgress,
    s.appSourceMode,
    s.appSourceBundleIdent,
    s.appSourceGithubRepo,
    s.hostedServerID,
    s.appName,
    s.appProgLang,
    s.appProgLangVersion,
    s.appBuildCommand,
    s.appRunCommand,
    s.appPort,
  ]);

  const isPreviousHidden = progress === '1-source';

  const canClickNext = () => {
    switch (progress) {
      case '1-source': {
        return (
          (appSourceMode === 'bundle' && appSourceBundleIdent) ||
          (appSourceMode === 'github' && appSourceGithubRepo)
        );
      }

      case '2-details': {
        const baseCheck = appName;

        if (appSourceMode === 'github') {
          return baseCheck && appProgLang && appProgLangVersion && appPort;
        }

        return baseCheck && hostedServerID;
      }

      case '3-configuration':
        return true;

      case '4-deploy':
        return true;

      default:
        return false;
    }
  };

  const goToPrevious = useHandler(() => {
    switch (progress) {
      case '2-details':
        setProgress('1-source');
        return true;

      case '3-configuration':
        setProgress('2-details');
        return true;

      case '4-deploy':
        setProgress('3-configuration');
        return true;

      default:
        return false;
    }
  });

  const goToNext = useHandler(() => {
    switch (progress) {
      case '1-source':
        setProgress('2-details');
        return true;

      case '2-details':
        setProgress('3-configuration');
        return true;

      case '3-configuration':
        setProgress('4-deploy');
        return true;

      default:
        return false;
    }
  });

  return {
    isPreviousHidden,
    isNextDisabled: !canClickNext(),
    goToPrevious,
    goToNext,
  };
}

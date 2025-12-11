import { useNavigate } from '@tanstack/react-router';

import { useAuthLoggedIn } from '@/services/auth';
import { useDialog } from '@/services/dialog';
import { useToaster } from '@/services/toaster';

import { ApiBundle } from '@/shared/api';
import useHandler from '@/shared/libs/react-hooks/useHandler';

import { useFormStore } from '../store/form';

import { getVarsGit, getVarsLaravel, getVarsWordpress } from './config';

export default function useHandleDeploy() {
  const navigate = useNavigate();
  const { userProfile } = useAuthLoggedIn();

  const formValues = useFormStore((s) => s);

  const [openToaster] = useToaster();
  const [openDialog] = useDialog();

  const compileConfig = (): Record<string, unknown> | null => {
    const {
      appProgLang,
      appProgLangVersion,
      appDomain,
      appName,
      appBuildCommand,
      appRunCommand,
      appPort = 0,
      appSourceBundleIdent,
      appSourceGithubRepo,
      dynamicConfig,
      hostedServerID,
      gitRepoConfig,
    } = formValues;

    if (!appName || !appSourceBundleIdent || !dynamicConfig || !hostedServerID)
      return null;

    const {
      gitProvider = '',
      gitHost = '',
      gitRepository = '',
      gitDefaultBranch = '',
      gitNickname = '',
      gitToken = '',
      gitBranch = '',
      gitHead = '',
      gitHeadDescription = '',
    } = gitRepoConfig || {};

    const {
      db_name: mariadbDbName = '',
      db_user: mariadbUsername = '',
      db_password: mariadbPassword = '',
    } = dynamicConfig['db_config'] || {};

    const envVariables: Array<Record<string, string>> = [];
    const arrEnvs = (
      (dynamicConfig['adv_config']?.['adv_envvar'] as string) || ''
    ).split('\n');

    if (arrEnvs.length > 0) {
      arrEnvs.forEach((env) => {
        if (env === '') return;

        const [key, value] = env.split('=');
        if (!key || !value) return;

        envVariables.push({
          key,
          value,
        });
      });
    }

    if (appSourceGithubRepo) {
      const [repoOrganization, repoName] = appSourceGithubRepo
        .replace('https://github.com/', '')
        .replace('.git', '')
        .split('/');

      return getVarsGit({
        gitProvider,
        gitHost,
        gitRepository,
        gitDefaultBranch,
        gitNickname,
        gitToken,
        gitBranch,
        gitHead,
        gitHeadDescription,
        appProgLang,
        appProgLangVersion,
        appName,
        appPort: Number(appPort),
        repoName: repoName || '',
        appBuildCommand,
        appRunCommand,
        repoOrganization: repoOrganization || '',
        appDomain,
        repoURL: appSourceGithubRepo,
        serverID: hostedServerID,
        userID: Number(userProfile.id),
        mariadbDbName: String(mariadbDbName),
        mariadbUsername: String(mariadbUsername),
        mariadbPassword: String(mariadbPassword),
        envVariables,
      });
    }

    switch (appSourceBundleIdent) {
      case 'wordpress':
        return getVarsWordpress({
          appName,
          appDomain,
          serverID: hostedServerID,
          userID: Number(userProfile.id),
          userName: userProfile.username,
          userEmail: userProfile.email,
          mariadbDbName: String(mariadbDbName),
          mariadbUsername: String(mariadbUsername),
          mariadbPassword: String(mariadbPassword),
          envVariables,
        });

      case 'laravel': {
        const laravelDBConnection = [
          {
            key: 'DB_CONNECTION',
            value: 'mysql',
          },
          {
            key: 'DB_HOST',
            value: 'localhost',
          },
          {
            key: 'DB_PORT',
            value: '3306',
          },
          {
            key: 'DB_DATABASE',
            value: String(mariadbDbName),
          },
          {
            key: 'DB_USERNAME',
            value: String(mariadbUsername),
          },
          {
            key: 'DB_PASSWORD',
            value: String(mariadbPassword),
          },
        ];
        envVariables.push(...laravelDBConnection);

        return getVarsLaravel({
          appName,
          appDomain,
          serverID: hostedServerID,
          userID: Number(userProfile.id),
          mariadbDbName: String(mariadbDbName),
          mariadbUsername: String(mariadbUsername),
          mariadbPassword: String(mariadbPassword),
          envVariables,
        });
      }

      default:
        return null;
    }
  };

  const handleDeploy = useHandler(async () => {
    const compiledConfig = compileConfig();
    if (!compiledConfig) return;

    const response = await ApiBundle.Create.doPost({
      payload: compiledConfig,
    });

    if (response.$status !== 'success') {
      openToaster({
        title: 'Failed to create app!',
        message: response.error.message,
        variant: 'error',
      });
      return;
    }

    openDialog({
      title: 'Successfully created your app!',
      content: 'Now sit back and relax while we prepare your app.',
      variant: 'info',
      actions: {
        variant: 'Ok',
        ok: () => {
          navigate({
            to: '/applications',
            replace: true,
          });
        },
      },
    });
  });

  return {
    handleDeploy,
  };
}

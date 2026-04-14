import { LoaderIcon } from 'lucide-react';

import { useDevetekTranslations } from '@/services/i18n';

import { Card } from '@/shared/presentation/atoms/Card';

import { useFormStore } from '../../-model/store/form';
import { useServersStore } from '../../-model/store/servers';

import { ProgressItem } from './_presentation/ProgressItem';
import type { ProgressItemStatus } from './_presentation/ProgressItem/types';

export default function AsideProgress() {
  const [
    progress,
    appSourceMode,
    appSourceBundleIdent,
    appSourceGithubRepo,
    appName,
    hostedServerID,
  ] = useFormStore((s) => [
    s.progress,
    s.appSourceMode,
    s.appSourceBundleIdent,
    s.appSourceGithubRepo,
    s.appName,
    s.hostedServerID,
  ]);

  const [servers] = useServersStore();

  const t = useDevetekTranslations('page.applicationsCreate.progress');

  let status1: ProgressItemStatus = 'todo';
  let status2: ProgressItemStatus = 'todo';
  let status3: ProgressItemStatus = 'todo';
  let status4: ProgressItemStatus = 'todo';

  switch (progress) {
    case '1-source':
      status1 = 'in-progress';
      break;

    case '2-details':
      status1 = 'checked';
      status2 = 'in-progress';
      break;

    case '3-configuration':
      status1 = 'checked';
      status2 = 'checked';
      status3 = 'in-progress';
      break;

    case '4-deploy':
      status1 = 'checked';
      status2 = 'checked';
      status3 = 'checked';
      status4 = 'in-progress';
      break;
  }

  const progressToNumber = () => {
    return Number(progress.at(0));
  };

  const getStep1Desc = () => {
    if (progressToNumber() < 2) {
      return t('step1.desc');
    }

    if (appSourceMode === 'bundle' && appSourceBundleIdent) {
      return `(Bundle) ${appSourceBundleIdent}`;
    }

    if (appSourceGithubRepo) {
      const formattedRepo = appSourceGithubRepo
        .replace('https://github.com/', '')
        .replace('.git', '');

      return `(GitHub) ${formattedRepo}`;
    }

    return t('step1.desc');
  };

  const getStep2Desc = () => {
    if (
      progressToNumber() > 2 &&
      appName &&
      hostedServerID &&
      servers.$status === 'success'
    ) {
      const serverName = servers.servers.find(
        (server) => server.id === hostedServerID,
      )?.hostname;

      if (serverName) {
        return `${appName}, Server ${serverName}`;
      }
    }

    return t('step2.desc');
  };

  return (
    <Card className="shadow-none rounded-2xl p-6 flex flex-col gap-4">
      <div className="flex gap-2 items-center">
        <LoaderIcon className="w-6 h-6" />
        <h1 className="text-2xl font-semibold">{t('title')}</h1>
      </div>

      <ProgressItem
        step={1}
        stepName={t('step1.title')}
        stepDescription={getStep1Desc()}
        status={status1}
      />
      <ProgressItem
        step={2}
        stepName={t('step2.title')}
        stepDescription={getStep2Desc()}
        status={status2}
      />
      <ProgressItem
        step={3}
        stepName={t('step3.title')}
        stepDescription={t('step3.desc')}
        status={status3}
      />
      <ProgressItem
        step={4}
        stepName={t('step4.title')}
        stepDescription={t('step4.desc')}
        status={status4}
      />
    </Card>
  );
}

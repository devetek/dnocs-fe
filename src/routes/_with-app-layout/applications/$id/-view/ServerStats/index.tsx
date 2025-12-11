import {
  CpuIcon,
  ExternalLinkIcon,
  HardDriveIcon,
  MemoryStickIcon,
  ServerIcon,
} from 'lucide-react';

import { useDevetekTranslations } from '@/services/i18n';

import {
  couple,
  guardedSelects,
} from '@/shared/libs/react-factories/guardedSelect';
import { Spinner } from '@/shared/presentation/atoms/Spinner';

import { useArtifactHistoryModel } from '../../-model/artifact-history';
import { useServerUsageModel } from '../../-model/server-usage';

import { ServerStatsLayout as Layout, UsageLabel } from './_presentation';
import { ServerStatsStates as UIStates } from './_States';

const ServerHostname = () => {
  const [deploymentHistoryStatus, serverSnapshot] = useArtifactHistoryModel(
    (s) => [s.deploymentHistory.$status, s.lastDeployment?.serverSnapshot],
  );

  const t = useDevetekTranslations();

  if (serverSnapshot) {
    const { hostName: serverHostname, id: serverId } = serverSnapshot;

    return (
      <a
        className="cursor-pointer hover:underline text-sm font-bold flex items-center gap-1"
        href={`/v2/resources/servers/${serverId}`}
        target="_blank"
        rel="noreferrer noopener"
      >
        {serverHostname}
        <ExternalLinkIcon className="w-3 h-3" />
      </a>
    );
  }

  if (deploymentHistoryStatus === 'loading') {
    return <Spinner className="size-4" />;
  }

  return (
    <p className="text-sm italic text-primary/70">
      {t('common.terms.unknown')}
    </p>
  );
};

const [guard, useUsageCpu, useUsageDisk, useUsageMemory] = guardedSelects({
  fallbackInitial: UIStates.Initial,
  fallbackLoading: UIStates.Loading,
  fallbackError: UIStates.Failed,
})(
  couple(useServerUsageModel, (s) => s.usageCpu),
  couple(useServerUsageModel, (s) => s.usageDisk),
  couple(useServerUsageModel, (s) => s.usageMemory),
);

export default guard(function ServerStats() {
  const [usageCpu] = useUsageCpu((s) => [s.usedInPercent]);
  const [usageDisk] = useUsageDisk((s) => [s.usedInPercent]);
  const [usageMemory] = useUsageMemory((s) => [s.usedInPercent]);

  const t = useDevetekTranslations();

  return (
    <Layout.Frame>
      <Layout.Row icon={ServerIcon} label={t('common.terms.server')}>
        <ServerHostname />
      </Layout.Row>

      <Layout.Divider />

      <Layout.Row icon={CpuIcon} label={t('common.terms.cpuUsage')}>
        <UsageLabel usagePercentage={usageCpu} />
      </Layout.Row>

      <Layout.Row icon={MemoryStickIcon} label={t('common.terms.ramUsage')}>
        <UsageLabel usagePercentage={usageMemory} />
      </Layout.Row>

      <Layout.Row icon={HardDriveIcon} label={t('common.terms.diskUsage')}>
        <UsageLabel usagePercentage={usageDisk} />
      </Layout.Row>
    </Layout.Frame>
  );
});

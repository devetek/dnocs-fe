import { AdapterServerStatisticsFromDto as AdapterFromDto } from '@/entities/server-statistics/adapter';
import {
  POLL_INTERVAL_MS__CPU,
  POLL_INTERVAL_MS__DISK,
  POLL_INTERVAL_MS__MEMORY,
} from '@/entities/server-statistics/config';

import { ApiServer } from '@/shared/api';
import { useAdapter } from '@/shared/libs/api-client';
import buildSelector from '@/shared/libs/react-factories/buildSelector';

import { useAppDataModel } from './app-data';
import { useSubscribe } from './events';

export const [ServerUsageModelProvider, useServerUsageModel] = buildSelector(
  'ServerUsageModel',
)(() => {
  const [selectedServerId] = useAppDataModel((s) => [s.selectedServerId]);

  const [responseCpuUsage, refreshCpuUsage] =
    ApiServer.Origin.$Id.Cpu.Usage.useGet({
      serverId: selectedServerId,
      options: {
        skip: !selectedServerId,
        refreshIntervalMs: POLL_INTERVAL_MS__CPU,
      },
    });

  const [responseMemUsage, refreshMemUsage] =
    ApiServer.Origin.$Id.Memory.Usage.useGet({
      serverId: selectedServerId,
      options: {
        skip: !selectedServerId,
        refreshIntervalMs: POLL_INTERVAL_MS__MEMORY,
      },
    });

  const [responseDiskUsage, refreshDiskUsage] =
    ApiServer.Origin.$Id.Disk.Usage.useGet({
      serverId: selectedServerId,
      options: {
        skip: !selectedServerId,
        refreshIntervalMs: POLL_INTERVAL_MS__DISK,
      },
    });

  useSubscribe('@applications::detail/server-usage-retry-all', () => {
    refreshCpuUsage();
    refreshMemUsage();
    refreshDiskUsage();
  });

  return {
    usageCpu: useAdapter(responseCpuUsage, (raw) =>
      AdapterFromDto.usageCpu(raw).unwrap(),
    ),
    usageMemory: useAdapter(responseMemUsage, (raw) =>
      AdapterFromDto.usageMemory(raw).unwrap(),
    ),
    usageDisk: useAdapter(responseDiskUsage, (raw) =>
      AdapterFromDto.usageDisk(raw).unwrap(),
    ),
  };
});

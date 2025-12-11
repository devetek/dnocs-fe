import { useEffect } from 'react';

import { AdapterServerStatisticsFromDto } from '@/entities/server-statistics/adapter';
import {
  POLL_INTERVAL_MS__CPU,
  POLL_INTERVAL_MS__DISK,
  POLL_INTERVAL_MS__MEMORY,
} from '@/entities/server-statistics/config';
import type {
  CpuStats,
  DiskStats,
  MemoryStats,
} from '@/entities/server-statistics/rules/schema';
import type { SchemaCommon } from '@/entities/shared/rules/schema';

import { ApiServer } from '@/shared/api';
import { useAdapter } from '@/shared/libs/api-client';
import buildSelector from '@/shared/libs/react-factories/buildSelector';
import useStatsState from '@/shared/libs/react-hooks/useStatsState';

import { useSubscribe } from './events';

export interface ServerStatsModelProps {
  serverId: SchemaCommon.UnitId;
}

export const [ServerStatsModelProvider, useServerStatsModel] = buildSelector(
  'ServerStatsModel',
)((props: ServerStatsModelProps) => {
  const { serverId } = props;

  const [responseCpuUsage, refreshCpuUsage] =
    ApiServer.Origin.$Id.Cpu.Usage.useGet({
      serverId,
      options: {
        refreshIntervalMs: POLL_INTERVAL_MS__CPU,
      },
    });

  const [responseDiskUsage, refreshDiskUsage] =
    ApiServer.Origin.$Id.Disk.Usage.useGet({
      serverId,
      options: {
        refreshIntervalMs: POLL_INTERVAL_MS__DISK,
      },
    });

  const [responseMemoryUsage, refreshMemoryUsage] =
    ApiServer.Origin.$Id.Memory.Usage.useGet({
      serverId,
      options: {
        refreshIntervalMs: POLL_INTERVAL_MS__MEMORY,
      },
    });

  useSubscribe('@servers::detail/server-stats-refresh', () => {
    refreshCpuUsage();
    refreshDiskUsage();
    refreshMemoryUsage();
  });

  const cpuUsage = useAdapter(responseCpuUsage, (raw) =>
    AdapterServerStatisticsFromDto.usageCpu(raw).unwrap(),
  );

  const memoryUsage = useAdapter(responseMemoryUsage, (raw) =>
    AdapterServerStatisticsFromDto.usageMemory(raw).unwrap(),
  );

  const diskUsage = useAdapter(responseDiskUsage, (raw) =>
    AdapterServerStatisticsFromDto.usageDisk(raw).unwrap(),
  );

  const [cpuStatsDataset, addToCpuDataset] = useStatsState<CpuStats>({
    keepLast: 60,
  });

  const [diskStatsDataset, addToDiskDataset] = useStatsState<DiskStats>({
    keepLast: 60,
  });

  const [memoryStatsDataset, addToMemDataset] = useStatsState<MemoryStats>({
    keepLast: 60,
  });

  useEffect(() => {
    if (cpuUsage.$status !== 'success') return;
    addToCpuDataset(cpuUsage);
  }, [addToCpuDataset, cpuUsage]);

  useEffect(() => {
    if (memoryUsage.$status !== 'success') return;
    addToMemDataset(memoryUsage);
  }, [addToMemDataset, memoryUsage]);

  useEffect(() => {
    if (diskUsage.$status !== 'success') return;
    addToDiskDataset(diskUsage);
  }, [addToDiskDataset, diskUsage]);

  return {
    cpu: {
      usage: cpuUsage,
      statsDataset: cpuStatsDataset,
    },
    memory: {
      usage: memoryUsage,
      statsDataset: memoryStatsDataset,
    },
    disk: {
      usage: diskUsage,
      statsDataset: diskStatsDataset,
    },
  };
});

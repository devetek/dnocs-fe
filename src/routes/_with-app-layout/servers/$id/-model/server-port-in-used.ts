import type { SchemaCommon } from '@/entities/shared/rules/schema';

import { ApiServer } from '@/shared/api';
import { useAdapter } from '@/shared/libs/api-client';
import buildSelector from '@/shared/libs/react-factories/buildSelector';

import { useSubscribe } from './events';

export interface ServerPortInUsedModelProps {
  serverId: SchemaCommon.UnitId;
}

export interface PortInUsedItem {
  port: string;
  processName: string;
  processId: string;
  allowFrom: string;
  state: string;
}

export const [ServerPortInUsedModelProvider, useServerPortInUsedModel] =
  buildSelector('ServerPortInUsedModel')((props: ServerPortInUsedModelProps) => {
    const { serverId } = props;

    const [responsePortsInUsed, refreshPortsInUsed] =
      ApiServer.Origin.$Id.PortInUsed.useGet({
        serverId,
      });

    useSubscribe('@servers::detail/server-network-refresh', () => {
      refreshPortsInUsed();
    });

    return {
      portsInUsed: useAdapter(responsePortsInUsed, (raw) => {
        return raw.map((item) => ({
          port: String(item.port ?? '-'),
          processName: item.process_name ?? '-',
          processId: String(item.process_id ?? '-'),
          allowFrom: item.allow_from ?? '-',
          state: item.state ?? '-',
        }));
      }),
    };
  });
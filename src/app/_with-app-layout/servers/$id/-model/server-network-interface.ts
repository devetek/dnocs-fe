import type { SchemaCommon } from '@/entities/shared/rules/schema';

import { ApiServer } from '@/shared/api';
import { useAdapter } from '@/shared/libs/api-client';
import buildSelector from '@/shared/libs/react-factories/buildSelector';

import { useSubscribe } from './events';

export interface ServerNetworkInterfaceModelProps {
  serverId: SchemaCommon.UnitId;
}

export interface NetworkInterfaceItem {
  interfaceName: string;
  address: string;
  ipV4: string;
  ipV6: string;
  subnet: string;
}

export const [ServerNetworkInterfaceModelProvider, useServerNetworkInterfaceModel] =
  buildSelector('ServerNetworkInterfaceModel')(
    (props: ServerNetworkInterfaceModelProps) => {
      const { serverId } = props;

      const [responseNetworkInterfaces, refreshNetworkInterfaces] =
        ApiServer.Origin.$Id.NetworkInterface.useGet({
          serverId,
        });

      useSubscribe('@servers::detail/server-network-refresh', () => {
        refreshNetworkInterfaces();
      });

      return {
        networkInterfaces: useAdapter(responseNetworkInterfaces, (raw) => {
          return raw.flatMap((item) => {
            const interfaceName = item.interface_name ?? '-';
            const interfaceData = item.interface_data ?? [];

            if (interfaceData.length < 1) {
              return [
                {
                  interfaceName,
                  address: '-',
                  ipV4: '-',
                  ipV6: '-',
                  subnet: '-',
                },
              ];
            }

            return interfaceData.map((detail) => ({
              interfaceName,
              address: detail.address ?? '-',
              ipV4: detail.ip_v4 ?? '-',
              ipV6: detail.ip_v6 ?? '-',
              subnet: detail.subnet ?? '-',
            }));
          });
        }),
      };
    },
  );
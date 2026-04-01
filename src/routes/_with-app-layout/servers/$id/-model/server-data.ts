import { AdapterOsServiceFromDto } from '@/entities/os-service/adapter';
import { AdapterServerFromDto } from '@/entities/server/adapter';
import type { SchemaCommon } from '@/entities/shared/rules/schema';

import { ApiServer, ApiService } from '@/shared/api';
import { useAdapter } from '@/shared/libs/api-client';
import buildSelector from '@/shared/libs/react-factories/buildSelector';

import { useSubscribe } from './events';

export interface ServerDataModelProps {
  serverId: SchemaCommon.UnitId;
}

export const [ServerDataModelProvider, useServerDataModel] = buildSelector(
  'ServerDataModel',
)((props: ServerDataModelProps) => {
  const { serverId } = props;

  const [responseServerDetail, refreshServerDetail] =
    ApiServer.Detail.$Id.useGet({
      serverId,
    });

  const [responseServices, refreshServices] =
    ApiService.Origin.$ServerId.useGet({
      serverId,
      pageSize: 5,
      options: {
        skip: responseServerDetail.$status !== 'success',
      },
    });

  const [responseModules, refreshModules] = ApiService.Installed.useGet({
    machineID: Number(serverId),
    options: {
      skip: responseServerDetail.$status !== 'success',
    },
  });

  useSubscribe('@servers::detail/server-detail-refresh', () =>
    refreshServerDetail(),
  );

  useSubscribe('@servers::detail/server-services-refresh', () =>
    refreshServices(),
  );

  useSubscribe('@servers::detail/server-modules-refresh', () =>
    refreshModules(),
  );

  return {
    serverId,
    refreshServerDetail,
    refreshServices,
    refreshModules,
    detail: useAdapter(responseServerDetail, (raw) =>
      AdapterServerFromDto.toServerDetail(raw).unwrap(),
    ),
    services: useAdapter(responseServices, (raw) => {
      const { pagination, services } = raw;

      return {
        pagination,
        list: services.map((service) =>
          AdapterOsServiceFromDto.toOsService(service).unwrap(),
        ),
      };
    }),
    // TODO: Revamp Modules Entity
    modules: useAdapter(responseModules, (raw) => {
      const { pagination, services: modules } = raw;

      return {
        pagination,
        modules,
      };
    }),
  };
});

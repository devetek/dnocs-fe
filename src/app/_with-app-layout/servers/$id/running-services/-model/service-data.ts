import { AdapterOsServiceFromDto } from '@/entities/os-service/adapter';
import { AdapterServerFromDto } from '@/entities/server/adapter';
import type { SchemaCommon } from '@/entities/shared/rules/schema';

import { ApiServer, ApiService } from '@/shared/api';
import { useAdapter } from '@/shared/libs/api-client';
import buildSelector from '@/shared/libs/react-factories/buildSelector';

import { useSubscribe } from './events';
import { useFilterModel } from './filter';

export interface ServiceDataModelProps {
  serverId: SchemaCommon.UnitId;
}

export const [ServiceDataModelProvider, useServiceDataModel] = buildSelector(
  'ServiceDataModel',
)((props: ServiceDataModelProps) => {
  const { serverId } = props;

  const { pagination, searchQuery } = useFilterModel();

  const [responseServerDetail] = ApiServer.Detail.$Id.useGet({
    serverId,
  });

  const [responseServices, refreshServices] =
    ApiService.Origin.$ServerId.useGet({
      serverId,
      page: pagination,
      pageSize: 10,
      searchByName: searchQuery,
    });

  useSubscribe('@servers::services/services-refresh', () => refreshServices());

  return {
    serverId,
    serverDetail: useAdapter(responseServerDetail, (raw) =>
      AdapterServerFromDto.toServerDetail(raw).unwrap(),
    ),
    services: useAdapter(responseServices, (raw) => {
      const { pagination: rawPagination, services } = raw;

      return {
        pagination: rawPagination,
        list: services.map((service) =>
          AdapterOsServiceFromDto.toOsService(service).unwrap(),
        ),
      };
    }),
  };
});

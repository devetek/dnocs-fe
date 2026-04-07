import { useState } from 'react';

import { useAuthLoggedIn } from '@/services/auth';

import { AdapterApplicationFromDto } from '@/entities/application/adapter';
import { AdapterDomainFromDto } from '@/entities/domain/adapter';
import { AdapterServerFromDto } from '@/entities/server/adapter';

import { ApiApplication, ApiDomain, ApiServer } from '@/shared/api';
import { useAdapter } from '@/shared/libs/api-client';
import buildSelector from '@/shared/libs/react-factories/buildSelector';

import { useSubscribe } from './events';

export const [ResourcesModelProvider, useResourcesModel] = buildSelector(
  'LoadBalancerCreationResourcesModel',
)(() => {
  const { userProfile } = useAuthLoggedIn();

  const [qServer, setQServer] = useState('');

  useSubscribe(
    '#load-balancer-creation-sidepanel/resources/server-search',
    setQServer,
  );

  const [responseServers, refreshServers] = ApiServer.Find.useGet({
    userId: userProfile.id,
    searchQuery: qServer,
    page: 1,
    pageSize: 50,
  });

  const [responseApplications, refreshApplications] =
    ApiApplication.Find.useGet({
      name: '',
      page: 1,
      limit: 50,
    });

  const [responseDomains, refreshDomains] = ApiDomain.Find.useGet({
    page: 1,
    perPage: 50,
  });

  useSubscribe(
    '#load-balancer-creation-sidepanel/resources/server-refresh',
    () => {
      refreshServers();
    },
  );

  useSubscribe(
    '#load-balancer-creation-sidepanel/resources/application-refresh',
    () => {
      refreshApplications();
    },
  );

  useSubscribe(
    '#load-balancer-creation-sidepanel/resources/domain-refresh',
    () => {
      refreshDomains();
    },
  );

  return {
    servers: useAdapter(responseServers, (raw) => {
      return {
        list: (raw.machines ?? []).map((machine) =>
          AdapterServerFromDto.toServerCard(machine).unwrap(),
        ),
        pagination: raw.pagination,
      };
    }),
    applications: useAdapter(responseApplications, (raw) => {
      return {
        list: (raw.applications ?? []).map((application) =>
          AdapterApplicationFromDto.toApplicationCard(application).unwrap(),
        ),
        pagination: raw.pagination,
      };
    }),
    domains: useAdapter(responseDomains, (raw) => {
      return {
        list: (raw.domains ?? []).map((domain) =>
          AdapterDomainFromDto.toDomainCard(domain).unwrap(),
        ),
        pagination: raw.pagination,
      };
    }),
  };
});

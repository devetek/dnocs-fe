import { AdapterDomainFromDto } from '@/entities/domain/adapter';

import { ApiDomain } from '@/shared/api';
import { useAdapter } from '@/shared/libs/api-client';
import buildSelector from '@/shared/libs/react-factories/buildSelector';

import { useSubscribe } from './events';
import { useFilterModel } from './filters';

export const [DomainDataModelProvider, useDomainDataModel] = buildSelector(
  'DomainDataModel',
)(() => {
  const { currentPage, searchQuery } = useFilterModel();

  const [response, refresh] = ApiDomain.Find.useGet({
    page: currentPage,
    perPage: 8,
    filterQuery: {
      domain: searchQuery,
    },
  });

  useSubscribe('@domain-dns/data--refresh', () => {
    refresh();
  });

  return {
    domains: useAdapter(response, (raw) => {
      const parsed = (raw.domains || []).map((domain) =>
        AdapterDomainFromDto.toDomainCard(domain).unwrap(),
      );

      return {
        list: parsed,
        pagination: raw.pagination,
      };
    }),
  };
});

import { useState } from 'react';

import { AdapterDomainFromDto } from '@/entities/domain/adapter';

import { ApiDomain } from '@/shared/api';
import useAdapterMany from '@/shared/libs/api-client/hooks/useAdapterMany';
import buildSelector from '@/shared/libs/react-factories/buildSelector';

import type { DomainDetailsSidepanelProps as SidepanelProps } from '../rules/types';

import { useSubscribe } from './events';

export const [DomainDetailsModelProvider, useDomainDetailsModel] =
  buildSelector('DomainDetailsModel')((props: SidepanelProps) => {
    const { domainId } = props;

    const [page, setPage] = useState(1);

    const [responseDetails, refreshDetails] = ApiDomain.Detail.$Id.useGet({
      domainId,
    });

    const [responseOrigin, refreshOrigin] = ApiDomain.Origin.$Id.useGet({
      domainId,
      page,
    });

    useSubscribe('#domain-details-sidepanel/details/refresh', () => {
      refreshDetails();
      refreshOrigin();
    });

    useSubscribe('#domain-details-sidepanel/details/next-page', () => {
      setPage((prev) => prev + 1);
    });

    useSubscribe('#domain-details-sidepanel/details/prev-page', () => {
      setPage((prev) => prev - 1);
    });

    useSubscribe('#domain-details-sidepanel/details/to-page', (newPage) => {
      setPage(newPage);
    });

    return {
      ...props,
      details: useAdapterMany(
        [responseDetails, responseOrigin],
        ([rawDetails, rawOrigin]) => {
          return {
            ...AdapterDomainFromDto.toDomainDetails([
              rawDetails,
              rawOrigin,
            ]).unwrap(),
            pagination: {
              current: rawOrigin.result_info.page,
              totalPage: rawOrigin.result_info.total_pages,
            },
          };
        },
      ),
    };
  });

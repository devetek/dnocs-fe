import { useMemo } from 'react';

import useHandler from '@/shared/libs/react-hooks/useHandler';

import { useDomainDataModel } from '../-models/domain-data';
import { useEmit } from '../-models/events';
import { useFilterModel } from '../-models/filters';

export function useFilterPagination() {
  const { domains } = useDomainDataModel();
  const [currentPage] = useFilterModel((s) => [s.currentPage]);

  const emit = useEmit();

  const handleGoBack = useHandler(() => {
    if (currentPage < 2) return;

    emit('@domain-dns/filters/pagination--set', currentPage - 1);
  });

  const handleGoForward = useHandler(() => {
    if (domains.$status !== 'success') return;
    const { total_page: totalPage } = domains.pagination;

    if (totalPage <= currentPage) return;
    emit('@domain-dns/filters/pagination--set', currentPage + 1);
  });

  const handlePageChange = useHandler((newPage: number) => {
    emit('@domain-dns/filters/pagination--set', newPage);
  });

  const pagination = useMemo(() => {
    if (domains.$status !== 'success') return domains;

    return {
      $status: 'success' as const,
      totalPage: domains.pagination.total_page,
    };
  }, [domains]);

  return {
    currentPage,
    pagination,
    handleGoBack,
    handleGoForward,
    handlePageChange,
  };
}

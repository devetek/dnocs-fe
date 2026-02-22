import { useMemo } from 'react';

import useHandler from '@/shared/libs/react-hooks/useHandler';

import { useEmit } from '../-models/events';
import { useFilterModel } from '../-models/filters';
import { useLbDataModel } from '../-models/lb-data';

export function useFilterPagination() {
  const { loadBalancers } = useLbDataModel();
  const [currentPage] = useFilterModel((s) => [s.currentPage]);

  const emit = useEmit();

  const handleGoBack = useHandler(() => {
    if (currentPage < 2) return;

    emit('@load-balancers/filters/pagination--set', currentPage - 1);
  });

  const handleGoForward = useHandler(() => {
    if (loadBalancers.$status !== 'success') return;
    const { total_page: totalPage } = loadBalancers.pagination;

    if (totalPage <= currentPage) return;
    emit('@load-balancers/filters/pagination--set', currentPage + 1);
  });

  const handlePageChange = useHandler((newPage: number) => {
    emit('@load-balancers/filters/pagination--set', newPage);
  });

  const pagination = useMemo(() => {
    if (loadBalancers.$status !== 'success') return loadBalancers;

    return {
      $status: 'success' as const,
      totalPage: loadBalancers.pagination.total_page,
    };
  }, [loadBalancers]);

  return {
    currentPage,
    pagination,
    handleGoBack,
    handleGoForward,
    handlePageChange,
  };
}

import { useMemo } from 'react';

import useHandler from '@/shared/libs/react-hooks/useHandler';

import { useCloudDataModel } from '../-model/cloud-data';
import { useEmit } from '../-model/events';
import { useFilterModel } from '../-model/filters';

export function useFilterPagination() {
  const { clouds } = useCloudDataModel();
  const [currentPage] = useFilterModel((s) => [s.currentPage]);

  const emit = useEmit();

  const handleGoBack = useHandler(() => {
    if (currentPage < 2) return;
    emit('@cloud-projects/filters/pagination--set', currentPage - 1);
  });

  const handleGoForward = useHandler(() => {
    if (clouds.$status !== 'success') return;
    const { total_page: totalPage } = clouds.pagination;
    if (totalPage <= currentPage) return;
    emit('@cloud-projects/filters/pagination--set', currentPage + 1);
  });

  const handlePageChange = useHandler((newPage: number) => {
    emit('@cloud-projects/filters/pagination--set', newPage);
  });

  const pagination = useMemo(() => {
    if (clouds.$status !== 'success') return clouds;

    return {
      $status: 'success' as const,
      totalPage: clouds.pagination.total_page,
    };
  }, [clouds]);

  return {
    currentPage,
    pagination,
    handleGoBack,
    handleGoForward,
    handlePageChange,
  };
}

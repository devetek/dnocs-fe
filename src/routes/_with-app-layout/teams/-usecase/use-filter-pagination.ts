import { useMemo } from 'react';

import useHandler from '@/shared/libs/react-hooks/useHandler';

import { useOrgDataModel } from '../-model/org-data';
import { useEmit } from '../-model/events';
import { useFilterModel } from '../-model/filters';

export function useFilterPagination() {
  const { organizations } = useOrgDataModel();
  const [currentPage] = useFilterModel((s) => [s.currentPage]);

  const emit = useEmit();

  const handleGoBack = useHandler(() => {
    if (currentPage < 2) return;
    emit('@teams/filters/pagination--set', currentPage - 1);
  });

  const handleGoForward = useHandler(() => {
    if (organizations.$status !== 'success') return;
    const { total_page: totalPage } = organizations.pagination;
    if (totalPage <= currentPage) return;
    emit('@teams/filters/pagination--set', currentPage + 1);
  });

  const handlePageChange = useHandler((newPage: number) => {
    emit('@teams/filters/pagination--set', newPage);
  });

  const pagination = useMemo(() => {
    if (organizations.$status !== 'success') return organizations;

    return {
      $status: 'success' as const,
      totalPage: organizations.pagination.total_page,
    };
  }, [organizations]);

  return {
    currentPage,
    pagination,
    handleGoBack,
    handleGoForward,
    handlePageChange,
  };
}

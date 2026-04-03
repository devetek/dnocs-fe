import { useMemo } from 'react';

import useHandler from '@/shared/libs/react-hooks/useHandler';

import { useAppsDataModel } from '../-model/apps-data';
import { useFilterModel } from '../-model/filters';

export function useFilterPagination() {
  const { applications } = useAppsDataModel();
  const { pagination: currentPage, setPagination } = useFilterModel();

  const handleGoBack = useHandler(() => {
    if (currentPage < 2) return;
    setPagination(currentPage - 1);
  });

  const handleGoForward = useHandler(() => {
    if (applications.$status !== 'success') return;
    const { total_page: totalPage } = applications.pagination;
    if (totalPage <= currentPage) return;
    setPagination(currentPage + 1);
  });

  const handlePageChange = useHandler((newPage: number) => {
    setPagination(newPage);
  });

  const pagination = useMemo(() => {
    if (applications.$status !== 'success') return applications;

    return {
      $status: 'success' as const,
      totalPage: applications.pagination.total_page,
    };
  }, [applications]);

  return {
    currentPage,
    pagination,
    handleGoBack,
    handleGoForward,
    handlePageChange,
  };
}

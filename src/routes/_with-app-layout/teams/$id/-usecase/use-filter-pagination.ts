import { useMemo } from 'react';

import useHandler from '@/shared/libs/react-hooks/useHandler';

import { useMembersDataModel } from '../-model/members-data';
import { useEmit } from '../-model/events';
import { useFilterModel } from '../-model/filters';

export function useFilterPagination() {
  const { members } = useMembersDataModel();
  const [currentPage] = useFilterModel((s) => [s.currentPage]);

  const emit = useEmit();

  const handleGoBack = useHandler(() => {
    if (currentPage < 2) return;
    emit('@team-members/filters/pagination--set', currentPage - 1);
  });

  const handleGoForward = useHandler(() => {
    if (members.$status !== 'success') return;
    const { total_page: totalPage } = members.pagination;
    if (totalPage <= currentPage) return;
    emit('@team-members/filters/pagination--set', currentPage + 1);
  });

  const handlePageChange = useHandler((newPage: number) => {
    emit('@team-members/filters/pagination--set', newPage);
  });

  const pagination = useMemo(() => {
    if (members.$status !== 'success') return members;

    return {
      $status: 'success' as const,
      totalPage: members.pagination.total_page,
    };
  }, [members]);

  return {
    currentPage,
    pagination,
    handleGoBack,
    handleGoForward,
    handlePageChange,
  };
}

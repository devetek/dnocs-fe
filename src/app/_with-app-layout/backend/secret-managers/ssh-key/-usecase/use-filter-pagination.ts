import { useMemo } from 'react';

import useHandler from '@/shared/libs/react-hooks/useHandler';

import { useSshKeyDataModel } from '../-model/ssh-key-data';
import { useEmit } from '../-model/events';
import { useFilterModel } from '../-model/filters';

export function useFilterPagination() {
  const { sshKeys } = useSshKeyDataModel();
  const [currentPage] = useFilterModel((s) => [s.currentPage]);

  const emit = useEmit();

  const handleGoBack = useHandler(() => {
    if (currentPage < 2) return;
    emit('@ssh-keys/filters/pagination--set', currentPage - 1);
  });

  const handleGoForward = useHandler(() => {
    if (sshKeys.$status !== 'success') return;
    const { total_page: totalPage } = sshKeys.pagination;
    if (totalPage <= currentPage) return;
    emit('@ssh-keys/filters/pagination--set', currentPage + 1);
  });

  const handlePageChange = useHandler((newPage: number) => {
    emit('@ssh-keys/filters/pagination--set', newPage);
  });

  const pagination = useMemo(() => {
    if (sshKeys.$status !== 'success') return sshKeys;

    return {
      $status: 'success' as const,
      totalPage: sshKeys.pagination.total_page,
    };
  }, [sshKeys]);

  return {
    currentPage,
    pagination,
    handleGoBack,
    handleGoForward,
    handlePageChange,
  };
}

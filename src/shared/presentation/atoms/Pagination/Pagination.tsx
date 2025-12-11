import type { JSX } from 'react';

import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';

import { useBreakpoint } from '@/shared/libs/react-hooks/useBreakpoint';

import { Button } from '../Button';

export default function Pagination(props: PaginationProps) {
  const { currentPage, maxPage, onPageChange } = props;

  const bpSm = useBreakpoint('sm');
  const bpLg = useBreakpoint('lg');

  const handleClickChevronLeft = () => {
    onPageChange?.(currentPage - 1);
  };

  const handleClickChevronRight = () => {
    onPageChange?.(currentPage + 1);
  };

  const renderButton = (page: number, index: number) => {
    const handleClickPage = () => {
      onPageChange?.(page);
    };

    return (
      <Button
        key={index}
        className="p-2 w-6"
        variant={page === currentPage ? 'default' : 'ghost'}
        onClick={handleClickPage}
      >
        {page}
      </Button>
    );
  };

  const pageSlices = [
    ...new Set([
      1,
      bpLg ? Math.abs(currentPage - 3) : null,
      bpSm ? Math.abs(currentPage - 2) : null,
      Math.abs(currentPage - 1),
      currentPage,
      currentPage + 1,
      bpSm ? currentPage + 2 : null,
      bpLg ? currentPage + 3 : null,
      maxPage,
    ]),
  ];

  const elPagination: JSX.Element[] = [];
  let hasSpaced = false;

  for (let pageIndex = 0; pageIndex < maxPage; pageIndex++) {
    const hasPage = pageSlices.find((page) => page === pageIndex + 1);

    if (hasPage) {
      hasSpaced = false;
      elPagination.push(renderButton(pageIndex + 1, pageIndex));
      continue;
    }

    if (!hasSpaced) {
      elPagination.push(
        <Button key={pageIndex} disabled className="p-2 w-5" variant="ghost">
          ...
        </Button>,
      );
      hasSpaced = true;
    }
  }

  return (
    <div className="flex items-center gap-1">
      <Button
        className="p-2"
        variant="ghost"
        disabled={currentPage === 1}
        onClick={handleClickChevronLeft}
      >
        <ChevronLeftIcon className="w-[24px]! h-[24px]!" />
      </Button>

      {elPagination}

      <Button
        className="p-2"
        variant="ghost"
        disabled={currentPage >= maxPage}
        onClick={handleClickChevronRight}
      >
        <ChevronRightIcon className="w-[24px]! h-[24px]!" />
      </Button>
    </div>
  );
}

export interface PaginationProps {
  currentPage: number;
  maxPage: number;
  onPageChange?: (newPage: number) => void;
}

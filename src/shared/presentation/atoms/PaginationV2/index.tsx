import type { JSX } from 'react';
import { useMemo, useRef, useState } from 'react';

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  EllipsisIcon,
  Maximize2,
} from 'lucide-react';

import { useBreakpoint } from '@/shared/libs/react-hooks/useBreakpoint';
import useClickOutside from '@/shared/libs/react-hooks/useClickOutside';
import { cn } from '@/shared/libs/tailwind/cn';

import type {
  NavButtonProps,
  PaginationRowsProps,
  PaginationV2Props,
} from './types';

const NavButton = (props: NavButtonProps) => {
  const { icon, isDisabled, onClick } = props;

  const handleClick = () => {
    if (isDisabled) return;

    onClick?.();
  };

  const Icon = useMemo(() => {
    switch (icon) {
      case 'back':
        return ChevronLeftIcon;

      case 'forward':
        return ChevronRightIcon;
    }
  }, [icon]);

  const cnButton = cn('p-2 transition-all', {
    'rounded-l-full': icon === 'back',
    'rounded-r-full': icon === 'forward',
    'hover:bg-card': !isDisabled,
    'cursor-no-drop': isDisabled,
  });

  return (
    <button
      className={cnButton}
      onClick={handleClick}
      aria-disabled={isDisabled}
    >
      <Icon
        className="size-5 text-primary data-[disabled=true]:opacity-40"
        data-disabled={isDisabled}
      />
    </button>
  );
};

const PaginationRows = (props: PaginationRowsProps) => {
  const { currentPage, totalPage, ref, onPageChange } = props;

  const bpSm = useBreakpoint('sm');
  const bpLg = useBreakpoint('lg');

  const renderButton = (page: number, index: number) => {
    const handleClickPage = () => {
      onPageChange?.(page);
    };

    const cnButton = cn('px-2.25 my-1 rounded', {
      'bg-card shadow border not-dark:border-transparent text-primary font-semibold':
        page === currentPage,
      'hover:font-semibold': page !== currentPage,
    });

    return (
      <button key={index} className={cnButton} onClick={handleClickPage}>
        {page}
      </button>
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
      totalPage,
    ]),
  ];

  const elPagination: JSX.Element[] = [];
  let hasSpaced = false;

  for (let pageIndex = 0; pageIndex < totalPage; pageIndex++) {
    const hasPage = pageSlices.find((page) => page === pageIndex + 1);

    if (hasPage) {
      hasSpaced = false;
      elPagination.push(renderButton(pageIndex + 1, pageIndex));
      continue;
    }

    if (!hasSpaced) {
      elPagination.push(
        <button key={pageIndex} disabled className="px-2.25">
          <EllipsisIcon className="size-4" />
        </button>,
      );
      hasSpaced = true;
    }
  }

  return (
    <div ref={ref} className="flex items-center px-1">
      {elPagination}
    </div>
  );
};

export default function PaginationV2(props: PaginationV2Props) {
  const {
    alwaysShowPaginationRows,
    currentPage,
    totalPage,
    renderPageInfo: RenderPageInfoComponent,
    onPageChange,
    onClickBack,
    onClickForward,
  } = props;

  const [showPaginationRows, setShowPaginationRows] = useState(false);

  const refPaginationRows = useRef<HTMLDivElement>(null);

  useClickOutside(refPaginationRows, () => {
    setShowPaginationRows(false);
  });

  const renderPaginationRows = () => {
    return (
      <PaginationRows
        ref={refPaginationRows}
        currentPage={currentPage}
        totalPage={totalPage}
        onPageChange={(newPage) => {
          setShowPaginationRows(false);
          onPageChange?.(newPage);
        }}
      />
    );
  };

  let elPaginationContent = <></>;

  if (alwaysShowPaginationRows || showPaginationRows) {
    elPaginationContent = renderPaginationRows();
  } else {
    let elRenderedPageInfo =
      RenderPageInfoComponent != null ? (
        <RenderPageInfoComponent
          currentPage={currentPage}
          totalPage={totalPage}
        />
      ) : null;

    if (typeof elRenderedPageInfo === 'string') {
      elRenderedPageInfo = (
        <p className="text-primary text-sm">{elRenderedPageInfo}</p>
      );
    }

    if (elRenderedPageInfo) {
      const isDisabled = totalPage < 2;

      const handleClickPaginationInfo = () => {
        if (isDisabled) return;

        setShowPaginationRows(true);
      };

      const cnButton = cn(
        'h-full! border-l border-r px-3 flex items-center gap-x-1.75 transition-all',
        isDisabled ? 'cursor-no-drop' : 'hover:bg-card',
      );

      elPaginationContent = (
        <button className={cnButton} onClick={handleClickPaginationInfo}>
          {elRenderedPageInfo}

          {!isDisabled && <Maximize2 className="size-2.75" />}
        </button>
      );
    }
  }

  if (totalPage < 1) return null;

  return (
    <div className="bg-card/30 border not-dark:border-transparent shadow rounded-[999px] w-max grid grid-cols-[minmax(0,auto)_minmax(0,auto)_minmax(0,auto)]">
      <NavButton
        icon="back"
        isDisabled={currentPage === 1}
        onClick={onClickBack}
      />

      {elPaginationContent}

      <NavButton
        icon="forward"
        isDisabled={currentPage >= totalPage}
        onClick={onClickForward}
      />
    </div>
  );
}

import { useMemo } from 'react';

import { useNavigate, useSearch } from '@tanstack/react-router';

import { iife } from '@/shared/libs/browser/iife';
import buildSelector from '@/shared/libs/react-factories/buildSelector';
import { useBreakpoint } from '@/shared/libs/react-hooks/useBreakpoint';
import useHandler from '@/shared/libs/react-hooks/useHandler';

import type { FilterRules } from '../-rules';
import type { QueryString } from '../-rules/qs';

import { useSubscribe } from './events';

export const [FilterModelProvider, useFilterModel] = buildSelector(
  'FilterModel',
)(() => {
  const isDesktop = useBreakpoint('lg');

  const navigate = useNavigate({
    from: '/backend/load-balancers',
  });

  const qs = useSearch({
    from: '/_with-app-layout/backend/load-balancers/',
  });

  const updateQs = useHandler(
    <K extends keyof QueryString>(key: K, value: QueryString[K]) => {
      navigate({
        search: (prev) => ({
          ...prev,
          [key]: value,
        }),
        replace: true,
      });
    },
  );

  useSubscribe('@load-balancers/filters/search--input', (input) => {
    updateQs('q', input || undefined);
  });

  useSubscribe('@load-balancers/filters/view-mode--change', (newViewMode) => {
    updateQs('viewMode', newViewMode !== 'auto' ? newViewMode : undefined);
  });

  useSubscribe('@load-balancers/filters/pagination--set', (newPage) => {
    updateQs('page', newPage < 2 ? 1 : newPage);
  });

  const mappedFilters = useMemo(() => {
    const searchQuery: FilterRules.SearchQuery = qs.q;
    const currentPage: FilterRules.CurrentPage = qs.page;
    const viewMode: FilterRules.ViewMode =
      qs.viewMode != null ? qs.viewMode : 'auto';

    const derivedViewMode = iife((): Exclude<FilterRules.ViewMode, 'auto'> => {
      if (viewMode !== 'auto') return viewMode;

      return isDesktop ? 'list' : 'grid';
    });

    return {
      searchQuery,
      currentPage,
      viewMode,
      derivedViewMode,
    };
  }, [qs, isDesktop]);

  return mappedFilters;
});

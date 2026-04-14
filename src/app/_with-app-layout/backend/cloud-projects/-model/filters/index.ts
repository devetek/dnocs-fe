import { useMemo } from 'react';

import { useNavigate, useSearch } from '@tanstack/react-router';

import { iife } from '@/shared/libs/browser/fn';
import buildSelector from '@/shared/libs/react-factories/buildSelector';
import { useBreakpoint } from '@/shared/libs/react-hooks/useBreakpoint';
import useHandler from '@/shared/libs/react-hooks/useHandler';

import type { FilterRules } from '../../-rules';
import type { QueryString } from '../../-rules/qs';

import { useSubscribe } from '../events';

export const [FilterModelProvider, useFilterModel] = buildSelector(
  'FilterModel',
)(() => {
  const isDesktop = useBreakpoint('lg');

  const navigate = useNavigate({
    from: '/backend/cloud-projects',
  });

  const qs = useSearch({
    from: '/_with-app-layout/backend/cloud-projects/',
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

  useSubscribe('@cloud-projects/filters/search--input', (input) => {
    updateQs('q', input || undefined);
  });

  useSubscribe('@cloud-projects/filters/view-mode--change', (newViewMode) => {
    updateQs('viewMode', newViewMode !== 'auto' ? newViewMode : undefined);
  });

  useSubscribe('@cloud-projects/filters/pagination--set', (newPage) => {
    updateQs('page', newPage < 2 ? 1 : newPage);
  });

  const mappedFilters = useMemo(() => {
    const searchQuery: FilterRules.SearchQuery = qs.q;
    const currentPage: FilterRules.CurrentPage = qs.page;
    const viewMode: FilterRules.ViewMode =
      qs.viewMode != null ? qs.viewMode : 'auto';

    const derivedViewMode = iife((): Exclude<FilterRules.ViewMode, 'auto'> => {
      if (viewMode !== 'auto') return viewMode;
      return isDesktop ? 'table' : 'grid';
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

import { useEffect, useState } from 'react';

import { useNavigate, useSearch } from '@tanstack/react-router';

import { buildContext } from '@/shared/libs/react-factories/buildContext';

export const [FilterProvider, useFilter] = buildContext('Filter', () => {
  const searchParams = useSearch({ from: '/_with-app-layout/teams/$id/' });
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState(() => {
    return searchParams.q || '';
  });

  const [pagination, setPagination] = useState(() => {
    const page = Number(searchParams.page) || 1;
    return page > 0 ? page : 1;
  });

  useEffect(() => {
    navigate({
      from: '/teams/$id',
      to: '.',
      search: {
        q: searchQuery,
        page: pagination,
      },
    });
  }, [navigate, pagination, searchQuery]);

  return {
    searchQuery,
    pagination,
    setSearchQuery,
    setPagination,
  };
});

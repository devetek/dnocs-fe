import { createContext, useContext, type ReactNode } from 'react';

import { useAuthLoggedIn } from '@/services/auth';

import { ApiCloud } from '@/shared/api';

import { useFilter } from '../filters';

type ApiResponse = ReturnType<typeof ApiCloud.Project.Find.useGet>[0];

interface CloudDataContextValue {
  response: ApiResponse;
  refresh: () => void;
}

const CloudDataContext = createContext<CloudDataContextValue | null>(null);

export function CloudDataProvider({ children }: { children: ReactNode }) {
  const userId = useAuthLoggedIn().userProfile.id;
  const { searchQuery, pagination } = useFilter();

  const [response, refresh] = ApiCloud.Project.Find.useGet({
    userId,
    page: pagination,
    searchQuery,
  });

  return (
    <CloudDataContext.Provider value={{ response, refresh }}>
      {children}
    </CloudDataContext.Provider>
  );
}

export function useCloudData() {
  const ctx = useContext(CloudDataContext);
  if (!ctx) throw new Error('useCloudData must be used within CloudDataProvider');
  return ctx;
}

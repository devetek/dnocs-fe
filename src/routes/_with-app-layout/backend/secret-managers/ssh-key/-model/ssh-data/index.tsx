import { createContext, useContext, type ReactNode } from 'react';

import { ApiSecret } from '@/shared/api';

import { useFilter } from '../filters';

type ApiResponse = ReturnType<typeof ApiSecret.SshKey.Find.useGet>[0];

interface SshDataContextValue {
  response: ApiResponse;
  refresh: () => void;
}

const SshDataContext = createContext<SshDataContextValue | null>(null);

export function SshDataProvider({ children }: { children: ReactNode }) {
  const { searchQuery, pagination } = useFilter();

  const [response, refresh] = ApiSecret.SshKey.Find.useGet({
    page: pagination,
    searchQuery,
  });

  return (
    <SshDataContext.Provider value={{ response, refresh }}>
      {children}
    </SshDataContext.Provider>
  );
}

export function useSshData() {
  const ctx = useContext(SshDataContext);
  if (!ctx) throw new Error('useSshData must be used within SshDataProvider');
  return ctx;
}

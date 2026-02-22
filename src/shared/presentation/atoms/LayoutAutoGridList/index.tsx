import type { ReactNode } from 'react';

export interface LayoutAutoGridListProps {
  children: ReactNode;
  viewMode: 'auto' | 'grid' | 'list';
}

export default function LayoutAutoGridList(props: LayoutAutoGridListProps) {
  const { children, viewMode } = props;

  if (viewMode === 'grid') {
    return (
      <div className="pb-2 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-1 sm:gap-2">
        {children}
      </div>
    );
  }

  if (viewMode === 'list') {
    return (
      <div className="pb-2 flex flex-col gap-y-2 overflow-x-auto">
        {children}
      </div>
    );
  }

  return (
    <div className="pb-2 grid grid-cols-2 sm:grid-cols-3 lg:flex lg:flex-col gap-1 sm:gap-2 overflow-x-auto">
      {children}
    </div>
  );
}

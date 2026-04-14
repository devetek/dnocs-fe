import type { ReactNode } from 'react';

import { useBreakpoint } from '@/shared/libs/react-hooks/useBreakpoint';

interface BaseProps {
  children: ReactNode;
}

export default function Layout(props: BaseProps) {
  const { children } = props;

  return (
    <div className="flex flex-col-reverse xl:grid xl:grid-cols-[minmax(0,1fr)_0.4fr] gap-4">
      {children}
    </div>
  );
}

Layout.Main = function LayoutMain(props: BaseProps) {
  const { children } = props;

  return <div className="flex flex-col gap-4">{children}</div>;
};

Layout.Aside = function LayoutAside(props: BaseProps) {
  const { children } = props;

  if (!useBreakpoint('xl', true)) return null;

  return <aside className="flex flex-col gap-4">{children}</aside>;
};

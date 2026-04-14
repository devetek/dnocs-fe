import type { ReactNode } from 'react';

interface BaseProps {
  children: ReactNode;
}

export default function Layout(props: BaseProps) {
  const { children } = props;

  return <div className="flex flex-col gap-4">{children}</div>;
}

Layout.Main = function LayoutMain(props: BaseProps) {
  const { children } = props;

  return <div className="flex flex-col gap-4">{children}</div>;
};

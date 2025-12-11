import type { ReactNode } from 'react';

interface BaseProps {
  children: ReactNode;
}

export default function ApplicationsCreateLayout(props: BaseProps) {
  const { children } = props;

  return <div className="grid md:grid-cols-[1fr_0.4fr] gap-4">{children}</div>;
}

ApplicationsCreateLayout.Main = function Main(props: BaseProps) {
  const { children } = props;

  return <div className="flex flex-col overflow-hidden">{children}</div>;
};

ApplicationsCreateLayout.Aside = function Aside(props: BaseProps) {
  const { children } = props;

  return <div className="flex flex-col gap-4">{children}</div>;
};

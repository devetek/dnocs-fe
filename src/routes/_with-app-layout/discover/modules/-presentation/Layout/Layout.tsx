import type { ReactNode } from 'react';

interface BaseProps {
  children: ReactNode;
}

export default function DiscoverModulesLayout(props: BaseProps) {
  const { children } = props;

  return (
    <div className="flex flex-col-reverse lg:grid lg:grid-cols-[1fr_0.5fr] gap-4">
      {children}
    </div>
  );
}

DiscoverModulesLayout.Main = function Main(props: BaseProps) {
  const { children } = props;

  return <div>{children}</div>;
};

DiscoverModulesLayout.Aside = function Aside(props: BaseProps) {
  const { children } = props;

  return <aside>{children}</aside>;
};

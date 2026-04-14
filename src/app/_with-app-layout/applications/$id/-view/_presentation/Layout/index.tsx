import type { ReactNode } from 'react';

interface BaseProps {
  children: ReactNode;
}

export default function Layout(props: BaseProps) {
  const { children } = props;

  return <div className="flex flex-col">{children}</div>;
}

Layout.Content = function LayoutContent(props: BaseProps) {
  const { children } = props;

  return (
    <div className="flex flex-col-reverse md:grid md:grid-cols-[minmax(0,1fr)_0.6fr] xl:grid-cols-[minmax(0,1fr)_0.4fr] gap-4">
      {children}
    </div>
  );
};

Layout.Main = function LayoutMain(props: BaseProps) {
  const { children } = props;

  return <div className="flex flex-col gap-4">{children}</div>;
};

Layout.Aside = function LayoutAside(props: BaseProps) {
  const { children } = props;

  return <aside className="flex flex-col gap-4">{children}</aside>;
};

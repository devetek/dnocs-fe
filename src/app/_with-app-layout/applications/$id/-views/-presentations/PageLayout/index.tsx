import type { WithChildren } from '@/shared/libs/types/react';

export default function PageLayout(props: WithChildren) {
  const { children } = props;

  return <div className="flex flex-col">{children}</div>;
}

PageLayout.Content = function PageLayoutContent(props: WithChildren) {
  const { children } = props;

  return (
    <div className="flex flex-col-reverse md:grid md:grid-cols-[minmax(0,1fr)_0.6fr] xl:grid-cols-[minmax(0,1fr)_0.4fr] gap-4">
      {children}
    </div>
  );
};

PageLayout.Main = function PageLayoutMain(props: WithChildren) {
  const { children } = props;

  return <div className="flex flex-col gap-4">{children}</div>;
};

PageLayout.Aside = function PageLayoutAside(props: WithChildren) {
  const { children } = props;

  return <aside className="flex flex-col gap-4">{children}</aside>;
};

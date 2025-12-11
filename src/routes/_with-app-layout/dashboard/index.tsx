import { createFileRoute } from '@tanstack/react-router';

import { useDevetekTranslations } from '@/services/i18n';

import { PageHeader } from '@/shared/presentation/organisms/PageHeader';

import { SectionApp, SectionMachine } from './-view';

export const Route = createFileRoute('/_with-app-layout/dashboard/')({
  component: Dashboard,
});

function Dashboard() {
  const t = useDevetekTranslations();

  return (
    <>
      <PageHeader
        title={t('page.dashboard.headerTitle')}
        description={t('page.dashboard.headerDesc')}
        footnote={t.rich('page.dashboard.headerFootnote', {
          a: (chunks) => (
            <a className="underline" href="//www.youtube.com/@dpanel_id">
              {chunks}
            </a>
          ),
          i: (chunks) => <span className="italic">{chunks}</span>,
        })}
      />

      <SectionApp />
      <br />
      <br />

      <SectionMachine />
      <br />
    </>
  );
}

import { createFileRoute } from '@tanstack/react-router';

import { useDevetekTranslations } from '@/services/i18n';

import { PageHeader } from '@/shared/presentation/organisms/PageHeader';

import { FiltersProvider, useFilters } from './-model/store/filters';
import { FilterBar, ModeDatabase, ModeDbUser } from './-view';

const View = () => {
  const { view } = useFilters();

  switch (view) {
    case 'db':
      return <ModeDatabase />;

    case 'user':
      return <ModeDbUser />;

    default:
      return <></>;
  }
};

export const Route = createFileRoute('/_with-app-layout/backend/database/')({
  component: DatabasePage,
});

function DatabasePage() {
  const t = useDevetekTranslations();

  return (
    <>
      <PageHeader
        title={t('page.database.headerTitle')}
        description={t('page.database.headerDesc')}
        footnote={t.rich('page.database.headerFootnote', {
          a: (chunks) => (
            <a className="underline" href="//www.youtube.com/@dpanel_id">
              {chunks}
            </a>
          ),
          i: (chunks) => <span className="italic">{chunks}</span>,
        })}
      />

      <FiltersProvider>
        <FilterBar />

        <View />
      </FiltersProvider>
    </>
  );
}

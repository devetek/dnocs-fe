import { createFileRoute } from '@tanstack/react-router';

import { useDevetekTranslations } from '@/services/i18n';

import { Breadcrumb } from '@/shared/presentation/molecules/Breadcrumb';
import { PageHeader } from '@/shared/presentation/organisms/PageHeader';

import { FormStoreProvider } from './-model/store/form';
import { GithubReposStoreProvider } from './-model/store/github-repos';
import { ServersStoreProvider } from './-model/store/servers';
import { ApplicationsCreateLayout as Layout } from './-presentation/Layout';
import { AsideHelp } from './-view/AsideHelp';
import { AsideProgress } from './-view/AsideProgress';
import { MainWizard } from './-view/MainWizard';

export const Route = createFileRoute('/_with-app-layout/applications/create/')({
  component: ApplicationsPage,
});

const BREADCRUMB = (
  <Breadcrumb
    items={[
      {
        text: 'Applications',
        url: '/applications',
      },
    ]}
  />
);

export default function ApplicationsPage() {
  const t = useDevetekTranslations();

  return (
    <>
      <PageHeader
        headnote={BREADCRUMB}
        title={t('page.applicationsCreate.headerTitle')}
        description={t('page.applicationsCreate.headerDesc')}
      />
      <ServersStoreProvider>
        <GithubReposStoreProvider>
          <FormStoreProvider>
            <Layout>
              <Layout.Main>
                <MainWizard />
              </Layout.Main>
              <Layout.Aside>
                <AsideProgress />
                <AsideHelp />
              </Layout.Aside>
            </Layout>
          </FormStoreProvider>
        </GithubReposStoreProvider>
      </ServersStoreProvider>
    </>
  );
}

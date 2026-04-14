import { createFileRoute } from '@tanstack/react-router';
import { zodValidator } from '@tanstack/zod-adapter';

import EventController from './-EventController';
import { FilterModelProvider } from './-model/filters';
import { MembersDataModelProvider } from './-model/members-data';
import { schemaQueryString } from './-rules/qs';
import { Header, Layout, MainBottomActions, MainFilter, MainList } from './-view';

export const Route = createFileRoute('/_with-app-layout/teams/$id/')({
  component: TeamDetailPage,
  validateSearch: zodValidator(schemaQueryString),
});

function TeamDetailPage() {
  const { id } = Route.useParams();

  return (
    <FilterModelProvider>
      <MembersDataModelProvider orgId={id}>
        <EventController />

        <Header />

        <Layout>
          <Layout.Main>
            <MainFilter />
            <MainList />
            <MainBottomActions />
          </Layout.Main>
        </Layout>
      </MembersDataModelProvider>
    </FilterModelProvider>
  );
}

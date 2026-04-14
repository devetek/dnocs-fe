import { createFileRoute } from '@tanstack/react-router';
import { zodValidator } from '@tanstack/zod-adapter';

import EventController from './-EventController';
import { FilterModelProvider } from './-model/filters';
import { OrgDataModelProvider } from './-model/org-data';
import { schemaQueryString } from './-rules/qs';
import { Header, Layout, MainBottomActions, MainFilter, MainList } from './-view';

export const Route = createFileRoute('/_with-app-layout/teams/')({
  component: TeamsPage,
  validateSearch: zodValidator(schemaQueryString),
});

function TeamsPage() {
  return (
    <FilterModelProvider>
      <OrgDataModelProvider>
        <EventController />

        <Header />

        <Layout>
          <Layout.Main>
            <MainFilter />
            <MainList />
            <MainBottomActions />
          </Layout.Main>
        </Layout>
      </OrgDataModelProvider>
    </FilterModelProvider>
  );
}

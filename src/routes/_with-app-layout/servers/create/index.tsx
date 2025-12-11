import { createFileRoute } from '@tanstack/react-router';

import { Breadcrumb } from '@/shared/presentation/molecules/Breadcrumb';
import { PageHeader } from '@/shared/presentation/organisms/PageHeader';

import { QKindOfServer } from './-view/q-kind-of-server';
import { QVmWizardType } from './-view/q-vm-wizard-type';

export const Route = createFileRoute('/_with-app-layout/servers/create/')({
  component: CreateNewServerPage,
});

const BREADCRUMB = (
  <Breadcrumb
    items={[
      {
        text: 'Resources',
      },
      {
        text: 'Servers',
        url: '/servers',
      },
    ]}
  />
);

function CreateNewServerPage() {
  return (
    <>
      <title>Create new server | dPanel</title>

      <PageHeader
        headnote={BREADCRUMB}
        title="Create new server"
        description="Let our guide create a new server for you."
      />

      <QKindOfServer />
      <div className="h-16" />
      <QVmWizardType />
    </>
  );
}

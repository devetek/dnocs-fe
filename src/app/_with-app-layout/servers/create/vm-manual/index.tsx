import { createFileRoute } from '@tanstack/react-router';

import { Breadcrumb } from '@/shared/presentation/molecules/Breadcrumb';
import { PageHeader } from '@/shared/presentation/organisms/PageHeader';

import { FormProvider } from './-model';
import { AsideHelp } from './-view/AsideHelp';
import { SectionCloud } from './-view/SectionCloud';
import { SectionLogin } from './-view/SectionLogin';
import { SectionServerInfo } from './-view/SectionServerInfo';
import { SectionSubmit } from './-view/SectionSubmit';

export const Route = createFileRoute(
  '/_with-app-layout/servers/create/vm-manual/',
)({
  component: CreateNewServerVmManualPage,
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
      {
        text: 'Create new server',
        url: '/servers/create',
      },
    ]}
  />
);

function CreateNewServerVmManualPage() {
  return (
    <>
      <div className="flex flex-col">
        <PageHeader
          headnote={BREADCRUMB}
          title="Create VM (manual)"
          description="Set up virtual machine manually, by providing address and SSH login information. Leave the rest to us!."
        />

        <FormProvider>
          <div className="grid grid-cols-1 xl:grid-cols-[1fr_0.4fr] gap-4">
            <div className="flex flex-col gap-8">
              <SectionCloud />
              <SectionServerInfo />
              <SectionLogin />
              <SectionSubmit />
            </div>

            <AsideHelp />
          </div>
        </FormProvider>
      </div>
    </>
  );
}

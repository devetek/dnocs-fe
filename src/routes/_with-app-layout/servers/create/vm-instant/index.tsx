import { createFileRoute } from '@tanstack/react-router';

import { Breadcrumb } from '@/shared/presentation/molecules/Breadcrumb';
import { PageHeader } from '@/shared/presentation/organisms/PageHeader';

import { FormProvider } from './-model';
import { AsideHelp } from './-view/AsideHelp';
import { SectionCloud } from './-view/SectionCloud';
import { SectionLogin } from './-view/SectionLogin';
import { SectionRegionVPC } from './-view/SectionRegionVPC';
import { SectionSpecs } from './-view/SectionSpecs';
import { SectionSubmit } from './-view/SectionSubmit';

export const Route = createFileRoute(
  '/_with-app-layout/servers/create/vm-instant/',
)({
  component: CreateNewServerVmInstantPage,
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

function CreateNewServerVmInstantPage() {
  return (
    <>
      <PageHeader
        headnote={BREADCRUMB}
        title="Create VM (instant)"
        description="Set up your virtual machine in just a few steps. Choose your cloud provider, configure resources, and deploy instantly."
      />

      <FormProvider>
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_0.4fr] gap-4">
          <div className="flex flex-col gap-8">
            <SectionCloud />
            <SectionRegionVPC />
            <SectionSpecs />
            <SectionLogin />
            <SectionSubmit />
          </div>

          <AsideHelp />
        </div>
      </FormProvider>
    </>
  );
}

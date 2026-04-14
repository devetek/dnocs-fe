import { createFileRoute } from '@tanstack/react-router';

import { PageHeader } from '@/shared/presentation/organisms/PageHeader';

import { FilterProvider } from './-model/filter';
import { FilterBar, PriceNames } from './-view';

export const Route = createFileRoute('/_with-app-layout/pawon/service/')({
  component: PriceNamePage,
});

function PriceNamePage() {
  return (
    <>
      <PageHeader
        title="Services"
        description="Configure dPanel Software as a service (SaaS) services"
      />

      <FilterProvider>
        <FilterBar />
        <PriceNames />
      </FilterProvider>
    </>
  );
}

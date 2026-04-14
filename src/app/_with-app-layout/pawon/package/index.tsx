import { createFileRoute } from '@tanstack/react-router';

import { PageHeader } from '@/shared/presentation/organisms/PageHeader';

import { FilterProvider } from './-model/filter';
import { FilterBar, PricePackages } from './-view';

export const Route = createFileRoute('/_with-app-layout/pawon/package/')({
  component: PricePackagePage,
});

function PricePackagePage() {
  return (
    <>
      <PageHeader
        title="Packages"
        description="Configure dPanel Software as a service (SaaS) packages"
      />

      <FilterProvider>
        <FilterBar />
        <PricePackages />
      </FilterProvider>
    </>
  );
}

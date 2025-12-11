import { createFileRoute } from '@tanstack/react-router';

import { PageHeader } from '@/shared/presentation/organisms/PageHeader';

import { FilterProvider } from './-model/filter';
import { FilterBar, PricePackageConsumers } from './-view';

export const Route = createFileRoute('/_with-app-layout/pawon/payment/')({
  component: PricePackageConsumerPage,
});

function PricePackageConsumerPage() {
  return (
    <>
      <PageHeader
        title="Payments"
        description="Configure dPanel Software as a service (SaaS) subscriptions"
      />

      <FilterProvider>
        <FilterBar />
        <PricePackageConsumers />
      </FilterProvider>
    </>
  );
}

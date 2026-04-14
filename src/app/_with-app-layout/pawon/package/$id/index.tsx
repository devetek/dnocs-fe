import { createFileRoute } from '@tanstack/react-router';

import { BaseContext } from './-config/base-context';
import { FilterProvider } from './-model/filter';
import PackageDetailController from './-model/package-detail';
import { Header, PricePackageItem } from './-view';

export const Route = createFileRoute('/_with-app-layout/pawon/package/$id/')({
  component: PricePackagePage,
});

function PricePackagePage() {
  const { id } = Route.useParams();

  return (
    <BaseContext value={{ id }}>
      <PackageDetailController>
        <Header />

        <FilterProvider>
          <PricePackageItem />
        </FilterProvider>
      </PackageDetailController>
    </BaseContext>
  );
}

import { useState } from 'react';

import type { DTOs } from '@/shared/api';
import { ApiPricePackage } from '@/shared/api';
import { ErrorInline } from '@/shared/presentation/atoms/ErrorInline';
import { Spinner } from '@/shared/presentation/atoms/Spinner';
import { ComboboxWithSearch } from '@/shared/presentation/molecules/ComboboxWithSearch';
import type { ComboboxItem } from '@/shared/presentation/molecules/ComboboxWithSearch/ComboboxWithSearch';
import { FailedState } from '@/widgets/failed-state';

import { useDcContext } from '../../model';

export default function FindPackages() {
  const [response] = ApiPricePackage.Find.useGet({ pageSize: 1000 });
  const { form } = useDcContext();
  const [searchPricePackageID, setSearchPricePackageID] = useState<string>('');

  if (response.$status === 'loading') {
    return <Spinner />;
  }

  if (response.$status === 'failed') {
    return <FailedState.WallCentered errorPayload={response.error.message} />;
  }

  if (response.$status !== 'success') {
    return (
      <div className="w-full flex justify-center">
        <Spinner />
      </div>
    );
  }

  const organizations: ComboboxItem[] =
    response.price_packages?.map((item: DTOs.PricePackageV1) => {
      return {
        label: item.name,
        value: item.id?.toString() ?? '',
      };
    }) ?? [];

  const handleChange = (selectedPricePackageID: string) => {
    const selected: ComboboxItem[] = organizations.filter(
      (pkg: ComboboxItem) => pkg.value === selectedPricePackageID,
    );

    setSearchPricePackageID(() => {
      const pricePackageId = selected.at(0)?.value ?? '0';
      form.setValue('price_package_id', pricePackageId);
      return pricePackageId;
    });
  };

  return (
    <section className="flex flex-col gap-1">
      <p className="text-sm font-medium">Package</p>
      <ComboboxWithSearch
        {...form.register('price_package_id')}
        classNameButton="w-full"
        onChange={handleChange}
        items={organizations}
        value={searchPricePackageID}
      />
      <ErrorInline message={form.formState.errors.price_package_id?.message} />
    </section>
  );
}

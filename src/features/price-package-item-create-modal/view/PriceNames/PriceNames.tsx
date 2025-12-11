import { useController } from 'react-hook-form';

import { ApiPriceName } from '@/shared/api';
import { ErrorInline } from '@/shared/presentation/atoms/ErrorInline';
import { Spinner } from '@/shared/presentation/atoms/Spinner';
import { Combobox } from '@/shared/presentation/molecules/Combobox';
import { FailedState } from '@/widgets/failed-state';

import { useDcContext } from '../../model';

export default function PriceNames() {
  const { form } = useDcContext();
  const ctrl = useController({
    control: form.control,
    name: 'priceNameID',
  });
  const [response] = ApiPriceName.Find.useGet({
    page: 1,
    pageSize: 100,
  });

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

  const priceNames =
    response.price_names?.map((priceName) => {
      return {
        label: (
          <span className="flex items-center gap-2">{priceName.name}</span>
        ),
        value: priceName.id,
      };
    }) || [];

  return (
    <section className="flex flex-col gap-1">
      <p className="text-sm font-medium">Services</p>

      <Combobox
        classNameButton="w-full"
        items={priceNames}
        placeholder="Select Service"
        value={ctrl.field.value}
        onChange={ctrl.field.onChange}
      />

      <ErrorInline message={ctrl.fieldState.error?.message} />
    </section>
  );
}

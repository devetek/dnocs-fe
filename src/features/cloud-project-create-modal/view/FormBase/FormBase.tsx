import { useController } from 'react-hook-form';

import { ErrorInline } from '@/features/db-create-modal/presentation/ErrorInline';

import LogoGoogleCloud from '@/shared/assets/ico-gcloud.png';
import LogoIDCloudHost from '@/shared/assets/ico-idcloudhost.svg';
import { Input } from '@/shared/presentation/atoms/Input';
import { Combobox } from '@/shared/presentation/molecules/Combobox';

import { useCpcFormContext } from '../../model/forms/context';
import type { SchemaBaseForm } from '../../model/forms/schema';

import type { CboLabelProps } from './types';

const CboLabel = ({ imgSrc, label }: CboLabelProps) => {
  return (
    <span className="flex items-center gap-1">
      <img className="w-4" src={imgSrc} alt="Cloud Provider Logo" />
      <span>{label}</span>
    </span>
  );
};

const CboCloudProvider = () => {
  const { formBase } = useCpcFormContext();
  const { field, fieldState } = useController({
    control: formBase.control,
    name: 'cloudProvider',
  });

  return (
    <>
      <Combobox<SchemaBaseForm['cloudProvider']>
        classNameButton="w-full"
        placeholder="Select a cloud provider"
        value={field.value}
        onChange={(value) => field.onChange(value)}
        items={[
          {
            label: <CboLabel imgSrc={LogoIDCloudHost} label="IDCloudHost" />,
            value: 'IDCloudHost',
          },
          {
            label: (
              <CboLabel
                imgSrc={LogoGoogleCloud}
                label="Google Cloud Platform"
              />
            ),
            value: 'gcp',
          },
        ]}
      />

      <ErrorInline message={fieldState.error?.message} />
    </>
  );
};

export default function FormBase() {
  const { formBase } = useCpcFormContext();

  return (
    <>
      <section className="flex flex-col mb-6">
        <p className="text-sm font-medium">Project Title</p>

        <Input
          placeholder="Project Title"
          {...formBase.register('metaTitle')}
        />

        <ErrorInline message={formBase.formState.errors.metaTitle?.message} />
      </section>

      <section className="flex flex-col">
        <p className="text-sm font-medium">Cloud Provider</p>

        <CboCloudProvider />
      </section>
    </>
  );
}

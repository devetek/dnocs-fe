import type { ReactNode } from 'react';

import { CloudIcon } from 'lucide-react';
import { useController } from 'react-hook-form';



import { ApiSecret } from '@/shared/api';
import { Spinner } from '@/shared/presentation/atoms/Spinner';
import { Combobox } from '@/shared/presentation/molecules/Combobox';

import { CLOUD_PROVIDERS } from '../../-config';
import { useForm } from '../../-model';
import { ErrorInline } from '../../-presentation/ErrorInline';
import { Sectioned } from '../../../-presentation/Sectioned';

const SubCloudProviderCbo = () => {
  const { form, formErrors } = useForm();
  const control = useController({
    control: form.control,
    name: 'cloud.provider',
  });

  const items: Array<{ label: ReactNode; value: string }> = [];
  for (const provider of CLOUD_PROVIDERS) {
    items.push({
      label: (
        <>
          <span className="flex">
            <span className="mr-2 mt-0.5">
              <img
                className="size-4"
                src={provider.icon}
                alt={provider.label}
              />
            </span>{' '}
            {provider.label}
          </span>
        </>
      ),
      value: provider.value,
    });
  }

  return (
    <>
      <Combobox
        classNameButton="bg-white w-full"
        placeholder="Select a cloud provider"
        onChange={(value) => {
          control.field.onChange(value);
        }}
        value={control.field.value}
        items={items}
      />

      <ErrorInline message={formErrors.cloud?.provider?.message} />
    </>
  );
};

const SubCloudSshCbo = () => {
  const { form, formErrors } = useForm();

  const [response] = ApiSecret.SshKey.Find.useGet({});

  const control = useController({
    control: form.control,
    name: 'cloud.sshKeyID',
  });

  if (response.$status === 'loading') {
    return (
      <div className="w-10 h-10 flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (response.$status !== 'success') {
    return (
      <div className="h-10 flex items-center">
        <em className="text-red-500/70">
          Failed to get SSH Keys, please refresh the page.
        </em>
      </div>
    );
  }

  const items: Array<{ label: string; value: number }> = [];

  for (const secret of response.secrets || []) {
    if (!secret.name || !secret.id) continue;

    items.push({
      label: secret.name,
      value: secret.id,
    });
  }

  return (
    <>
      <Combobox
        classNameButton="bg-white w-full"
        placeholder="Select a SSH Key"
        onChange={control.field.onChange}
        value={control.field.value}
        items={items}
      />

      <ErrorInline message={formErrors.cloud?.sshKeyID?.message} />
    </>
  );
};

export default function SectionCloud() {
  return (
    <Sectioned
      withinCard
      sectionIcon={CloudIcon}
      sectionTitle="Cloud Information"
      sectionDescription="Set up your cloud environment by selecting a provider and linking the necessary resources."
    >
      <h6 className="text-sm font-bold">Provider</h6>
      <SubCloudProviderCbo />

      <h6 className="mt-4 text-sm font-bold">SSH Key</h6>
      <SubCloudSshCbo />
    </Sectioned>
  );
}

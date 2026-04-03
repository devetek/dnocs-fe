import { useController } from 'react-hook-form';

import { ErrorInline } from '@/features/db-create-modal/presentation/ErrorInline';

import LogoGoogleCloud from '@/shared/assets/ico-gcloud.png';
import LogoIDCloudHost from '@/shared/assets/ico-idcloudhost.svg';
import IconAWS from '@/shared/assets/ico-aws.svg';
import IconDO from '@/shared/assets/ico-do.svg';
import IconHetzner from '@/shared/assets/ico-hetzner.svg';
import IconVultr from '@/shared/assets/ico-vultr.svg';
import { cn } from '@/shared/libs/tailwind/cn';
import { Input } from '@/shared/presentation/atoms/Input';

import { useCpcFormContext } from '../../model/forms/context';
import type { SchemaBaseForm } from '../../model/forms/schema';

// ---------------------------------------------------------------------------
// Provider card definitions
// ---------------------------------------------------------------------------

interface ProviderOption {
  value: SchemaBaseForm['cloudProvider'];
  label: string;
  imgSrc: string;
  comingSoon?: false;
}

interface ProviderOptionComingSoon {
  value: string;
  label: string;
  imgSrc: string;
  comingSoon: true;
}

type AnyProviderOption = ProviderOption | ProviderOptionComingSoon;

const AVAILABLE_PROVIDERS: AnyProviderOption[] = [
  {
    value: 'IDCloudHost',
    label: 'IDCloudHost',
    imgSrc: LogoIDCloudHost,
  },
  {
    value: 'gcp',
    label: 'Google Cloud',
    imgSrc: LogoGoogleCloud,
  },
  {
    value: 'digitalocean',
    label: 'DigitalOcean',
    imgSrc: IconDO,
    comingSoon: true,
  },
  {
    value: 'hetzner',
    label: 'Hetzner',
    imgSrc: IconHetzner,
    comingSoon: true,
  },
  {
    value: 'vultr',
    label: 'Vultr',
    imgSrc: IconVultr,
    comingSoon: true,
  },
  {
    value: 'aws',
    label: 'AWS',
    imgSrc: IconAWS,
    comingSoon: true,
  },
];

// ---------------------------------------------------------------------------
// Provider selector
// ---------------------------------------------------------------------------

const ProviderSelector = () => {
  const { formBase } = useCpcFormContext();
  const { field, fieldState } = useController({
    control: formBase.control,
    name: 'cloudProvider',
  });

  return (
    <>
      <div className="grid grid-cols-3 gap-2">
        {AVAILABLE_PROVIDERS.map((provider) => {
          const isSelected = field.value === provider.value;
          const isComingSoon = provider.comingSoon === true;

          return (
            <button
              key={provider.value}
              type="button"
              disabled={isComingSoon}
              onClick={() =>
                !isComingSoon && field.onChange(provider.value)
              }
              className={cn(
                'relative flex flex-col items-center gap-2 rounded-lg border p-3 text-center transition-all',
                isSelected
                  ? 'border-primary bg-primary/10 ring-1 ring-primary'
                  : 'border-border bg-card hover:border-primary/50',
                isComingSoon && 'cursor-not-allowed opacity-40',
              )}
            >
              <img
                src={provider.imgSrc}
                alt={provider.label}
                className="h-8 w-8 object-contain"
              />
              <span className="text-xs font-medium leading-tight">
                {provider.label}
              </span>
              {isComingSoon && (
                <span className="absolute -top-1.5 right-1 rounded-full bg-secondary px-1.5 py-0.5 text-[9px] font-semibold text-secondary-foreground">
                  Soon
                </span>
              )}
            </button>
          );
        })}
      </div>

      <ErrorInline message={fieldState.error?.message} />
    </>
  );
};

// ---------------------------------------------------------------------------
// FormBase
// ---------------------------------------------------------------------------

export default function FormBase() {
  const { formBase } = useCpcFormContext();

  return (
    <>
      <section className="flex flex-col mb-6 gap-1">
        <p className="text-sm font-medium">
          Connection Name
          <span className="text-primary/50 font-normal ml-1">
            (e.g. "My DigitalOcean Production")
          </span>
        </p>

        <Input
          placeholder="e.g. My IDCloudHost Account"
          {...formBase.register('metaTitle')}
        />

        <ErrorInline message={formBase.formState.errors.metaTitle?.message} />
      </section>

      <section className="flex flex-col gap-2">
        <p className="text-sm font-medium">Cloud Provider</p>
        <p className="text-xs text-primary/50">
          Select the provider that matches your cloud account. Grayed-out
          providers are coming soon.
        </p>

        <ProviderSelector />
      </section>
    </>
  );
}

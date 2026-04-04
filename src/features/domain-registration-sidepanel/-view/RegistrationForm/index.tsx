import { useController } from 'react-hook-form';

import { SchemaDomainParts } from '@/entities/domain/rules/schema';
import { useDevetekTranslations } from '@/services/i18n';

import { ErrorInline } from '@/shared/presentation/atoms/ErrorInline';
import { FreestandingAccordion } from '@/shared/presentation/atoms/FreestandingAccordion';
import { Input } from '@/shared/presentation/atoms/Input';
import { TextArea } from '@/shared/presentation/atoms/TextArea';
import { Combobox } from '@/shared/presentation/molecules/Combobox';

import { useDomainRegistrationModel } from '../../-model/general';

const PROVIDER_ITEMS = [
  { value: SchemaDomainParts.ProviderIdent.cloudflare, label: 'Cloudflare' },
  {
    value: SchemaDomainParts.ProviderIdent.digitalOcean,
    label: 'DigitalOcean',
  },
];

export default function RegistrationForm() {
  const tAll = useDevetekTranslations();
  const t = useDevetekTranslations('sidepanel.domainRegistration');
  const { form } = useDomainRegistrationModel();

  const domain = useController({ control: form.control, name: 'domain' });
  const description = useController({
    control: form.control,
    name: 'description',
  });
  const provider = useController({ control: form.control, name: 'provider' });
  const apiToken = useController({ control: form.control, name: 'apiToken' });
  const zoneId = useController({ control: form.control, name: 'zoneId' });

  const isCloudflare =
    provider.field.value === SchemaDomainParts.ProviderIdent.cloudflare;
  const hasProvider = !!provider.field.value;

  return (
    <div className="flex flex-col">
      <div className="flex flex-col gap-1 px-4 pb-4">
        <p className="font-bold text-xs text-primary/70">
          {t('fieldDomain.title')}<span className="font-bold text-red-500">*</span>
        </p>
        <Input {...domain.field} />
        <ErrorInline t={tAll} message={form.formState.errors.domain?.message} />
      </div>

      <div className="flex flex-col gap-1 px-4 pb-4">
        <p className="font-bold text-xs text-primary/70">
          {t('fieldDescription.title')}
        </p>
        <Input {...description.field} />
      </div>

      <div className="flex flex-col gap-1 px-4 pb-4">
        <p className="font-bold text-xs text-primary/70">
          {t('fieldProvider.title')}<span className="font-bold text-red-500">*</span>
        </p>
        <Combobox
          classNameButton="w-full"
          items={PROVIDER_ITEMS}
          value={provider.field.value}
          onChange={provider.field.onChange}
          placeholder={t('fieldProvider.placeholder')}
        />
        <ErrorInline t={tAll} message={form.formState.errors.provider?.message} />
      </div>

      <FreestandingAccordion isOpen={hasProvider}>
        <h5 className="pt-2 font-bold text-sm pb-2 px-4">{t('providerData.title')}</h5>

        <div className="flex flex-col gap-1 px-4 pb-4">
          <p className="font-bold text-xs text-primary/70">
            {t('fieldToken.title')}<span className="font-bold text-red-500">*</span>
          </p>
          <TextArea {...apiToken.field} />
          <ErrorInline
            t={tAll}
            message={form.formState.errors.apiToken?.message}
          />
        </div>

        <FreestandingAccordion isOpen={isCloudflare}>
          <div className="flex flex-col gap-1 px-4 pb-4">
            <p className="font-bold text-xs text-primary/70">
              {t('fieldZone.title')}<span className="font-bold text-red-500">*</span>
            </p>
            <TextArea {...zoneId.field} />
            <ErrorInline
              t={tAll}
              message={form.formState.errors.zoneId?.message}
            />
          </div>
        </FreestandingAccordion>
      </FreestandingAccordion>
    </div>
  );
}

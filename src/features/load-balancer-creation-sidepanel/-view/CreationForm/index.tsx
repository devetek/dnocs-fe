import { useMemo, useState } from 'react';

import { PlusIcon, TrashIcon } from 'lucide-react';
import { useController, useFieldArray, useWatch } from 'react-hook-form';

import { useDevetekTranslations } from '@/services/i18n';

import { KNOWN_WEBSERVER_ENGINES } from '@/entities/load-balancer/rules/schema/parts';
import { LOAD_BALANCER_WEBSERVER_ENGINE } from '@/entities/load-balancer/ui/constants/webserver';

import { useBreakpoint } from '@/shared/libs/react-hooks/useBreakpoint';
import { Button } from '@/shared/presentation/atoms/ButtonV2';
import { ErrorInline } from '@/shared/presentation/atoms/ErrorInline';
import { FreestandingAccordion } from '@/shared/presentation/atoms/FreestandingAccordion';
import { Input } from '@/shared/presentation/atoms/Input';
import SegmentedControl from '@/shared/presentation/atoms/SegmentedControl';
import { Switch } from '@/shared/presentation/atoms/Switch';
import { Combobox } from '@/shared/presentation/molecules/Combobox';
import { ComboboxWithSearchCb } from '@/shared/presentation/molecules/ComboboxWithSearchCb';

import CreationLayout from '../-presentation/CreationLayout';
import { useEmit } from '../../-model/events';
import { useLbCreationForm } from '../../-model/form';
import { useResourcesModel } from '../../-model/resources';

import RuleCard from './L7RulesCard';

export default function CreationForm() {
  const form = useLbCreationForm();
  const lbKind = useController({ control: form.control, name: 'lbKind' });

  return (
    <CreationLayout expanded={lbKind.field.value === 'l7'}>
      <CreationLayout.Main className="flex flex-col">
        <SectionIdentity />

        <SectionLbType />

        <SectionFeatures />

        {lbKind.field.value === 'l4' && <SectionL4Port />}
      </CreationLayout.Main>

      {lbKind.field.value === 'l7' && (
        <CreationLayout.Side>
          <SectionL7UpstreamRules />
        </CreationLayout.Side>
      )}
    </CreationLayout>
  );
}

function SectionIdentity() {
  const emit = useEmit();
  const t = useDevetekTranslations();

  const form = useLbCreationForm();

  const [servers] = useResourcesModel((s) => [s.servers]);

  const description = useController({
    control: form.control,
    name: 'description',
  });
  const serverId = useController({ control: form.control, name: 'serverId' });
  const engine = useController({ control: form.control, name: 'engine' });

  const serverItems = useMemo(() => {
    if (servers.$status !== 'success') return [];

    return servers.list.map((s) => ({
      value: String(s.id),
      label: s.host.name ?? String(s.id),
      description: s.host.address,
    }));
  }, [servers]);

  return (
    <>
      <FieldDomain />

      <div className="flex flex-col gap-1 px-4 pb-4">
        <p className="font-bold text-xs text-primary/70">
          {t('sidepanel.loadBalancerCreation.fieldDescription.title')}
        </p>
        <Input {...description.field} />
        <ErrorInline
          t={t}
          message={form.formState.errors.description?.message}
        />
      </div>

      <div className="grid grid-cols-[3.5fr_2.5fr] gap-x-2 px-4 pb-4">
        <div className="flex flex-col gap-1">
          <p className="font-bold text-xs text-primary/70">
            {t('sidepanel.loadBalancerCreation.fieldServer.title')}
            <span className="font-bold text-red-500">*</span>
          </p>
          <ComboboxWithSearchCb
            classNameButton="w-full"
            items={serverItems}
            value={serverId.field.value}
            onChange={serverId.field.onChange}
            onSearchEnter={(q) =>
              emit(
                '#load-balancer-creation-sidepanel/resources/server-search',
                q,
              )
            }
            placeholder={t(
              'sidepanel.loadBalancerCreation.fieldServer.placeholder',
            )}
          />
          <ErrorInline
            t={t}
            message={form.formState.errors.serverId?.message}
          />
        </div>

        <div className="flex flex-col gap-1">
          <p className="font-bold text-xs text-primary/70">
            {t('sidepanel.loadBalancerCreation.fieldEngine.title')}
          </p>

          <Combobox
            classNameButton="w-full"
            placeholder={t(
              'sidepanel.loadBalancerCreation.fieldEngine.placeholder',
            )}
            onChange={engine.field.onChange}
            value={engine.field.value}
            items={KNOWN_WEBSERVER_ENGINES.map((webserverEngine) => {
              const metadata = LOAD_BALANCER_WEBSERVER_ENGINE[webserverEngine];

              return {
                value: webserverEngine,
                label: (
                  <span className="flex items-center">
                    {<metadata.icon className="size-4 mr-2" />}
                    {t(metadata.i18n.brandName)}
                  </span>
                ),
              };
            })}
          />
          <ErrorInline t={t} message={form.formState.errors.engine?.message} />
        </div>
      </div>
    </>
  );
}

function FieldDomain() {
  const [domains] = useResourcesModel((s) => [s.domains]);

  const tAll = useDevetekTranslations();
  const t = useDevetekTranslations(
    'sidepanel.loadBalancerCreation.fieldDomain',
  );
  const form = useLbCreationForm();
  const domain = useController({ control: form.control, name: 'domain' });
  const internalDomainId = useController({
    control: form.control,
    name: 'internalDomainMetadata.id',
  });
  const internalDomainSubdomain = useController({
    control: form.control,
    name: 'internalDomainMetadata.subdomain',
  });

  const [extenalDomain, setExtenalDomain] = useState(true);

  const handleToggleDomainType = () => {
    if (extenalDomain) {
      form.setValue('domain', '');
      form.setValue('internalDomainMetadata', undefined);
    } else {
      form.setValue('domain', '');
    }

    setExtenalDomain((prev) => !prev);
  };

  const handleChangeInternalDomain = (id: string) => {
    if (domains.$status !== 'success') return;

    const selectedDomain = domains.list.find((d) => d.id === id);
    if (!selectedDomain) return;

    internalDomainId.field.onChange(id);
    domain.field.onChange(selectedDomain.domain.hostname);
  };

  const internalDomainItems = useMemo(() => {
    if (domains.$status !== 'success') return [];

    return domains.list.map((d) => ({
      value: d.id,
      label: `.${d.domain.hostname}`,
      description: <span className="opacity-60">ID: {d.id}</span>,
    }));
  }, [domains]);

  return (
    <div className="flex flex-col gap-1 px-4 pb-4">
      <div className="flex items-center justify-between">
        <p className="font-bold text-xs text-primary/70">
          {t('title')}
          <span className="font-bold text-red-500">*</span>
        </p>

        <a
          onClick={handleToggleDomainType}
          className="underline text-xs text-primary/70 cursor-pointer"
        >
          {extenalDomain ? t('useInternalDomain') : t('useExternalDomain')}
        </a>
      </div>

      {extenalDomain ? (
        <Input {...domain.field} placeholder={t('placeholder')} />
      ) : (
        <div className="grid grid-cols-[2fr_3fr] gap-x-2">
          <Input {...internalDomainSubdomain.field} />

          <Combobox
            classNameButton="w-full"
            placeholder={t('placeholder')}
            value={internalDomainId.field.value}
            items={internalDomainItems}
            onChange={handleChangeInternalDomain}
          />
        </div>
      )}

      <ErrorInline t={tAll} message={form.formState.errors.domain?.message} />
    </div>
  );
}

function SectionLbType() {
  const t = useDevetekTranslations();

  const form = useLbCreationForm();
  const lbKind = useController({ control: form.control, name: 'lbKind' });

  return (
    <>
      <h5 className="pt-2 font-bold text-sm pb-2 px-4">
        {t('sidepanel.loadBalancerCreation.sectionLbKind')}
      </h5>

      <div className="flex flex-col gap-1 px-4 pb-4">
        <SegmentedControl
          activeItemId={lbKind.field.value || 'l7'}
          onClickOption={lbKind.field.onChange}
          segmentSizing="uniform"
          options={[
            {
              id: 'l7',
              text: 'L7',
              tooltipText: t(
                'sidepanel.loadBalancerCreation.fieldLbKind.hintL7',
              ),
            },
            {
              id: 'l4',
              text: 'L4',
              tooltipText: t(
                'sidepanel.loadBalancerCreation.fieldLbKind.hintL4',
              ),
            },
          ]}
        />
      </div>
    </>
  );
}

function SectionFeatures() {
  const t = useDevetekTranslations();

  const form = useLbCreationForm();

  const lbKind = useWatch({ control: form.control, name: 'lbKind' });

  const protocol = useController({
    control: form.control,
    name: 'features.protocol',
  });

  const sslEnabled = useController({
    control: form.control,
    name: 'features.sslEnabled',
  });

  return (
    <>
      <h5 className="pt-2 font-bold text-sm pb-2 px-4">
        {t('sidepanel.loadBalancerCreation.sectionFeatures')}
      </h5>

      <FreestandingAccordion isOpen={lbKind === 'l4'}>
        <div className="flex flex-col gap-1 px-4 pb-4">
          <p className="font-bold text-xs text-primary/70">
            {t('sidepanel.loadBalancerCreation.fieldProtocol.title')}
            <span className="font-bold text-red-500">*</span>
          </p>

          <Combobox
            classNameButton="w-full"
            placeholder={t(
              'sidepanel.loadBalancerCreation.fieldProtocol.placeholder',
            )}
            onChange={protocol.field.onChange}
            value={protocol.field.value}
            items={[
              {
                label: 'HTTP',
                value: 'http',
              },
              {
                label: 'TCP',
                value: 'tcp',
              },
              {
                label: 'PostgreSQL',
                value: 'postgresql',
              },
              {
                label: 'MySQL',
                value: 'mysql',
              },
              {
                label: 'MongoDB',
                value: 'mongodb',
              },

              {
                label: 'Redis',
                value: 'redis',
              },
            ]}
          />
        </div>
      </FreestandingAccordion>

      <div className="flex flex-col gap-1 px-4 pb-4">
        <p className="font-bold text-xs text-primary/70">
          {t('sidepanel.loadBalancerCreation.fieldSslEnabled.title')}
          <span className="font-bold text-red-500">*</span>
        </p>

        <Switch
          checked={sslEnabled.field.value}
          onCheckedChange={sslEnabled.field.onChange}
        />
      </div>
    </>
  );
}

function SectionL7UpstreamRules() {
  const t = useDevetekTranslations();
  const form = useLbCreationForm();
  const rules = useFieldArray({ control: form.control, name: 'l7rules' });

  const isDesktop = useBreakpoint('lg');

  const handleRemoveRule = (index: number) => {
    rules.remove(index);
  };

  const handleAddRule = () => {
    rules.append({
      pathMatch: '/*',
      type: 'proxy-pass',
      upstreamsIfProxyPass: [{ address: '', port: 80 }],
      applicationIdIfProxyPassApp: '',
    });
  };

  return (
    <div className="flex flex-col gap-2">
      <h5 className="font-bold text-sm pb-2">
        {t('sidepanel.loadBalancerCreation.upstreamRules.title')}
      </h5>

      {isDesktop ? (
        <div className="gap-3 lg:grid lg:grid-cols-2">
          <div className="flex flex-col gap-y-3">
            {rules.fields.map((field, index) => {
              if (index % 2 !== 0) return null;

              return (
                <RuleCard
                  key={field.id}
                  index={index}
                  canRemove={rules.fields.length > 1}
                  onRemove={() => handleRemoveRule(index)}
                />
              );
            })}
          </div>
          <div className="flex flex-col gap-y-3">
            {rules.fields.map((field, index) => {
              if (index % 2 === 0) return null;

              return (
                <RuleCard
                  key={field.id}
                  index={index}
                  canRemove={rules.fields.length > 1}
                  onRemove={() => handleRemoveRule(index)}
                />
              );
            })}
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {rules.fields.map((field, index) => (
            <RuleCard
              key={field.id}
              index={index}
              canRemove={rules.fields.length > 1}
              onRemove={() => handleRemoveRule(index)}
            />
          ))}
        </div>
      )}

      <Button
        className="mt-4"
        size="lg"
        buttonColor="secondary"
        buttonStyle="outline"
        onClick={handleAddRule}
      >
        <PlusIcon />
        {t('sidepanel.loadBalancerCreation.upstreamRules.addRule')}
      </Button>
    </div>
  );
}

function SectionL4Port() {
  const t = useDevetekTranslations();
  const form = useLbCreationForm();

  const upstreams = useFieldArray({
    control: form.control,
    name: 'l4rule.upstreams',
  });

  return (
    <>
      <h5 className="pt-2 font-bold text-sm pb-2 px-4">
        {t('sidepanel.loadBalancerCreation.l4rule.title')}
      </h5>

      <div className="flex flex-col gap-1 px-4 pb-4">
        <p className="font-bold text-xs text-primary/70">
          {t('sidepanel.loadBalancerCreation.l4rule.matchingPath')}
          <span className="font-bold text-red-500">*</span>
        </p>
        <Input value="/" disabled />
      </div>

      <div className="flex flex-col gap-1 px-4 pb-4">
        <p className="font-bold text-xs text-primary/70">
          {t('sidepanel.loadBalancerCreation.l4rule.fieldDestination.title')}
          <span className="font-bold text-red-500">*</span>
        </p>

        {upstreams.fields.map((upstream, index) => {
          return (
            <div
              className="grid data-[multiple=true]:grid-cols-[1fr_auto] gap-x-1 items-center"
              key={upstream.id}
              data-multiple={upstreams.fields.length > 1}
            >
              <div
                className="grid grid-cols-[3.5fr_auto_2fr] gap-x-0.5 items-center"
                key={upstream.id}
              >
                <Input
                  inputSize="sm"
                  className="font-mono"
                  {...form.control.register(
                    `l4rule.upstreams.${index}.address` as const,
                  )}
                />
                <span className="font-mono px-1">:</span>
                <Input
                  type="number"
                  inputSize="sm"
                  className="font-mono"
                  min={1}
                  max={65_535}
                  {...form.control.register(
                    `l4rule.upstreams.${index}.port` as const,
                  )}
                />
              </div>

              {upstreams.fields.length > 1 && (
                <Button
                  danger
                  size="icon-xs"
                  buttonStyle="ghost"
                  onClick={() => upstreams.remove(index)}
                >
                  <TrashIcon className="size-3.5" />
                </Button>
              )}
            </div>
          );
        })}

        <Button
          className="mt-2"
          size="sm"
          buttonColor="secondary"
          buttonStyle="outline"
          onClick={() => upstreams.append({ address: '', port: 80 })}
        >
          <PlusIcon className="size-3.5" />
          {t('sidepanel.loadBalancerCreation.l4rule.fieldDestination.add')}
        </Button>
      </div>
    </>
  );
}

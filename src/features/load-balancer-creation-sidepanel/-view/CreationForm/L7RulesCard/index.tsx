import { useMemo, useState } from 'react';

import { InfoIcon, PlusIcon, TrashIcon } from 'lucide-react';
import { useController, useFieldArray, useWatch } from 'react-hook-form';

import { useDevetekTranslations } from '@/services/i18n';

import { useLbCreationForm } from '@/features/load-balancer-creation-sidepanel/-model/form';
import { useResourcesModel } from '@/features/load-balancer-creation-sidepanel/-model/resources';

import { Button } from '@/shared/presentation/atoms/ButtonV2';
import { ErrorInline } from '@/shared/presentation/atoms/ErrorInline';
import { Input } from '@/shared/presentation/atoms/Input';
import { Tooltip } from '@/shared/presentation/atoms/Tooltip';
import { Combobox } from '@/shared/presentation/molecules/Combobox';
import { ComboboxWithSearchCb } from '@/shared/presentation/molecules/ComboboxWithSearchCb';

interface RuleCardProps {
  index: number;
  canRemove: boolean;
  onRemove: () => void;
}

export default function RuleCard(props: RuleCardProps) {
  const { index, canRemove, onRemove } = props;

  const tAll = useDevetekTranslations();
  const t = useDevetekTranslations(
    'sidepanel.loadBalancerCreation.upstreamRules',
  );
  const form = useLbCreationForm();

  const pathMatch = useController({
    control: form.control,
    name: `l7rules.${index}.pathMatch`,
  });
  const type = useController({
    control: form.control,
    name: `l7rules.${index}.type`,
  });

  const ruleType = useWatch({
    control: form.control,
    name: `l7rules.${index}.type`,
  });

  const ruleErrors = form.formState.errors.l7rules?.[index];

  const isWildcard = /\/\*$/.test(pathMatch.field.value || '');

  return (
    <div className="w-full h-max bg-card/30 shadow flex flex-col rounded-lg overflow-hidden border">
      <div className="flex items-center justify-between p-0.5 pl-1">
        <span className="flex items-center gap-x-1">
          <span className="text-[10px] font-bold tracking-wider uppercase rounded px-1.5 py-0.5">
            {t('ruleLabel')} #{String(index + 1).padStart(2, '0')}
          </span>
          {isWildcard && (
            <span className="text-[0.5rem] font-bold uppercase rounded px-1.5 py-0.5 bg-primary text-primary-foreground">
              WILDCARD
            </span>
          )}
        </span>

        {canRemove && (
          <Button
            danger
            size="icon-xs"
            buttonStyle="ghost"
            onClick={onRemove}
            className="text-red-400 hover:text-red-600 transition-colors"
          >
            <TrashIcon className="size-3.5" />
          </Button>
        )}
      </div>

      <div className="bg-card border-t rounded-lg px-2.5 py-2">
        {/* Type + Matching Path — 2-col mini grid */}
        <div className="grid grid-cols-[2fr_3fr] gap-x-2 gap-y-2 pb-3">
          <div className="flex flex-col gap-0.5">
            <p className="font-bold text-[0.6rem] uppercase tracking-widest text-primary/40">
              {t('fieldType.title')}
            </p>

            <Combobox
              classNameButton="w-full"
              size="sm"
              items={[
                { value: 'proxy-pass', label: 'Proxy Pass' },
                {
                  value: 'proxy-pass-app',
                  label: 'Application',
                },
              ]}
              value={type.field.value}
              onChange={type.field.onChange}
            />
          </div>

          <div className="flex flex-col gap-0.5">
            <div className="flex items-center justify-between">
              <p className="font-bold text-[0.6rem] uppercase tracking-widest text-primary/40">
                {t('fieldPath.title')}
                <span className="text-red-500">*</span>
              </p>

              <Tooltip
                classNameTooltip="z-100 max-w-40"
                message="The path to match for this rule. You can use a wildcard path (e.g. /api/*) to match all paths with the specified prefix."
              >
                <InfoIcon className="size-3" />
              </Tooltip>
            </div>
            <Input
              inputSize="sm"
              className="font-mono"
              {...pathMatch.field}
              placeholder="/path/to/match/*"
            />
            <ErrorInline t={tAll} message={ruleErrors?.pathMatch?.message} />
          </div>
        </div>

        <div className="flex flex-col">
          {ruleType === 'proxy-pass' && (
            <ProxyPassDestinationsList ruleIndex={index} />
          )}
          {ruleType === 'proxy-pass-app' && (
            <ApplicationSelector ruleIndex={index} />
          )}
        </div>
      </div>
    </div>
  );
}

interface DestinationsListProps {
  ruleIndex: number;
}

function ProxyPassDestinationsList(props: DestinationsListProps) {
  const { ruleIndex } = props;
  const form = useLbCreationForm();
  const t = useDevetekTranslations(
    'sidepanel.loadBalancerCreation.upstreamRules',
  );

  const upstreamsFieldArray = useFieldArray({
    control: form.control,
    name: `l7rules.${ruleIndex}.upstreamsIfProxyPass`,
  });

  const handleAddDestination = () => {
    upstreamsFieldArray.append({ address: '', port: 80 });
  };

  return (
    <div className="flex flex-col gap-y-1">
      <p className="font-bold text-[0.6rem] uppercase tracking-widest text-primary/40 pb-0.5">
        {t('fieldDestination.title')}
      </p>

      {upstreamsFieldArray.fields.map((field, upstreamIndex) => {
        return (
          <div
            key={field.id}
            className="grid data-[multiple=true]:grid-cols-[1fr_auto] gap-x-1 items-center"
            data-multiple={upstreamsFieldArray.fields.length > 1}
          >
            <div className="grid grid-cols-[1fr_auto_96px] items-center">
              <Input
                inputSize="sm"
                className="font-mono"
                {...form.control.register(
                  `l7rules.${ruleIndex}.upstreamsIfProxyPass.${upstreamIndex}.address` as const,
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
                  `l7rules.${ruleIndex}.upstreamsIfProxyPass.${upstreamIndex}.port` as const,
                )}
              />
            </div>

            {upstreamsFieldArray.fields.length > 1 && (
              <Button
                danger
                size="icon-xs"
                buttonStyle="ghost"
                onClick={() => upstreamsFieldArray.remove(upstreamIndex)}
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
        buttonStyle="outline"
        buttonColor="secondary"
        onClick={handleAddDestination}
      >
        <PlusIcon />
        {t('fieldDestination.add')}
      </Button>
    </div>
  );
}

interface ApplicationSelectorProps {
  ruleIndex: number;
}

function ApplicationSelector(props: ApplicationSelectorProps) {
  const { ruleIndex } = props;

  const [searchQuery, setSearchQuery] = useState('');

  const form = useLbCreationForm();
  const [applications] = useResourcesModel((s) => [s.applications]);
  const t = useDevetekTranslations(
    'sidepanel.loadBalancerCreation.upstreamRules',
  );

  const applicationIdField = useController({
    control: form.control,
    name: `l7rules.${ruleIndex}.applicationIdIfProxyPassApp`,
  });

  const appList = useMemo(() => {
    if (applications.$status !== 'success') return [];

    return applications.list
      .filter((app) =>
        searchQuery
          ? app.identity.name.toLowerCase().includes(searchQuery.toLowerCase())
          : true,
      )
      .map((app) => ({
        value: app.id,
        label: app.identity.name,
        description: app.id,
      }));
  }, [applications, searchQuery]);

  return (
    <div className="flex flex-col gap-0.5">
      <p className="font-bold text-[0.6rem] uppercase tracking-widest text-primary/40">
        {t('fieldApp.title')}
      </p>
      <ComboboxWithSearchCb
        classNameButton="w-full"
        items={appList}
        value={applicationIdField.field.value}
        onChange={applicationIdField.field.onChange}
        onSearchEnter={setSearchQuery}
        placeholder={t('fieldApp.placeholder')}
      />
    </div>
  );
}

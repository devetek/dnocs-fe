import { useEffect } from 'react';

import { useController, useWatch } from 'react-hook-form';

import { useDevetekTranslations } from '@/services/i18n';

import { Checkbox } from '@/shared/presentation/atoms/Checkbox';
import { ErrorInline } from '@/shared/presentation/atoms/ErrorInline';
import { Input } from '@/shared/presentation/atoms/Input';

import { useApplicationEditModel } from '../../model';
import { ImportantMarker } from '../_presentation';

import FormItemFromBranch from './GitBranch';

const FormItemEnable = () => {
  const { form } = useApplicationEditModel();

  const { field } = useController({
    control: form.control,
    name: 'autoDeploy.isEnabled',
  });

  return <Checkbox checked={field.value} onCheckedChange={field.onChange} />;
};

function SectionGeneral() {
  const { form } = useApplicationEditModel();
  const t = useDevetekTranslations('sidepanel.editApplication.general');

  return (
    <div className="pb-4">
      <h5 className="font-bold text-sm pb-2">{t('title')}</h5>

      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-1">
          <p className="font-bold text-xs text-primary/70">{t('workdir')}</p>
          <Input
            {...form.register('workdir')}
            placeholder={t('workdirPlaceholder')}
            className="font-mono text-sm"
          />
        </div>

        <div className="flex flex-col gap-1">
          <p className="font-bold text-xs text-primary/70">{t('port')}</p>
          <Input
            {...form.register('port')}
            type="number"
            placeholder={t('portPlaceholder')}
            className="font-mono text-sm"
            min={1}
            max={65535}
          />
        </div>
      </div>
    </div>
  );
}

export default function Forms() {
  const { form } = useApplicationEditModel();

  const t = useDevetekTranslations('sidepanel.editApplication.autoDeployment');
  const tAll = useDevetekTranslations();

  const enableDeployment = useWatch({
    control: form.control,
    name: 'autoDeploy.isEnabled',
  });

  useEffect(() => {
    if (!enableDeployment) {
      form.setValue('autoDeploy.fromBranch', undefined, { shouldDirty: true });
    }
  }, [enableDeployment, form]);

  return (
    <div>
      <SectionGeneral />

      <h5 className="font-bold text-sm pb-2">{t('title')}</h5>

      <div className="flex flex-col gap-1 pb-4">
        <p className="font-bold text-xs text-primary/70">
          {t('enable')}
          <ImportantMarker />
        </p>

        <FormItemEnable />
      </div>

      {enableDeployment && (
        <div className="flex flex-col gap-1 pb-4">
          <p className="font-bold text-xs text-primary/70">
            {t('deployFromBranch')}
            <ImportantMarker />
          </p>

          <FormItemFromBranch />

          <ErrorInline
            t={tAll}
            message={form.formState.errors.autoDeploy?.fromBranch?.message}
          />
        </div>
      )}
    </div>
  );
}

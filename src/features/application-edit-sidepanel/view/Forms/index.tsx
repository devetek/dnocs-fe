import { useController } from 'react-hook-form';

import { useDevetekTranslations } from '@/services/i18n';

import { Checkbox } from '@/shared/presentation/atoms/Checkbox';
import { ErrorInline } from '@/shared/presentation/atoms/ErrorInline';

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

export default function Forms() {
  const { form } = useApplicationEditModel();

  const t = useDevetekTranslations('sidepanel.editApplication.autoDeployment');
  const tAll = useDevetekTranslations();

  const enableDeployment = form.watch('autoDeploy.isEnabled');

  return (
    <div>
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

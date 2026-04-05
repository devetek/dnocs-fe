import { useDevetekTranslations } from '@/services/i18n';
import { ErrorInline } from '@/shared/presentation/atoms/ErrorInline';
import { Input } from '@/shared/presentation/atoms/Input';
import { TextArea } from '@/shared/presentation/atoms/TextArea';

import { useOrgEditModel } from '../../model';
import { ImportantMarker } from '../_presentation';

export default function Forms() {
  const { form } = useOrgEditModel();
  const t = useDevetekTranslations();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <p className="font-bold text-xs text-primary/70">
          {t('sidepanel.editTeam.fieldName')}
          <ImportantMarker />
        </p>
        <Input {...form.register('name')} placeholder={t('sidepanel.editTeam.namePlaceholder')} />
        <ErrorInline message={form.formState.errors.name?.message} />
      </div>

      <div className="flex flex-col gap-1">
        <p className="font-bold text-xs text-primary/70">{t('common.terms.description')}</p>
        <TextArea
          {...form.register('description')}
          placeholder={t('sidepanel.editTeam.descPlaceholder')}
          rows={3}
        />
        <ErrorInline message={form.formState.errors.description?.message} />
      </div>
    </div>
  );
}

import { useAuthLoggedIn } from '@/services/auth';
import { useDevetekTranslations } from '@/services/i18n';

import { ErrorInline } from '@/shared/presentation/atoms/ErrorInline';
import { Input } from '@/shared/presentation/atoms/Input';
import { TextArea } from '@/shared/presentation/atoms/TextArea';

import { useDcContext } from '../../model';

export default function Name() {
  const userId = useAuthLoggedIn().userProfile.id;
  const { form } = useDcContext();
  const t = useDevetekTranslations();

  return (
    <>
      <Input type="hidden" {...form.register('user_id')} value={userId} />

      <section className="flex flex-col gap-1">
        <p className="text-sm font-medium">
          {t('modal.createTeam.fieldName')} <span className="text-red-500">*</span>
        </p>
        <Input placeholder={t('modal.createTeam.namePlaceholder')} {...form.register('name')} />
        <ErrorInline message={form.formState.errors.name?.message} />
      </section>

      <section className="flex flex-col gap-1">
        <p className="text-sm font-medium">{t('common.terms.description')}</p>
        <TextArea
          placeholder={t('modal.createTeam.descPlaceholder')}
          rows={3}
          {...form.register('description')}
        />
        <ErrorInline message={form.formState.errors.description?.message} />
      </section>
    </>
  );
}

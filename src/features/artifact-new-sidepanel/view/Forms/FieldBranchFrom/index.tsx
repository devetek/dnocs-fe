import { useController } from 'react-hook-form';

import { useDevetekTranslations } from '@/services/i18n';

import { useEmit } from '@/features/artifact-new-sidepanel/model/events';
import { useArtifactNewGeneralModel } from '@/features/artifact-new-sidepanel/model/general';

import {
  couple,
  guardedSelects,
} from '@/shared/libs/react-factories/guardedSelect';
import { ErrorInline } from '@/shared/presentation/atoms/ErrorInline';
import { ComboboxWithSearch } from '@/shared/presentation/molecules/ComboboxWithSearch';

import { useGitBranchModel } from '../../../model/git-branch';
import {
  FieldLoading,
  createFieldError,
} from '../../_presentation/FieldStates';
import FieldWrapper from '../../_presentation/FieldWrapper';

const [guard, useGitBranches] = guardedSelects({
  fallbackLoading: FieldLoading,
  fallbackError: createFieldError({
    i18nKey: 'sidepanel.artifactNew.fieldBranch.onError',
    useTryAgain: () => {
      const emit = useEmit();
      return () => emit('#artifact-new-sidepanel/git-branch-refresh', null);
    },
  }),
})(couple(useGitBranchModel, (s) => s.branches));

const BranchCbo = guard(() => {
  const { form } = useArtifactNewGeneralModel();

  const t = useDevetekTranslations();

  const gitBranches = useGitBranches((s) => s.list);

  const { field } = useController({
    control: form.control,
    name: 'fromBranch',
  });

  return (
    <ComboboxWithSearch
      classNameButton="w-full"
      value={field.value}
      onChange={field.onChange}
      items={gitBranches.map((branch) => {
        return {
          label: branch.name,
          value: branch.name,
        };
      })}
      placeholder={t('common.terms.selectBranch')}
    />
  );
});

export default function FieldBranchFrom() {
  const { form } = useArtifactNewGeneralModel();

  const tAll = useDevetekTranslations();
  const t = useDevetekTranslations('sidepanel.artifactNew.fieldBranch');

  return (
    <FieldWrapper fieldTitle={t('title')}>
      <BranchCbo />

      <ErrorInline
        t={tAll}
        message={form.formState.errors.fromBranch?.message}
      />
    </FieldWrapper>
  );
}

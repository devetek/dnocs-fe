import { useEffect } from 'react';

import { useController } from 'react-hook-form';

import { useDevetekTranslations } from '@/services/i18n';

import { useApplicationEditModel } from '@/features/application-edit-sidepanel/model';
import { useGitBranchModel } from '@/features/application-edit-sidepanel/model/git-branch';

import {
  couple,
  guardedSelects,
} from '@/shared/libs/react-factories/guardedSelect';
import { ComboboxWithSearch } from '@/shared/presentation/molecules/ComboboxWithSearch';

import { GitBranchError, GitBranchLoading } from '../../_presentation';

const [guard, useGitBranches] = guardedSelects({
  fallbackLoading: GitBranchLoading,
  fallbackError: GitBranchError,
})(couple(useGitBranchModel, (s) => s));

export default guard(function FormItemFromBranch() {
  const { form } = useApplicationEditModel();

  const t = useDevetekTranslations();

  const gitBranches = useGitBranches((s) => s.branches);

  const { field } = useController({
    control: form.control,
    name: 'autoDeploy.fromBranch',
  });

  useEffect(() => {
    return () => {
      form.setValue('autoDeploy.fromBranch', undefined, {
        shouldDirty: true,
      });
    };
  }, [form]);

  if (!form.watch('autoDeploy.isEnabled')) return null;

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

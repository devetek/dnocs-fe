import { useController } from 'react-hook-form';

import { useDevetekTranslations } from '@/services/i18n';

import { useApplicationEditModel } from '@/features/application-edit-sidepanel/model';
import { useGitBranchModel } from '@/features/application-edit-sidepanel/model/git-branch';

import { ComboboxWithSearch } from '@/shared/presentation/molecules/ComboboxWithSearch';

import { GitBranchError, GitBranchLoading } from '../../_presentation';

export default function FormItemFromBranch() {
  const { form } = useApplicationEditModel();
  const t = useDevetekTranslations();

  const branchState = useGitBranchModel();

  const { field } = useController({
    control: form.control,
    name: 'autoDeploy.fromBranch',
  });

  if (branchState.$status === 'initial' || branchState.$status === 'loading') {
    return <GitBranchLoading />;
  }

  if (branchState.$status === 'failed') {
    return <GitBranchError />;
  }

  const branches = (branchState as { branches: Array<{ name: string; commitHead: string }> }).branches;

  return (
    <ComboboxWithSearch
      classNameButton="w-full"
      value={field.value}
      onChange={field.onChange}
      items={branches.map((branch: { name: string }) => ({
        label: branch.name,
        value: branch.name,
      }))}
      placeholder={t('common.terms.selectBranch')}
    />
  );
}

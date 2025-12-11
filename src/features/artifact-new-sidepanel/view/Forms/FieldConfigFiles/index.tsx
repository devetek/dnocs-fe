import { useController } from 'react-hook-form';

import { useDevetekTranslations } from '@/services/i18n';

import { useEmit } from '@/features/artifact-new-sidepanel/model/events';
import { useArtifactNewGeneralModel } from '@/features/artifact-new-sidepanel/model/general';

import { iife } from '@/shared/libs/browser/iife';
import { ErrorInline } from '@/shared/presentation/atoms/ErrorInline';
import { ComboboxWithSearch } from '@/shared/presentation/molecules/ComboboxWithSearch';

import { useGitBranchModel } from '../../../model/git-branch';
import {
  ConfigFileInit,
  FieldLoading,
  createFieldError,
} from '../../_presentation/FieldStates';
import FieldWrapper from '../../_presentation/FieldWrapper';

const FallbackError = createFieldError({
  i18nKey: 'sidepanel.artifactNew.fieldConfig.onError',
  useTryAgain: () => {
    const emit = useEmit();
    return () => emit('#artifact-new-sidepanel/git-config-files-refresh', null);
  },
});

const ConfigCbo = () => {
  const { form, props } = useArtifactNewGeneralModel();

  const tAll = useDevetekTranslations();

  const configFilesResponse = useGitBranchModel((s) => s.configFiles);

  const { field } = useController({
    control: form.control,
    name: 'appConfigFile',
  });

  if (configFilesResponse.$status === 'initial') {
    return <ConfigFileInit />;
  }

  if (configFilesResponse.$status === 'loading') {
    return <FieldLoading />;
  }

  const defaultItem = iife(() => {
    if (!props.appConfig.lifecycle) return null;
    const { build, run } = props.appConfig.lifecycle;

    if (build.steps.length < 1 || !run.command) return null;

    return {
      label: 'Default',
      value: 'default',
    };
  });

  if (configFilesResponse.$status === 'failed' && !defaultItem) {
    return <FallbackError />;
  }

  const items = iife(() => {
    const gatheredItem =
      configFilesResponse.$status === 'success'
        ? configFilesResponse.list.map((item) => ({
            label: item.relativePath,
            value: item.relativePath,
          }))
        : [];

    if (defaultItem) {
      gatheredItem.push(defaultItem);
    }

    return gatheredItem;
  });

  return (
    <>
      <ComboboxWithSearch
        classNameButton="w-full"
        value={field.value}
        onChange={field.onChange}
        items={items}
        placeholder={tAll('common.terms.selectBranch')}
      />

      {configFilesResponse.$status === 'failed' && <FallbackError />}
    </>
  );
};

export default function FieldConfigFiles() {
  const { form } = useArtifactNewGeneralModel();

  const tAll = useDevetekTranslations();
  const t = useDevetekTranslations('sidepanel.artifactNew.fieldConfig');

  return (
    <FieldWrapper fieldTitle={t('title')}>
      <ConfigCbo />

      <ErrorInline
        t={tAll}
        message={form.formState.errors.appConfigFile?.message}
      />
    </FieldWrapper>
  );
}

import { useDevetekTranslations } from '@/services/i18n';

import { iife } from '@/shared/libs/browser/fn';
import { capitalizeFirstLetter } from '@/shared/libs/browser/string';
import {
  couple,
  guardedSelects,
} from '@/shared/libs/react-factories/guardedSelect';
import { Spinner } from '@/shared/presentation/atoms/Spinner';

import { useAppDataModel } from '../../-model/app-data';

import { AppInformationLayout as Layout } from './_presentation';
import { AppInformationStates as UIStates } from './_States';

const [guard, useAppDetail] = guardedSelects({
  initialIsLoading: true,
  fallbackLoading: UIStates.Loading,
  fallbackError: UIStates.Loading,
})(couple(useAppDataModel, (s) => s.appDetail));

export default guard(function AppInformation() {
  const [appSource] = useAppDetail((s) => [s.identity.source]);
  const [gitDetail] = useAppDataModel((s) => [s.gitDetail]);

  const t = useDevetekTranslations();

  const framework = iife(() => {
    if (gitDetail.$status === 'success' && gitDetail.repo_framework) {
      return capitalizeFirstLetter(gitDetail.repo_framework);
    }

    if (gitDetail.$status === 'loading') {
      return <Spinner className="w-4 h-4" classNameWrapper="w-max" />;
    }

    return capitalizeFirstLetter(appSource);
  });

  const language = iife(() => {
    if (gitDetail.$status === 'success' && gitDetail.repo_language) {
      return capitalizeFirstLetter(gitDetail.repo_language);
    }

    if (gitDetail.$status === 'loading') {
      return <Spinner className="w-4 h-4" classNameWrapper="w-max" />;
    }

    if (
      typeof framework === 'string' &&
      ['Wordpress', 'Laravel'].includes(framework)
    ) {
      return 'PHP';
    }

    return '-';
  });

  const defaultBranch = iife(() => {
    if (gitDetail.$status === 'success' && gitDetail.default_branch) {
      return gitDetail.default_branch;
    }

    return null;
  });

  const repoInfo = iife(() => {
    if (gitDetail.$status !== 'success') return null;

    return {
      organization: gitDetail.repo_org!,
      name: gitDetail.repo_name!,
      url: gitDetail.repo_url!,
    };
  });

  return (
    <Layout.Frame>
      {repoInfo && (
        <Layout.Row
          label={t('common.terms.repository')}
          value={`${repoInfo.organization} / ${repoInfo.name}`}
          link={repoInfo.url}
        />
      )}

      <Layout.TwoCols>
        <Layout.Row label="Framework" value={framework} />

        <Layout.Row label="Language" value={language} />

        <Layout.Row label="Environment" value="Production" />

        {defaultBranch && (
          <Layout.Row label="Default Branch" value={defaultBranch} />
        )}
      </Layout.TwoCols>
    </Layout.Frame>
  );
});

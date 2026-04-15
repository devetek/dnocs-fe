import { ApiGitBranch } from '@/shared/api';
import { useAdapter } from '@/shared/libs/api-client';
import { excludeNully } from '@/shared/libs/browser/typeguards';
import buildSelector from '@/shared/libs/react-factories/buildSelector';

import type { GitBranchModelProps as ModelProps } from '../rules/types';

import { useSubscribe } from './events';

export const [GitBranchModelProvider, useGitBranchModel] = buildSelector(
  'GitBranchModel',
)((props: ModelProps) => {
  const { repoName, repoOrganization } = props;

  const [responseGitBranch, refreshGitBranch] = ApiGitBranch.Find.useGet({
    repoOrganization,
    repoName,
  });

  useSubscribe('#artifact-new-sidepanel/git-branch-refresh', () =>
    refreshGitBranch(),
  );

  return {
    branches: useAdapter(responseGitBranch, (raw) => {
      return {
        list: raw
          .map((branch) => {
            const { name, commit } = branch;
            if (!name || !commit?.sha) return null;

            return {
              name,
              commitHead: commit.sha,
            };
          })
          .filter(excludeNully),
      };
    }),
  };
});

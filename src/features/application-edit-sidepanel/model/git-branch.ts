import { ApiGitBranch } from '@/shared/api';
import { useAdapter } from '@/shared/libs/api-client';
import { excludeNully } from '@/shared/libs/browser/typeguards';
import buildSelector from '@/shared/libs/react-factories/buildSelector';

import type { GitBranchModelProps as ModelProps } from '../rules/types';

import { useSubscribe } from './events';

export const [GitBranchModelProvider, useGitBranchModel] = buildSelector(
  'GitBranch',
)((props: ModelProps) => {
  const { repoName, repoOrganization } = props;

  const [response, refresh] = ApiGitBranch.Find.useGet({
    repoOrganization,
    repoName,
  });

  useSubscribe('#application-edit-sidepanel/git-branch-refresh', () =>
    refresh(),
  );

  return {
    ...useAdapter(response, (raw) => {
      return {
        branches: raw
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

import { ApiGitBranch, ApiGitFile } from '@/shared/api';
import { useAdapter } from '@/shared/libs/api-client';
import { excludeNully } from '@/shared/libs/browser/typeguards';
import buildSelector from '@/shared/libs/react-factories/buildSelector';

import type { GitBranchModelProps as ModelProps } from '../rules/types';

import { useSubscribe } from './events';
import { useArtifactNewGeneralModel } from './general';

export const [GitBranchModelProvider, useGitBranchModel] = buildSelector(
  'GitBranchModel',
)((props: ModelProps) => {
  const { repoName, repoOrganization } = props;

  const { form } = useArtifactNewGeneralModel();

  const [responseGitBranch, refreshGitBranch] = ApiGitBranch.Find.useGet({
    repoOrganization,
    repoName,
  });

  const selectedGitBranch = form.watch('fromBranch');

  const [responseGitConfigFiles, refreshGitConfigFiles] =
    ApiGitFile.Find.useGet({
      branch: selectedGitBranch,
      folder: '.devetek',
      repoOrganization: repoOrganization,
      repoName: repoName,
      options: {
        skip: !selectedGitBranch,
      },
    });

  useSubscribe('#artifact-new-sidepanel/git-branch-refresh', () =>
    refreshGitBranch(),
  );

  useSubscribe('#artifact-new-sidepanel/git-config-files-refresh', () =>
    refreshGitConfigFiles(),
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
    configFiles: useAdapter(responseGitConfigFiles, (raw) => {
      return {
        list: raw.map((file) => {
          return {
            relativePath: file.path,
          };
        }),
      };
    }),
  };
});

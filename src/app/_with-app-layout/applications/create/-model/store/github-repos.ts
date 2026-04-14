import { useMemo, useState } from 'react';

import { useAuthLoggedIn } from '@/services/auth';

import { ApiGitRepository } from '@/shared/api';
import { excludeNully } from '@/shared/libs/browser/typeguards';
import { buildContext } from '@/shared/libs/react-factories/buildContext';

export const [GithubReposStoreProvider, useGithubReposStore] = buildContext(
  'ApplicationsCreateGithubReposStore',
  () => {
    const { gitProfile } = useAuthLoggedIn();
    const { githubAccessToken } = gitProfile || {};

    const [page, setPage] = useState(1);
    const [query, setQuery] = useState('');
    const [githubOrg, setGithubOrg] = useState<string>();

    const handleOnsetGithubOrg = (value: string) => {
      if (value === 'Add GitHub Account') {
        window.open(
          `${import.meta.env.VITE_GITHUB_APP_URL}/installations/new`,
          '_blank',
        );

        return;
      }

      setGithubOrg(value);
    };

    const [responseGitRepositories, refresh] = ApiGitRepository.Find.useGet({
      page,
      pageSize: 5,
      gitOrganization: githubOrg,
      query,
      options: {
        skip: !gitProfile || !githubAccessToken,
      },
    });

    const githubRepos = useMemo(() => {
      if (!githubAccessToken || !gitProfile)
        return {
          $status: 'logged-out' as const,
        };

      if (responseGitRepositories.$status !== 'success')
        return responseGitRepositories;

      const { repos, next_page } = responseGitRepositories;

      return {
        $status: 'success' as const,
        nextPage: next_page || null,
        list: (repos ?? [])
          .map((repository) => {
            const { repo_name, repo_url, repo_org } = repository;

            if (!repo_name || !repo_url || !repo_org) return null;

            return {
              repoName: repo_name,
              repoUrl: repo_url,
              repoOrg: repo_org,
            };
          })
          .filter(excludeNully),
      };
    }, [gitProfile, githubAccessToken, responseGitRepositories]);

    return {
      githubRepos,
      setPage,
      query,
      setQuery,
      githubOrg,
      setGithubOrg: handleOnsetGithubOrg,
      refresh,
    };
  },
);

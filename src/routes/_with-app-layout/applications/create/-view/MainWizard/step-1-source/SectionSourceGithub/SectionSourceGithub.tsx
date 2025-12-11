import { useEffect, useState } from 'react';

import { SiGithub } from '@icons-pack/react-simple-icons';

import { useAuthLoggedIn } from '@/services/auth';
import { useDevetekTranslations } from '@/services/i18n';

import { ApiGitRepository } from '@/shared/api';
import { SearchInput } from '@/shared/presentation/atoms/SearchInput';
import { Spinner } from '@/shared/presentation/atoms/Spinner';
import { Combobox } from '@/shared/presentation/molecules/Combobox';

import { useFormStore } from '../../../../-model/store/form';
import { useGithubReposStore } from '../../../../-model/store/github-repos';
import { Sectioned } from '../../../../-presentation/Sectioned';
import { SelectionList } from '../../../../-presentation/SelectionList';
import GithubLoginWall from '../_presentation/GithubLoginWall/GithubLoginWall';

interface GithubRepoInfoProps {
  repoUrl?: string;
}

const GithubRepoInfo = (props: GithubRepoInfoProps) => {
  const { gitProfile } = useAuthLoggedIn();
  const { repoUrl } = props;

  const [setAppSourceGithubRepo, setAppSourceBundleIdent, setGitRepoConfig] =
    useFormStore((s) => [
      s.setAppSourceGithubRepo,
      s.setAppSourceBundleIdent,
      s.setGitRepoConfig,
    ]);

  const [repoOrganization = '', repoName = ''] =
    repoUrl
      ?.replace('https://github.com/', '')
      .replace('.git', '')
      .split('/') || [];

  const [repositoryDetail] = ApiGitRepository.Detail.$RepoOrg.$RepoName.useGet({
    repoName,
    repoOrganization,
    options: {
      skip: !repoUrl || !repoOrganization || !repoName,
    },
  });

  const { githubAccessToken: gitToken = '', login: gitNickname = '' } =
    gitProfile || {};

  useEffect(() => {
    if (repositoryDetail.$status !== 'success' || !repoUrl) return;
    const {
      repo_framework: repoFramework = 'unknown',
      default_branch: defaultBranch = '',
      commit_id: commitID = '',
      commit_message: commitMessage = '',
    } = repositoryDetail;

    setAppSourceGithubRepo(repoUrl);
    setAppSourceBundleIdent(repoFramework);
    setGitRepoConfig({
      gitProvider: 'github',
      gitHost: 'github.com',
      gitRepository: repoUrl,
      gitDefaultBranch: defaultBranch,
      gitNickname: gitNickname,
      gitToken: gitToken,
      gitBranch: defaultBranch,
      gitHead: commitID,
      gitHeadDescription: commitMessage,
    });
  }, [
    gitNickname,
    gitToken,
    repoUrl,
    repositoryDetail,
    setAppSourceBundleIdent,
    setAppSourceGithubRepo,
    setGitRepoConfig,
  ]);

  if (
    repositoryDetail.$status === 'initial' ||
    repositoryDetail.$status === 'failed'
  )
    return null;

  if (repositoryDetail.$status === 'loading') {
    return (
      <div className="w-fit">
        <Spinner />
      </div>
    );
  }

  const { repo_framework: repoFramework, repo_language: repoLanguage } =
    repositoryDetail;

  return (
    <div className="p-2 border rounded-lg w-fit">
      <p className="text-xs font-bold">
        {repoOrganization}/{repoName}
      </p>
      <p className="text-xs">Framework: {repoFramework || 'unknown'}</p>
      <p className="text-xs">Language: {repoLanguage || 'unknown'}</p>
    </div>
  );
};

export default function SectionSourceGithub() {
  const t = useDevetekTranslations(
    'page.applicationsCreate.wizard.step1.sectionGithubRepo',
  );

  const { gitProfile } = useAuthLoggedIn();

  const [resetAppSourceGithubRepo] = useFormStore((s) => [
    s.resetAppSourceGithubRepo,
  ]);

  const { githubRepos, query, setQuery, githubOrg, setGithubOrg } =
    useGithubReposStore();

  const [githubRepoUrl, setGithubRepoUrl] = useState<string>();

  const handleClickLoginGithub = () => {
    const backendEndpoint = import.meta.env.VITE_BACKEND ?? '';
    const publicEndpoint = import.meta.env.VITE_FRONTEND ?? '';
    localStorage.setItem('auth:provider', 'github');
    window.location.href = `${backendEndpoint}/v0/auth/github?state=${encodeURI(
      `${publicEndpoint}/v2/applications/create?source=github`,
    )}`;
  };

  let elContent =
    githubRepos.$status === 'logged-out' || !gitProfile ? (
      <GithubLoginWall onClick={handleClickLoginGithub} />
    ) : (
      <Spinner />
    );

  if (githubRepos.$status === 'success') {
    const gitOrgs = [
      { id: gitProfile?.id || 0, login: gitProfile?.login || '' },
      ...(gitProfile?.organizations || []),
      { id: -1, login: 'Add GitHub Account' },
    ];

    elContent = (
      <>
        <div className="flex justify-between items-center">
          <Combobox<string>
            onChange={setGithubOrg}
            placeholder="Team"
            value={githubOrg}
            items={gitOrgs.map((org) => {
              const { login } = org;

              return {
                value: login,
                label: login,
              };
            })}
          />
          <SearchInput
            classNameWrapper="w-38"
            placeholder={t('search')}
            defaultValue={query}
            onEnter={setQuery}
          />
        </div>

        <SelectionList<string>
          onClickItem={(id) => {
            resetAppSourceGithubRepo();
            setGithubRepoUrl(id);
          }}
          selectedId={githubRepoUrl}
          items={githubRepos.list.map((repo) => {
            const { repoName, repoOrg, repoUrl } = repo;

            return {
              id: repoUrl,
              title: `${repoOrg}/${repoName}`,
              desc: repoUrl,
            };
          })}
        />
      </>
    );
  }

  return (
    <Sectioned
      withinCard
      sectionIcon={SiGithub}
      sectionTitle={t('title')}
      sectionDescription={t('desc')}
      append={<GithubRepoInfo repoUrl={githubRepoUrl} />}
    >
      <div className="flex flex-col gap-4">{elContent}</div>
    </Sectioned>
  );
}

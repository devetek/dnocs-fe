import { useState } from 'react';

import { useAuthLoggedIn } from '@/services/auth';

import { AdapterApplicationFromDto } from '@/entities/application/adapter';
import type { SchemaCommon } from '@/entities/shared/rules/schema';

import { ApiApplication, ApiGitRepository } from '@/shared/api';
import type { RecipeParams } from '@/shared/api/git-repository.detail.$repoOrg.$repoName';
import { useAdapter } from '@/shared/libs/api-client';
import type { WithApiGetOptions } from '@/shared/libs/api-client/rules/types';
import buildSelector from '@/shared/libs/react-factories/buildSelector';

import { useSubscribe } from './events';

interface AppDataModelProps {
  applicationId: SchemaCommon.UnitId;
}

export const [AppDataModelProvider, useAppDataModel] = buildSelector(
  'AppDataModel',
)((props: AppDataModelProps) => {
  const { applicationId } = props;

  const { gitProfile } = useAuthLoggedIn();

  const [selectedServerId, setSelectedServerId] =
    useState<SchemaCommon.UnitId>();

  const [appDetailResponse, refreshAppDetailResponse] =
    ApiApplication.Detail.$Id.useGet({
      applicationId,
    });

  const paramsGitRepositoryDetail: WithApiGetOptions<RecipeParams> = {
    repoName: '',
    repoOrganization: '',
    options: {
      skip: true,
    },
  };

  let latestServerId: string | undefined;

  if (appDetailResponse.$status === 'success') {
    paramsGitRepositoryDetail.options!.skip = gitProfile == null;
    paramsGitRepositoryDetail.repoName = appDetailResponse.repo_name!;
    paramsGitRepositoryDetail.repoOrganization = appDetailResponse.repo_org!;

    if (
      appDetailResponse.deploys?.[0]?.machine_id &&
      appDetailResponse.deploys[0].machine != null
    ) {
      latestServerId = String(appDetailResponse.deploys[0].machine_id);
    }

    if (!selectedServerId && latestServerId) {
      setSelectedServerId(String(latestServerId));
    }
  }

  const [gitDetailReponse, refreshGitDetailReponse] =
    ApiGitRepository.Detail.$RepoOrg.$RepoName.useGet(
      paramsGitRepositoryDetail,
    );

  useSubscribe('@applications::detail/app-detail-refresh', () =>
    refreshAppDetailResponse(),
  );

  useSubscribe('@applications::detail/git-detail-refresh', () =>
    refreshGitDetailReponse(),
  );

  return {
    appDetail: useAdapter(appDetailResponse, (raw) =>
      AdapterApplicationFromDto.toApplicationDetail(raw).unwrap(),
    ),
    gitDetail: gitDetailReponse,

    applicationId,
    selectedServerId: selectedServerId || latestServerId,
    setSelectedServerId,
  };
});

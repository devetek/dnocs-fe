import { useState } from 'react';

import { AdapterApplicationFromDto } from '@/entities/application/adapter';
import { AdapterCicdArtifactFromDto } from '@/entities/cicd-artifact/adapter';
import { AdapterCicdDeploymentFromDto } from '@/entities/cicd-deployment/adapter';

import {
  ApiApplication,
  ApiArtifact,
  ApiDeploy,
  ApiGitRepository,
} from '@/shared/api';
import { useAdapter } from '@/shared/libs/api-client';
import { useErgo } from '@/shared/libs/ergo';
import buildSelector from '@/shared/libs/react-factories/buildSelector';

import type {
  UseGetAppDetailsParams,
  UseGetArtifactHistoryParams,
  UseGetDeploymentHistoryParams,
  UseGetGitDetailsParams,
} from './-types';
import { useSubscribe } from './events';

interface Props {
  applicationId: string;
}

export const [ResourcesModelProvider, useResourcesModel] = buildSelector(
  'ApplicationDetailResourcesModel',
)((props: Props) => {
  const { applicationId } = props;

  const { appDetails } = useGetAppDetails({ applicationId });

  const { gitDetails } = useGetGitDetails({ appDetails });

  const { artifacts } = useGetArtifactHistory({ applicationId });

  const { deployments } = useGetDeploymentHistory({ applicationId });

  return {
    appDetails: useErgo(appDetails),
    gitDetails: useErgo(gitDetails),
    artifacts: useErgo(artifacts),
    deployments: useErgo(deployments),
  };
});

function useGetAppDetails(params: UseGetAppDetailsParams) {
  const [appDetailsResponse, appDetailRefresh] =
    ApiApplication.Detail.$Id.useGet({
      applicationId: params.applicationId,
    });

  useSubscribe('@applications::details/resources/app-detail--refresh', () => {
    appDetailRefresh();
  });

  return {
    appDetails: useAdapter(appDetailsResponse, (raw) =>
      AdapterApplicationFromDto.toApplicationDetail(raw).unwrap(),
    ),
  };
}

function useGetGitDetails(params: UseGetGitDetailsParams) {
  const { appDetails } = params;

  const [gitDetailsResponse, gitDetailRefresh] =
    ApiGitRepository.Detail.$RepoOrg.$RepoName.useGetWhen(() => {
      if (
        appDetails.$status === 'success' &&
        appDetails.identity.source === 'repository'
      ) {
        return {
          repoName: appDetails.identity.repoName,
          repoOrganization: appDetails.identity.repoOrganization,
        };
      }
    });

  useSubscribe('@applications::details/resources/git-detail--refresh', () => {
    gitDetailRefresh();
  });

  return {
    gitDetails: gitDetailsResponse,
  };
}

function useGetArtifactHistory(params: UseGetArtifactHistoryParams) {
  const { applicationId } = params;

  const [page, setPage] = useState(1);
  const [enableAutoRefresh, setEnableAutoRefresh] = useState(true);

  const [artifactHistoryResponse, artifactHistoryRefresh] =
    ApiArtifact.Find.useGet({
      applicationId,
      page,
      limit: 3,
      options: {
        refreshIntervalMs: enableAutoRefresh ? 3000 : 0,
      },
    });

  useSubscribe(
    '@applications::details/resources/artifact-history--page',
    (p) => {
      if (p === 'next') {
        setPage((prev) => prev + 1);
      } else if (p === 'prev') {
        setPage((prev) => Math.max(prev - 1, 1));
      } else if (typeof p === 'number') {
        setPage(p);
      }
    },
  );

  useSubscribe(
    '@applications::details/resources/artifact-history--refresh',
    (e) => {
      if (e?.autoRefresh != null) {
        setEnableAutoRefresh(e.autoRefresh);
        return;
      }

      artifactHistoryRefresh();
    },
  );

  return {
    artifacts: useAdapter(artifactHistoryResponse, (raw) => {
      const { pagination, artifacts } = raw;

      return {
        pagination,
        list: (artifacts ?? []).map((artifact) =>
          AdapterCicdArtifactFromDto.toCicdArtifact(artifact).unwrap(),
        ),
      };
    }),
  };
}

function useGetDeploymentHistory(params: UseGetDeploymentHistoryParams) {
  const { applicationId } = params;

  const [page, setPage] = useState(1);
  const [enableAutoRefresh, setEnableAutoRefresh] = useState(true);

  const [deployHistoryResponse, deployHistoryRefresh] = ApiDeploy.Find.useGet({
    applicationId,
    page,
    limit: 5,
    options: {
      refreshIntervalMs: enableAutoRefresh ? 3000 : 0,
    },
  });

  useSubscribe(
    '@applications::details/resources/deployment-history--page',
    (p) => {
      if (p === 'next') {
        setPage((prev) => prev + 1);
      } else if (p === 'prev') {
        setPage((prev) => Math.max(prev - 1, 1));
      } else if (typeof p === 'number') {
        setPage(p);
      }
    },
  );

  useSubscribe(
    '@applications::details/resources/deployment-history--refresh',
    (e) => {
      if (e?.autoRefresh != null) {
        setEnableAutoRefresh(e.autoRefresh);
        return;
      }

      deployHistoryRefresh();
    },
  );

  return {
    deployments: useAdapter(deployHistoryResponse, (raw) => {
      const { pagination, deploys } = raw;

      return {
        pagination,
        list: (deploys ?? []).map((deployment) =>
          AdapterCicdDeploymentFromDto.toCicdDeployment(deployment).unwrap(),
        ),
      };
    }),
  };
}

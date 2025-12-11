import { useMemo } from 'react';

import { AdapterCicdArtifactFromDto } from '@/entities/cicd-artifact/adapter';
import { AdapterCicdDeploymentFromDto } from '@/entities/cicd-deployment/adapter';
import type { CicdDeployment } from '@/entities/cicd-deployment/rules/schema';
import type { SchemaCommon } from '@/entities/shared/rules/schema';

import { ApiArtifact, ApiDeploy } from '@/shared/api';
import { useAdapter } from '@/shared/libs/api-client';
import { excludeNully } from '@/shared/libs/browser/typeguards';
import buildSelector from '@/shared/libs/react-factories/buildSelector';

import { useAppDataModel } from './app-data';
import { useSubscribe } from './events';

interface ArtifactHistoryModelProps {
  applicationId: SchemaCommon.UnitId;
}

export const [ArtifactHistoryModelProvider, useArtifactHistoryModel] =
  buildSelector('ArtifactHistoryModel')((props: ArtifactHistoryModelProps) => {
    const { applicationId } = props;

    const selectedServerId = useAppDataModel((s) => s.selectedServerId);

    const [responseArtifactHistory, refreshArtifactHistory] =
      ApiArtifact.Find.useGet({
        applicationId: applicationId,
        serverId: selectedServerId,
        options: {
          skip: !selectedServerId,
          refreshIntervalMs: 3000,
        },
      });

    const [responseDeployHistory, refreshDeployHistory] = ApiDeploy.Find.useGet(
      {
        applicationId: applicationId,
        serverId: selectedServerId,
        options: {
          skip: !selectedServerId,
          refreshIntervalMs: 3000,
        },
      },
    );

    useSubscribe('@applications::detail/artifact-history-refresh', () =>
      refreshArtifactHistory(),
    );

    useSubscribe('@applications::detail/deployment-history-refresh', () =>
      refreshDeployHistory(),
    );

    const deploymentHistory = useAdapter(responseDeployHistory, (raw) => {
      const { pagination, deploys } = raw;

      const list = (deploys ?? [])
        .map((deployment) =>
          AdapterCicdDeploymentFromDto.toCicdDeployment(deployment).okay(),
        )
        .filter(excludeNully);

      return {
        pagination,
        list,
      };
    });

    const lastDeployment = useMemo(() => {
      let list: CicdDeployment[] | undefined;

      if (deploymentHistory.$status === 'success') {
        list = deploymentHistory.list;
      } else if (
        deploymentHistory.$status === 'loading' &&
        deploymentHistory.prevData
      ) {
        list = deploymentHistory.prevData.list;
      }

      if (list == null) return null;

      return list.find(
        (deployment) => deployment.pointerIds.machine === selectedServerId,
      );
    }, [deploymentHistory, selectedServerId]);

    return {
      artifactHistory: useAdapter(responseArtifactHistory, (raw) => {
        const { pagination, artifacts } = raw;

        return {
          pagination,
          list: (artifacts ?? []).map((artifact) =>
            AdapterCicdArtifactFromDto.toCicdArtifact(artifact).unwrap(),
          ),
        };
      }),
      deploymentHistory,
      lastDeployment,
    };
  });

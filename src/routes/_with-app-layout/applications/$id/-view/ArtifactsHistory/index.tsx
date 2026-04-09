import { useArtifactNewSidepanel } from '@/features/artifact-new-sidepanel';

import { iife } from '@/shared/libs/browser/fn';
import {
  couple,
  guardedSelects,
} from '@/shared/libs/react-factories/guardedSelect';
import { Pagination } from '@/shared/presentation/atoms/Pagination';
import { Card } from '@/shared/presentation/atoms/Card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/shared/presentation/atoms/Tabs';

import { useAppDataModel } from '../../-model/app-data';
import { useArtifactHistoryModel } from '../../-model/artifact-history';
import { useEmit } from '../../-model/events';

import { DeploymentList } from './_DeploymentList';
import { ArtifactsHistoryList as List } from './_List';
import { ArtifactsSection } from './_presentation';
import { ArtifactsHistoryStates as UIStates } from './_States';

const [guard, useAppDetail] = guardedSelects({
  fallbackLoading: UIStates.Loading,
  fallbackError: UIStates.Loading,
})(couple(useAppDataModel, (s) => s.appDetail));

const ArtifactsTabContent = guard(() => {
  const emit = useEmit();

  const [appSource, appOwner] = useAppDetail((s) => [
    s.identity.source,
    s.ownership.owner,
  ]);

  const [artifactHistory, artifactPage, setArtifactPage] =
    useArtifactHistoryModel((s) => [
      s.artifactHistory,
      s.artifactPage,
      s.setArtifactPage,
    ]);

  if (appSource !== 'repository') {
    return <UIStates.NotEligible />;
  }

  const artifactsContent = iife(() => {
    if (artifactHistory.$status === 'failed') {
      return (
        <UIStates.Failed
          error={artifactHistory.error}
          onClickRetry={() =>
            emit('@applications::detail/artifact-history-refresh', null)
          }
        />
      );
    }

    const list = iife(() => {
      if (artifactHistory.$status === 'success') return artifactHistory.list;
      if (artifactHistory.$status === 'loading' && artifactHistory.prevData)
        return artifactHistory.prevData.list;
      return null;
    });

    if (artifactHistory.$status === 'loading' && !list) {
      return <UIStates.Loading />;
    }

    if (!list || list.length === 0) {
      return <UIStates.Empty />;
    }

    return <List appOwner={appOwner} list={list} />;
  });

  const pag = iife(() => {
    if (artifactHistory.$status === 'success') return artifactHistory.pagination;
    if (artifactHistory.$status === 'loading' && artifactHistory.prevData)
      return artifactHistory.prevData.pagination;
    return null;
  });

  return (
    <>
      {artifactsContent}
      {pag && pag.total_page > 1 && (
        <div className="flex justify-end pt-1">
          <Pagination
            currentPage={artifactPage}
            maxPage={pag.total_page}
            onPageChange={setArtifactPage}
          />
        </div>
      )}
    </>
  );
});

const DeploymentsTabContent = guard(() => {
  const emit = useEmit();

  const [appSource] = useAppDetail((s) => [s.identity.source]);

  const [artifactHistory, deploymentHistory] =
    useArtifactHistoryModel((s) => [
      s.artifactHistory,
      s.deploymentHistory,
    ]);

  if (appSource !== 'repository') {
    return null;
  }

  const deploymentList = iife(() => {
    if (deploymentHistory.$status === 'success') return deploymentHistory.list;
    if (deploymentHistory.$status === 'loading' && deploymentHistory.prevData)
      return deploymentHistory.prevData.list;
    return null;
  });

  const artifactList = iife(() => {
    if (artifactHistory.$status === 'success') return artifactHistory.list;
    if (artifactHistory.$status === 'loading' && artifactHistory.prevData)
      return artifactHistory.prevData.list;
    return [];
  });

  const content = iife(() => {
    if (deploymentHistory.$status === 'failed') {
      return (
        <UIStates.Failed
          error={deploymentHistory.error}
          onClickRetry={() =>
            emit('@applications::detail/deployment-history-refresh', null)
          }
        />
      );
    }

    if (deploymentHistory.$status === 'loading' && !deploymentList) {
      return <UIStates.Loading />;
    }

    if (!deploymentList || deploymentList.length === 0) {
      return <UIStates.Empty />;
    }

    return <DeploymentList list={deploymentList} artifactList={artifactList} />;
  });

  return (
    <Card className="rounded-2xl">
      <div className="p-4 flex flex-col gap-2">{content}</div>
    </Card>
  );
});

export default function ArtifactsHistory() {
  const emit = useEmit();
  const [gitDetail, appDetail, selectedServerId] =
    useAppDataModel((s) => [
      s.gitDetail,
      s.appDetail,
      s.selectedServerId,
    ]);

  const [openArtifactNewSidepanel] = useArtifactNewSidepanel();

  const handleClickNewArtifact = () => {
    if (gitDetail.$status !== 'success' || appDetail.$status !== 'success')
      return;

    const { repo_org, repo_name } = gitDetail;
    if (!repo_org || !repo_name) return;

    openArtifactNewSidepanel({
      repoName: repo_name,
      repoOrganization: repo_org,
      applicationId: appDetail.id,
      currentServerId: selectedServerId,
      appConfig: appDetail.configDefs,
      onSuccess: () => {
        emit('@applications::detail/deployment-history-refresh', null);
        emit('@applications::detail/app-detail-refresh', null);
      },
    });
  };

  const ctaNewState = iife(() => {
    if (gitDetail.$status === 'success') {
      return undefined;
    }

    if (gitDetail.$status === 'loading') {
      return 'loading';
    }

    return 'disabled';
  });

  return (
    <Tabs defaultValue="artifacts">
      <TabsList className="mb-2 w-full bg-white dark:bg-muted">
        <TabsTrigger className="flex-1" value="artifacts">Artifacts</TabsTrigger>
        <TabsTrigger className="flex-1" value="deployments">Deployments</TabsTrigger>
      </TabsList>

      <TabsContent value="artifacts" className="flex flex-col gap-2 mt-0">
        <ArtifactsSection
          ctaNewState={ctaNewState}
          ctaNewOnClick={handleClickNewArtifact}
        >
          <ArtifactsTabContent />
        </ArtifactsSection>
      </TabsContent>

      <TabsContent value="deployments" className="mt-0">
        <DeploymentsTabContent />
      </TabsContent>
    </Tabs>
  );
}

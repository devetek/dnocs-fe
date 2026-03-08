import { useMemo } from 'react';

import { useArtifactNewSidepanel } from '@/features/artifact-new-sidepanel';

import { iife } from '@/shared/libs/browser/fn';
import {
  couple,
  guardedSelects,
} from '@/shared/libs/react-factories/guardedSelect';

import { useAppDataModel } from '../../-model/app-data';
import { useArtifactHistoryModel } from '../../-model/artifact-history';
import { useEmit } from '../../-model/events';

import { ArtifactsHistoryList as List } from './_List';
import { ArtifactsSection } from './_presentation';
import { ArtifactsHistoryStates as UIStates } from './_States';

const [guard, useAppDetail] = guardedSelects({
  fallbackLoading: UIStates.Loading,
  fallbackError: UIStates.Loading,
})(couple(useAppDataModel, (s) => s.appDetail));

const Content = guard(() => {
  const emit = useEmit();

  const [appSource, appOwner] = useAppDetail((s) => [
    s.identity.source,
    s.ownership.owner,
  ]);

  const [lastDeployment, artifactHistory] = useArtifactHistoryModel((s) => [
    s.lastDeployment,
    s.artifactHistory,
  ]);

  const [selectedServerId] = useAppDataModel((s) => [s.selectedServerId]);

  const curatedList = useMemo(() => {
    const selectedList = iife(() => {
      if (artifactHistory.$status === 'success') {
        return artifactHistory.list;
      }

      if (artifactHistory.$status === 'loading' && artifactHistory.prevData) {
        return artifactHistory.prevData.list;
      }

      return null;
    });

    if (selectedList == null || !selectedServerId) return null;

    return selectedList
      .filter((artifact) => artifact.pointerIds.machine === selectedServerId)
      .slice(0, 3);
  }, [artifactHistory, selectedServerId]);

  if (appSource !== 'repository') {
    return <UIStates.NotEligible />;
  }

  if (
    selectedServerId &&
    lastDeployment &&
    curatedList &&
    curatedList.length > 0
  ) {
    return (
      <List
        appOwner={appOwner}
        lastDeployment={lastDeployment}
        list={curatedList}
        selectedServerId={selectedServerId}
      />
    );
  }

  const shouldBeEmpty = iife(() => {
    const isLoading = artifactHistory.$status === 'loading';
    const isSuccess = artifactHistory.$status === 'success';

    if ((!curatedList || curatedList.length < 1) && isSuccess) {
      return true;
    }

    if (!isLoading && !selectedServerId) {
      return true;
    }

    return false;
  });

  if (shouldBeEmpty) {
    return <UIStates.Empty />;
  }

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

  return <UIStates.Loading />;
});

export default function ArtifactsHistory() {
  const emit = useEmit();
  const [gitDetail, appDetail, selectedServerId, setSelectedServerId] =
    useAppDataModel((s) => [
      s.gitDetail,
      s.appDetail,
      s.selectedServerId,
      s.setSelectedServerId,
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
      onSuccess: (workerId) => {
        setSelectedServerId(workerId);
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
    <ArtifactsSection
      ctaNewState={ctaNewState}
      ctaNewOnClick={handleClickNewArtifact}
    >
      <Content />
    </ArtifactsSection>
  );
}

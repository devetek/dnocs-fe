import { useToaster } from '@/services/toaster';

import { ApiArtifact, ApiDeploy, ApiGitBranch, ApiGitFile } from '@/shared/api';
import { iife } from '@/shared/libs/browser/fn';

import { useEmit, useSubscribe } from '../model/events';
import { useArtifactNewGeneralModel } from '../model/general';

export default function useFormSubmissionUsecase() {
  const { form, props } = useArtifactNewGeneralModel();

  const [openToaster] = useToaster();
  const sidepanelEmit = useEmit();

  const handleSubmit = form.handleSubmit(async (values) => {
    const { appConfigFile, fromBranch, workerId } = values;

    const appConfigFileResponse = await iife(() => {
      if (appConfigFile === 'default') return Promise.resolve(null);

      return ApiGitFile.Detail.$RepoOrg.$RepoName.fetchGet({
        repoName: props.repoName,
        repoOrganization: props.repoOrganization,
        branch: fromBranch,
        filePath: appConfigFile,
      });
    });

    if (
      appConfigFileResponse != null &&
      (appConfigFileResponse.$status === 'failed' ||
        !appConfigFileResponse.definition)
    ) {
      openToaster({
        message: `Failed to load app config ${appConfigFile}, please try again later.`,
        variant: 'error',
      });
      return;
    }

    const currentBranchResponse =
      await ApiGitBranch.Detail.$RepoOrg.$RepoName.fetchGet({
        branch: fromBranch,
        repoName: props.repoName,
        repoOrganization: props.repoOrganization,
      });

    if (
      currentBranchResponse.$status === 'failed' ||
      !currentBranchResponse.commit?.sha ||
      !currentBranchResponse.commit.message
    ) {
      openToaster({
        message: `Failed to load branch details for ${fromBranch}, please try again later.`,
        variant: 'error',
      });
      return;
    }

    const responseArtifactCreation = await ApiArtifact.Create.doPost({
      appDefinition: appConfigFileResponse?.definition,
      applicationId: props.applicationId,
      workerId,
      appConfigFile,
      fromBranch,
      commit: {
        message: currentBranchResponse.commit.message,
        sha: currentBranchResponse.commit.sha,
      },
    });

    if (responseArtifactCreation.$status === 'failed') {
      openToaster({
        variant: 'error',
        title: `Failed to create artifact!`,
        message: responseArtifactCreation.error.message,
      });
      return;
    }

    const responseDeployCreation = await iife(() => {
      if (workerId === props.currentServerId) return Promise.resolve(null);

      // Create deployment with artifact ID, on worker is not the same as selected worker
      // It expect to create new deployment with status pending
      // status will "pending" when no_deploy set true
      return ApiDeploy.Create.doPost({
        applicationId: props.applicationId,
        workerId,
        artifactId: responseArtifactCreation.id,
        isPrimary: true,
        noDeploy: true,
      });
    });

    if (
      responseDeployCreation != null &&
      responseDeployCreation.$status !== 'success'
    ) {
      openToaster({
        variant: 'warning',
        message: `Artifact created successfully, however deploy failed.`,
      });
    } else {
      openToaster({
        variant: 'success',
        message: `Successfully created artifact.`,
      });
    }

    sidepanelEmit('#artifact-new-sidepanel/sidepanel-close', {
      bypass: true,
    });

    props.onSuccess?.(workerId);
  });

  useSubscribe('#artifact-new-sidepanel/form-submit', () => handleSubmit());
}

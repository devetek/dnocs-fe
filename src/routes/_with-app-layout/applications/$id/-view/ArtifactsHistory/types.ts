import type { CicdArtifact } from '@/entities/cicd-artifact/rules/schema';
import type { CicdDeployment } from '@/entities/cicd-deployment/rules/schema';

export interface ArtifactsHistoryListProps {
  appOwner: string;
  list: CicdArtifact[];
  deploymentList: CicdDeployment[];
}

export interface ArtifactsHistoryStateFailedProps {
  error: Error;
  onClickRetry: () => void;
}

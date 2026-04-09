import type { CicdArtifact } from '@/entities/cicd-artifact/rules/schema';

export interface ArtifactsHistoryListProps {
  appOwner: string;
  list: CicdArtifact[];
}

export interface ArtifactsHistoryStateFailedProps {
  error: Error;
  onClickRetry: () => void;
}

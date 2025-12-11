import type { CicdArtifact } from '@/entities/cicd-artifact/rules/schema';
import type { CicdDeployment } from '@/entities/cicd-deployment/rules/schema';
import type { SchemaCommon } from '@/entities/shared/rules/schema';

export interface ArtifactsHistoryListProps {
  appOwner: string;
  list: CicdArtifact[];
  selectedServerId: SchemaCommon.UnitId;
  lastDeployment: CicdDeployment;
}

export interface ArtifactsHistoryStateFailedProps {
  error: Error;
  onClickRetry: () => void;
}

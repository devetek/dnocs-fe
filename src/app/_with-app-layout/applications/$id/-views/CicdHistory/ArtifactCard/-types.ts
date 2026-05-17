import type { CicdArtifact } from '@/entities/cicd-artifact/rules/schema';

export interface Props {
  isLatest?: boolean;
  data: CicdArtifact;
}

import type { CicdDeployment } from '@/entities/cicd-deployment/rules/schema';

export interface Props {
  data: CicdDeployment;
  isConfigStale?: boolean;
}

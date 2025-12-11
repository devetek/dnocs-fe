import type { CicdArtifact } from '@/entities/cicd-artifact/rules/schema';
import type { CicdDeployment } from '@/entities/cicd-deployment/rules/schema';

export type DeploymentStatus =
  | 'pending'
  | 'progress'
  | 'deployed'
  | 'failed'
  | 'cancelled'
  | 'inactive';

interface Params {
  artifact: CicdArtifact;
  lastDeployment?: CicdDeployment | null;
}

export function mapDeploymentStatus(params: Params): DeploymentStatus {
  const { artifact, lastDeployment } = params;

  if (lastDeployment?.pointerIds.artifact === artifact.id) {
    if (artifact.state.status === 'progress') {
      return 'progress';
    }

    switch (lastDeployment.state.status) {
      case 'ready':
        return 'deployed';

      case 'failed':
        return 'failed';

      case 'progress':
        return 'progress';

      case 'cancelled':
        return 'cancelled';

      case 'pending':
        return 'inactive';

      default:
        return 'inactive';
    }
  }

  switch (artifact.state.status) {
    case 'progress':
      return 'progress';

    case 'failed':
      return 'failed';

    case 'cancelled':
      return 'cancelled';

    default:
      return 'inactive';
  }
}

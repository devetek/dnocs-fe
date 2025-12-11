import { registerEvents } from '@/shared/libs/events';
import type { Rescope } from '@/shared/libs/events/models/registerEvents';

import type {
  ArtifactDeletePayload,
  ArtifactProgressCancelPayload,
  ArtifactRollbackPayload,
  DeploymentDeletePayload,
} from '../-rules/usecase-types';

type EventsRegistry = Rescope<
  '@applications::detail',
  {
    'artifact-progress-cancel': ArtifactProgressCancelPayload;
    'artifact-delete': ArtifactDeletePayload;
    'artifact-rollback': ArtifactRollbackPayload;
    'artifact-history-refresh': null;
    'deployment-delete': DeploymentDeletePayload;
    'deployment-history-refresh': null;
    'app-detail-refresh': null;
    'git-detail-refresh': null;
    'server-usage-retry-all': null;
    'github-login': null;
    'logs-download': null;
  }
>;

export const [useEmit, useSubscribe] = registerEvents<EventsRegistry>();

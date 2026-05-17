import { registerEvents } from '@/shared/libs/events';
import type { Rescope } from '@/shared/libs/events/models/registerEvents';

// import type {
//   ApplicationBuildEditPayload,
//   ApplicationDeletePayload,
//   ApplicationEditPayload,
//   ApplicationRunEditPayload,
//   ApplicationSetupEditPayload,
//   ArtifactDeletePayload,
//   ArtifactProgressCancelPayload,
//   ArtifactRollbackPayload,
//   DeploymentDeletePayload,
//   DeploymentRestorePayload,
// } from '../-rules/usecase-types';

type EventsRegistry = Rescope<
  '@applications::details',
  {
    'resources/app-detail--refresh'?: null;
    'resources/git-detail--refresh'?: null;
    'resources/artifact-history--refresh'?: {
      autoRefresh?: boolean;
    };
    'resources/artifact-history--page': 'next' | 'prev' | number;
    'resources/deployment-history--refresh'?: {
      autoRefresh?: boolean;
    };
    'resources/deployment-history--page': 'next' | 'prev' | number;

    'actions/github-login'?: null;
    'actions/new-artifact'?: null;
    // 'artifact-progress-cancel': ArtifactProgressCancelPayload;
    // 'artifact-delete': ArtifactDeletePayload;
    // 'artifact-rollback': ArtifactRollbackPayload;
    // 'artifact-history-refresh': null;
    // 'deployment-delete': DeploymentDeletePayload;
    // 'deployment-restore': DeploymentRestorePayload;
    // 'deployment-history-refresh': null;
    // 'application-delete': ApplicationDeletePayload;
    // 'application-edit': ApplicationEditPayload;
    // 'application-build-edit': ApplicationBuildEditPayload;
    // 'application-run-edit': ApplicationRunEditPayload;
    // 'application-setup-edit': ApplicationSetupEditPayload;
    // 'app-detail-refresh': null;
    // 'git-detail-refresh': null;
    // 'server-usage-retry-all': null;
    // 'github-login': null;
    // 'logs-download': null;
  }
>;

export const [useEmit, useSubscribe] = registerEvents<EventsRegistry>();

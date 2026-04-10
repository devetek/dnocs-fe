import { registerEvents } from '@/shared/libs/events';
import type { Rescope } from '@/shared/libs/events/models/registerEvents';

import type { FilterRules } from '../-rules';
import type {
  SshKeyDeletePayload,
  SshKeyDetailsPayload,
  SshKeyMigrateOwnershipPayload,
} from '../-rules/usecase-types';

type EventsRegistry = Rescope<
  '@ssh-keys',
  {
    'add-new'?: undefined;
    'filters/view-mode--change': FilterRules.ViewMode;
    'filters/search--input': FilterRules.SearchQuery;
    'filters/pagination--set': number;
    'data--refresh': null;
    'ssh-key--delete': SshKeyDeletePayload;
    'open--migrate-ownership': SshKeyMigrateOwnershipPayload;
    'open--details': SshKeyDetailsPayload;
  }
>;

export const [useEmit, useSubscribe] = registerEvents<EventsRegistry>();

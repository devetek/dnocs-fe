import { registerEvents } from '@/shared/libs/events';
import type { Rescope } from '@/shared/libs/events/models/registerEvents';

import type { FilterRules } from '../-rules';
import type {
  LbMigrateOwnershipPayload,
  LbOpenDetailsPayload,
  LbeletePayload,
} from '../-rules/usecase-types';

type EventsRegistry = Rescope<
  '@load-balancers',
  {
    'filters/view-mode--change': FilterRules.ViewMode;
    'filters/search--input': FilterRules.SearchQuery;
    'filters/pagination--set': number;
    'data--refresh': null;
    'lb--delete': LbeletePayload;
    'open--migrate-ownership': LbMigrateOwnershipPayload;
    'open--details': LbOpenDetailsPayload;
  }
>;

export const [useEmit, useSubscribe] = registerEvents<EventsRegistry>();

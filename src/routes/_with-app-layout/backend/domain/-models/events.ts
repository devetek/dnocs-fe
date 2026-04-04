import { registerEvents } from '@/shared/libs/events';
import type { Rescope } from '@/shared/libs/events/models/registerEvents';

import type { FilterRules } from '../-rules';
import type {
  DomainDeletePayload,
  DomainDetailsPayload,
  DomainMigrateOwnershipPayload,
} from '../-rules/usecase-types';

type EventsRegistry = Rescope<
  '@domain-dns',
  {
    'add-new-domain'?: undefined;
    'filters/view-mode--change': FilterRules.ViewMode;
    'filters/search--input': FilterRules.SearchQuery;
    'filters/pagination--set': number;
    'data--refresh': null;
    'domain--delete': DomainDeletePayload;
    'open--migrate-ownership': DomainMigrateOwnershipPayload;
    'open--details': DomainDetailsPayload;
  }
>;

export const [useEmit, useSubscribe] = registerEvents<EventsRegistry>();

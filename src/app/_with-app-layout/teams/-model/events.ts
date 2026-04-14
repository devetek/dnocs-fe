import { registerEvents } from '@/shared/libs/events';
import type { Rescope } from '@/shared/libs/events/models/registerEvents';

import type { FilterRules } from '../-rules';
import type {
  OrgDeletePayload,
  OrgDetailsPayload,
} from '../-rules/usecase-types';

type EventsRegistry = Rescope<
  '@teams',
  {
    'add-new'?: undefined;
    'filters/view-mode--change': FilterRules.ViewMode;
    'filters/search--input': FilterRules.SearchQuery;
    'filters/pagination--set': number;
    'data--refresh': null;
    'org--delete': OrgDeletePayload;
    'open--details': OrgDetailsPayload;
  }
>;

export const [useEmit, useSubscribe] = registerEvents<EventsRegistry>();

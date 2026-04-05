import { registerEvents } from '@/shared/libs/events';
import type { Rescope } from '@/shared/libs/events/models/registerEvents';

import type { FilterRules } from '../-rules';
import type {
  CloudProjectDeletePayload,
  CloudProjectDetailsPayload,
} from '../-rules/usecase-types';

type EventsRegistry = Rescope<
  '@cloud-projects',
  {
    'add-new'?: undefined;
    'filters/view-mode--change': FilterRules.ViewMode;
    'filters/search--input': FilterRules.SearchQuery;
    'filters/pagination--set': number;
    'data--refresh': null;
    'project--delete': CloudProjectDeletePayload;
    'open--details': CloudProjectDetailsPayload;
  }
>;

export const [useEmit, useSubscribe] = registerEvents<EventsRegistry>();

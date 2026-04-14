import { registerEvents } from '@/shared/libs/events';
import type { Rescope } from '@/shared/libs/events/models/registerEvents';

import type { FilterRules } from '../-rules';
import type { MemberDeletePayload } from '../-rules/usecase-types';

type EventsRegistry = Rescope<
  '@team-members',
  {
    'add-member'?: undefined;
    'edit-team'?: undefined;
    'filters/view-mode--change': FilterRules.ViewMode;
    'filters/pagination--set': number;
    'data--refresh': null;
    'member--delete': MemberDeletePayload;
  }
>;

export const [useEmit, useSubscribe] = registerEvents<EventsRegistry>();

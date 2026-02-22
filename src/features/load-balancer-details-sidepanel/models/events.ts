import { registerEvents } from '@/shared/libs/events';
import type { Rescope } from '@/shared/libs/events/models/registerEvents';

type EventsRegistry = Rescope<
  '#load-balancer-details-sidepanel',
  {
    'lb-details/refresh-details'?: null;
    'lb-details/refresh-activity-timeline'?: null;
  }
>;

export const [useEmit, useSubscribe] = registerEvents<EventsRegistry>();

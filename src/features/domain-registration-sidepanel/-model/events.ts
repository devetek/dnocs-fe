import { registerEvents } from '@/shared/libs/events';
import type { Rescope } from '@/shared/libs/events/models/registerEvents';

type EventsRegistry = Rescope<
  '#domain-registration-sidepanel',
  {
    'form-submit': null;
    'sidepanel-close': null;
  }
>;

export const [useEmit, useSubscribe] = registerEvents<EventsRegistry>();

import { registerEvents } from '@/shared/libs/events';
import type { Rescope } from '@/shared/libs/events/models/registerEvents';

type EventsRegistry = Rescope<
  '@landing',
  {
    'responsive/login-form/open': void;
    'responsive/login-form/close': void;
  }
>;

export const [useEmit, useSubscribe] = registerEvents<EventsRegistry>();

import { registerEvents } from '@/shared/libs/events';
import type { Rescope } from '@/shared/libs/events/models/registerEvents';

type EventsRegistry = Rescope<
  '#application-run-edit-sidepanel',
  {
    'sidepanel-close'?: null | { bypass: true };
    'form-submit': null;
  }
>;

export const [useEmit, useSubscribe] = registerEvents<EventsRegistry>();

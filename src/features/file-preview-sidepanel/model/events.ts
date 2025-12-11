import { registerEvents } from '@/shared/libs/events';
import type { Rescope } from '@/shared/libs/events/models/registerEvents';

type EventsRegistry = Rescope<
  '#file-preview-sidepanel',
  {
    'preview-get': null;
  }
>;

export const [useEmit, useSubscribe] = registerEvents<EventsRegistry>();

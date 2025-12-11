import { registerEvents } from '@/shared/libs/events';
import type { Rescope } from '@/shared/libs/events/models/registerEvents';

type EventsRegistry = {
  'services-refresh': null;
};

export const [useEmit, useSubscribe] =
  registerEvents<Rescope<'@servers::services', EventsRegistry>>();

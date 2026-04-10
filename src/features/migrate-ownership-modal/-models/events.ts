import { registerEvents } from '@/shared/libs/events';
import type { Rescope } from '@/shared/libs/events/models/registerEvents';

type EventsRegistry = Rescope<
  '#migrate-ownership-modal',
  {
    'resources/teams-refresh'?: undefined;
    'modal-close'?: undefined;
    'form-submit'?: undefined;
  }
>;

export const [useEmit, useSubscribe] = registerEvents<EventsRegistry>();

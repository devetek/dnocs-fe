import { registerEvents } from '@/shared/libs/events';
import type { Rescope } from '@/shared/libs/events/models/registerEvents';

type EventsRegistry = Rescope<
  '#load-balancer-creation-sidepanel',
  {
    'on-success'?: undefined;
    'form-submit'?: undefined;
    'sidepanel-close'?: {
      bypass: boolean;
    };
    'resources/server-refresh'?: null;
    'resources/server-search': string;
    'resources/application-refresh'?: null;
    'resources/domain-refresh'?: null;
  }
>;

export const [useEmit, useSubscribe] = registerEvents<EventsRegistry>();

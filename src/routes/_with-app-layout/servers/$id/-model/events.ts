import { registerEvents } from '@/shared/libs/events';
import type { Rescope } from '@/shared/libs/events/models/registerEvents';

import type { FavoriteNavigationPayload } from '../-rules/usecase-types';

type EventsRegistry = {
  'server-detail-refresh': null;
  'server-stats-refresh': null;
  'server-services-refresh': null;
  'server-modules-refresh': null;
  'favorite-navigation': FavoriteNavigationPayload;
};

export const [useEmit, useSubscribe] =
  registerEvents<Rescope<'@servers::detail', EventsRegistry>>();

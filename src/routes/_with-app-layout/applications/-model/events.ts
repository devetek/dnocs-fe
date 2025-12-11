import type { ApplicationCard } from '@/entities/application/rules/schema';

import { registerEvents } from '@/shared/libs/events';
import type { Rescope } from '@/shared/libs/events/models/registerEvents';

import type {
  ApplicationClaimPayload,
  ApplicationDeletePayload,
} from '../-rules/usecase-types';

type EventsRegistry = Rescope<
  '@applications',
  {
    'application-claim': ApplicationClaimPayload;
    'application-delete': ApplicationDeletePayload;
    'application-refresh': null;
    'application-edit': ApplicationCard;
    'github-login': null;
  }
>;

export const [useEmit, useSubscribe] = registerEvents<EventsRegistry>();

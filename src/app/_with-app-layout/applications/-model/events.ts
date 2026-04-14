import type { ApplicationCard } from '@/entities/application/rules/schema';

import { registerEvents } from '@/shared/libs/events';
import type { Rescope } from '@/shared/libs/events/models/registerEvents';

import type {
  ApplicationDeletePayload,
  ApplicationMigrateOwnershipPayload,
} from '../-rules/usecase-types';

type EventsRegistry = Rescope<
  '@applications',
  {
    'open--migrate-ownership': ApplicationMigrateOwnershipPayload;
    'application-delete': ApplicationDeletePayload;
    'application-refresh': null;
    'application-edit': ApplicationCard;
    'github-login': null;
  }
>;

export const [useEmit, useSubscribe] = registerEvents<EventsRegistry>();

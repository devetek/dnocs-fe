import { registerEvents } from '@/shared/libs/events';
import type { Rescope } from '@/shared/libs/events/models/registerEvents';

type AuthEvents = Rescope<
  '%%auth',
  {
    'user-profile::refresh': null;
    'git-user::refresh': null;
    refresh: null;
  }
>;

export const [useAuthEmit, useAuthSubscribe] = registerEvents<AuthEvents>();

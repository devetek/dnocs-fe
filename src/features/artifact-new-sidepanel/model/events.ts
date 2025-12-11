import { registerEvents } from '@/shared/libs/events';
import type { Rescope } from '@/shared/libs/events/models/registerEvents';

type EventsRegistry = Rescope<
  '#artifact-new-sidepanel',
  {
    'git-branch-refresh': null;
    'git-config-files-refresh': null;
    'workers-refresh': null;
    'sidepanel-close'?: null | {
      bypass: true;
    };
    'form-submit': null;
  }
>;

export const [useEmit, useSubscribe] = registerEvents<EventsRegistry>();

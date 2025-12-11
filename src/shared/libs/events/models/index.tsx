import type { PropsWithChildren, RefObject } from 'react';
import { createContext, useContext, useRef } from 'react';

import type { Emitter } from 'mitt';
import mitt from 'mitt';

const EventsContext = createContext<RefObject<
  Emitter<Record<string, unknown>>
> | null>(null);

export function EventsProvider({ children }: PropsWithChildren<unknown>) {
  const refMitt = useRef(mitt());

  return (
    <EventsContext.Provider value={refMitt}>{children}</EventsContext.Provider>
  );
}

export function useEventsContext() {
  const context = useContext(EventsContext);

  if (context == null) {
    throw new Error('useEventsContext must be used within a EventsProvider');
  }

  return context;
}

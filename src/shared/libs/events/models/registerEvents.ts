import type { Emitter, Handler } from 'mitt';

import useHandler from '@/shared/libs/react-hooks/useHandler';
import { useIsomorphicEffect } from '@/shared/libs/react-hooks/useIsomorphicEffect';

import { useEventsContext } from '.';

/**
 * Registers event handlers and emitters for a given set of events.
 *
 * @template E - A record type representing the events and their corresponding handler types.
 *
 * @returns A tuple containing:
 * - `useEmit`: A hook to emit events.
 * - `useSubscribe`: A hook to subscribe to a specific event with a given event listener.
 *
 * @example
 * ```typescript
 * type Events = {
 *   eventName: EventData;
 * };
 *
 * const [useEmit, useSubscribe] = registerEvents<Events>();
 *
 * function Component() {
 *   useSubscribe('eventName', (data) => {
 *     console.log(data);
 *   });
 *
 *   const emit = useEmit();
 *   emit('eventName', { key: 'value' });
 * }
 * ```
 */
export default function registerEvents<E extends Record<string, unknown>>() {
  function useSubscribe<K extends keyof E>(
    eventName: K,
    eventListener: Handler<E[K]>,
  ) {
    const refEvents = useEventsContext();

    const handleListener = useHandler(eventListener);

    useIsomorphicEffect(() => {
      const event = refEvents.current;

      event.on(eventName as string, handleListener as Handler<unknown>);

      return () => {
        event.off(eventName as string, handleListener as Handler<unknown>);
      };
    }, [eventName, handleListener, refEvents]);
  }

  const useEmit = () => {
    const refEvents = useEventsContext() as { current: Emitter<E> };

    const emit = useHandler((type, event) => {
      refEvents.current.emit(type, event);
    }) as Emitter<E>['emit'];

    return emit;
  };

  const createSubscription = <K extends keyof E>(eventName: K) => {
    return (useListen: (emit: ReturnType<typeof useEmit>) => Handler<E[K]>) => {
      return () => {
        const emit = useEmit();
        const handleListener = useListen(emit);
        useSubscribe(eventName, handleListener);
      };
    };
  };

  return [useEmit, useSubscribe, createSubscription] as const;
}

export type Rescope<S extends string, T> = {
  [K in keyof T as `${S}/${Extract<K, string>}`]: T[K];
};

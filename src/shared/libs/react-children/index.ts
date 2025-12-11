import type { ReactNode } from 'react';
import { Children, isValidElement } from 'react';

type Component<P> = (props: P) => ReactNode;

interface SlotTag {
  $$slotName: string;
}

export type SlotComponent<P> = Component<P> & SlotTag;

export const createSlot = <C extends Component<any>>(
  slotName: string,
  component: C,
): C & SlotTag => {
  const slot = component as C & SlotTag;
  slot.$$slotName = slotName;
  return slot;
};

export const createScopeForSlot = (scope: string) => {
  return <C extends Component<any>>(slotName: string, component: C) =>
    createSlot<C>(`${scope}::${slotName}`, component);
};

const hasSlotTag = (t: unknown): t is SlotTag =>
  (typeof t === 'function' || typeof t === 'object') &&
  t != null &&
  '$$slotName' in t;

export const slotMatch = (child: ReactNode, slotName: string): boolean => {
  if (!isValidElement(child)) return false;

  const validChild = child.type;

  const match =
    typeof validChild !== 'string' &&
    hasSlotTag(validChild) &&
    validChild.$$slotName === slotName;

  return match;
};

export const extractSlots = <T extends Array<SlotComponent<any>>>(
  children: ReactNode,
  ...components: T
): { [K in keyof T]: ReactNode } => {
  const results = components.map(() => null) as {
    [K in keyof T]: ReactNode;
  };

  Children.forEach(children, (child) => {
    components.forEach((component, index) => {
      if (slotMatch(child, component.$$slotName)) {
        results[index] = child;
      }
    });
  });

  return results;
};

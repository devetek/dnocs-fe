import type { JSX, ReactNode } from 'react';
import { Children, isValidElement } from 'react';

type Component<P> = (props: P) => ReactNode;
type ComponentJSX<P> = (props: P) => JSX.Element;

interface SlotTag {
  $$slotName: string;
}

export type SlotComponent<P> = Component<P> & SlotTag;
export type SlotComponentJSX<P> = ComponentJSX<P> & SlotTag;

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

export const slotMatch = (
  child: ReactNode,
  slotName: string,
  strictJSX = false,
): boolean => {
  if (!isValidElement(child)) return false;

  const childToCheck = child.type;

  if (strictJSX) {
    if (
      typeof childToCheck === 'function' ||
      typeof childToCheck === 'object'
    ) {
      return hasSlotTag(childToCheck) && childToCheck.$$slotName === slotName;
    }

    return false;
  }

  const match =
    typeof childToCheck !== 'string' &&
    hasSlotTag(childToCheck) &&
    childToCheck.$$slotName === slotName;

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

export const extractSlotMultchildren = <T extends SlotComponent<any>>(
  children: ReactNode,
  slotComponent: T,
): ReactNode[] => {
  const collectedSlotChildren: ReactNode[] = [];

  Children.forEach(children, (child) => {
    if (slotMatch(child, slotComponent.$$slotName, true)) {
      collectedSlotChildren.push(child);
    }
  });

  return collectedSlotChildren;
};

// =============================================================================
//   Foundation
// =============================================================================

import type { ReactNode } from 'react';

import type { z } from 'zod';

import type { useDevetekTranslations } from '@/services/i18n';

export interface ActionRegistry {
  yesNo: 'yes' | 'no';
  okCancel: 'ok' | 'cancel';
  ok: 'ok';
}

export type Variant =
  | 'info' //
  | 'warning'
  | 'error';

export type Extra<X> = unknown extends X ? {} : X;

export type Node<P> = (props: Extra<P> & NodeIntrinsicProps) => ReactNode;

export interface NodeIntrinsicProps {
  t: ReturnType<typeof useDevetekTranslations>;
}

// =============================================================================
//   Properties
// =============================================================================

// prettier-ignore
export interface BuilderParams<A extends keyof ActionRegistry, X> {
  variant: Variant;
  action: A;
  actionManualResolve?: ActionRegistry[A] | Array<ActionRegistry[A]>;
  title: string | Node<X>;
  content: string | Node<X>;
  extraProps?: z.ZodType<X>;
}

// prettier-ignore
export type UseDialog<A extends keyof ActionRegistry, X> =
  () => [DialogOnOpen<A, X>, DialogOnClose];

export type DialogOnClose = () => void;

// prettier-ignore
export type DialogOnOpen<A extends keyof ActionRegistry, X> =
  unknown extends X
    ? () => Promise<DialogInstance<A>>
    : (params: X) => Promise<DialogInstance<A>>;

// prettier-ignore
export interface DialogInstance<A extends keyof ActionRegistry> {
  get isUnresolved(): boolean;
  get response(): ActionRegistry[A];
  resolve: () => void;
  reject: (error: Error) => Promise<void>;
}

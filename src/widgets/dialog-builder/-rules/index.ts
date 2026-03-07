import type { ReactNode } from 'react';

import type { useDevetekTranslations } from '@/services/i18n';

export interface BuildDialogParams<A extends DialogActions> {
  variant: DialogVariant;
  action: A;
  title: string | DialogComponent;
  content: string | DialogComponent;
}

// prettier-ignore
export type BuildDialogReturnHook<A extends DialogActions, AUnit extends DialogActionUnit<A>> = 
  () => [DialogHookOnOpen<A, AUnit>, () => void];

// prettier-ignore
export type DialogHookOnOpen<A extends DialogActions, AUnit extends DialogActionUnit<A>> = 
  (params?: DialogHookOnOpenParams<A, AUnit>) => Promise<[AUnit, DialogController]>;

// prettier-ignore
export interface DialogHookOnOpenParams<A extends DialogActions, AUnit extends DialogActionUnit<A>> {
  manualResolveOn?: AUnit | AUnit[];
}

export interface DialogActionsRegistry {
  'yes-no': 'yes' | 'no';
  'ok-cancel': 'ok' | 'cancel';
  ok: 'ok';
}

export type DialogActions = keyof DialogActionsRegistry;

export type DialogActionUnit<A extends DialogActions> =
  DialogActionsRegistry[A];

export type DialogVariant =
  | 'info' //
  | 'warning'
  | 'error';

export type DialogComponent = (props: DialogComponentProps) => ReactNode;

export interface DialogComponentProps {
  t: ReturnType<typeof useDevetekTranslations>;
}

export interface DialogController {
  resolve: () => void;
  reject: (error: Error) => void;
}

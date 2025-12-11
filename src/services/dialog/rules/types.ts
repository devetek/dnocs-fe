import type { ReactNode } from 'react';

export interface DialogPayload {
  title: ReactNode;
  content: ReactNode;
  variant: DialogVariant;
  actions: DialogAction;
}

export type DialogVariant = 'info' | 'warning' | 'error';

export type DialogAction =
  | DialogActionVariant<'YesNo', DialogActionYesNo>
  | DialogActionVariant<'OkCancel', DialogActionOkCancel>
  | DialogActionVariant<'Ok', DialogActionOk>
  | DialogActionFreeform[];

export type DialogActionVariant<V extends string, W> = W & {
  variant: V;
};

export interface DialogActionYesNo {
  yes: ActHandler;
  no?: ActHandler;
  persistAfterYes?: boolean;
  persistAfterNo?: boolean;
}

export interface DialogActionOkCancel {
  ok: ActHandler;
  cancel?: ActHandler;
  persistAfterOk?: boolean;
  persistAfterCancel?: boolean;
}

export interface DialogActionOk {
  ok: ActHandler;
  persistAfterOk?: boolean;
}

export interface DialogActionFreeform {
  label: string;
  isPrimary?: boolean;
  persistAfterAction?: boolean;
  onClick?: ActHandler;
}

export type ActHandler = () => void | Promise<void>;

import useHandler from '@/shared/libs/react-hooks/useHandler';

import { useDialogEmit } from '../model/event';
import type { DialogPayload } from '../rules/types';

export function useDialog() {
  const emit = useDialogEmit();

  const openDialog = useHandler((payload: DialogPayload) => {
    emit('%%dialog/open', payload);
  });

  const closeDialog = useHandler(() => {
    emit('%%dialog/close', null);
  });

  return [openDialog, closeDialog] as const;
}

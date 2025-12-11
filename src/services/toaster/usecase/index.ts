import useHandler from '@/shared/libs/react-hooks/useHandler';

import { useToasterEmit } from '../model/toasterEvent';
import type { PushToast, ToasterItem, ToasterVariant } from '../rules/types';

export function useToaster() {
  const emit = useToasterEmit();

  function pushToast(options: ToasterItem): void;
  function pushToast(variant: ToasterVariant, message: string): void;

  function pushToast(param1: ToasterItem | ToasterVariant, param2?: string) {
    if (typeof param1 === 'object') {
      emit('%%toaster/push', param1);
      return;
    }

    emit('%%toaster/push', {
      message: param2,
      variant: param1,
      duration: 3000,
    });
  }

  const stablePushToast: PushToast = useHandler(pushToast);

  const closeAllToasts = useHandler(() => {
    emit('%%toaster/clear-all', null);
  });

  return [stablePushToast, closeAllToasts] as const;
}

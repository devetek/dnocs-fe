import { createElement } from 'react';

import useHandler from '@/shared/libs/react-hooks/useHandler';

import { useSidepanelEmit } from '../model/event';
import type { Sidepanel } from '../rules/types';

export default function registerSidepanel<P extends {}>(
  Sidepanel: Sidepanel<P>,
) {
  return function useSidepanel() {
    const emit = useSidepanelEmit();

    const open = useHandler((props: P & { $mode?: 'open' | 'push' }) => {
      if (!props.$mode || props.$mode === 'open') {
        emit('%%sidepanel/open', {
          content: createElement(Sidepanel, props),
        });
        return;
      }

      emit('%%sidepanel/push', {
        content: createElement(Sidepanel, props),
      });
    });

    const close = useHandler(() => {
      emit('%%sidepanel/close', null);
    });

    return [open, close] as const;
  };
}

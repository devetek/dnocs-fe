import { createElement } from 'react';

import useHandler from '@/shared/libs/react-hooks/useHandler';

import { useModalEmit } from '../model/event';
import type { Modal } from '../rules/types';

export default function registerModal<P extends {}>(Modal: Modal<P>) {
  return function useModal() {
    const emit = useModalEmit();

    const openModal = useHandler((props: P) => {
      emit('%%modal/open', {
        content: createElement(Modal, props),
      });
    });

    const closeModal = useHandler(() => {
      emit('%%modal/close', null);
    });

    return [openModal, closeModal] as const;
  };
}

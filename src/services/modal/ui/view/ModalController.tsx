import { useState } from 'react';

import {
  Dialog,
  DialogOverlay,
  DialogPortal,
} from '@/shared/presentation/atoms/Dialog';

import { useModalSubscribe } from '../../model/event';
import type { ModalPayload } from '../../rules/types';

export default function ModalController() {
  const [modalPayload, setModalPayload] = useState<ModalPayload>();
  const [isOpen, setIsOpen] = useState(false);
  const [allowClickOutsideClose, setAllowClickOutsideClose] = useState(true);

  useModalSubscribe('%%modal/open', (payload) => {
    setModalPayload(payload);
    setIsOpen(true);
  });

  useModalSubscribe('%%modal/close', () => {
    setIsOpen(false);
    setModalPayload(undefined);
    setAllowClickOutsideClose(true);
  });

  useModalSubscribe('%%modal/allow-trivial-close', (value) => {
    setAllowClickOutsideClose(value);
  });

  return (
    <Dialog open={isOpen}>
      {modalPayload && (
        <DialogPortal>
          <DialogOverlay
            onClick={() => {
              if (!allowClickOutsideClose) return;
              setIsOpen(false);
            }}
          />
          {modalPayload.content}
        </DialogPortal>
      )}
    </Dialog>
  );
}

import { useEffect } from 'react';

import { useFormState } from 'react-hook-form';

import { useModalEmit } from '@/services/modal/model/event';

import { useSubscribe } from '../-models/events';
import { useMigrateOwnershipForm } from '../-models/form';

export default function useContextualBehavior() {
  const form = useMigrateOwnershipForm();
  const modalEmit = useModalEmit();

  const { isDirty } = useFormState({ control: form.control });

  useEffect(() => {
    modalEmit('%%modal/allow-trivial-close', !isDirty);
  }, [isDirty, modalEmit]);

  useSubscribe('#migrate-ownership-modal/modal-close', () => {
    modalEmit('%%modal/close', null);
  });
}

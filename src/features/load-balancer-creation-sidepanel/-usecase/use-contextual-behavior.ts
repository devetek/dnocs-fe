import { useEffect } from 'react';

import { useFormState } from 'react-hook-form';

import { useSidepanelEmit } from '@/services/sidepanel/model/event';

import buildDialog from '@/widgets/dialog-builder';

import { useSubscribe } from '../-model/events';
import { useLbCreationForm } from '../-model/form';

const useConfirmExitDialog = buildDialog({
  variant: 'warning',
  action: 'yesNo',
  title: '@dialog.confirmExit.title',
  content: '@dialog.confirmExit.message',
});

export default function useContextualBehavior() {
  const form = useLbCreationForm();
  const [openDialogConfirmExit] = useConfirmExitDialog();
  const sidepanelEmit = useSidepanelEmit();

  const { isDirty } = useFormState({ control: form.control });

  useEffect(() => {
    sidepanelEmit('%%sidepanel/allow-trivial-close', !isDirty);
  }, [form, isDirty, sidepanelEmit]);

  useSubscribe(
    '#load-balancer-creation-sidepanel/sidepanel-close',
    async (payload) => {
      if (isDirty && !(payload?.bypass ?? false)) {
        const dialog = await openDialogConfirmExit();
        if (dialog.response !== 'yes') return;
      }

      form.reset();
      sidepanelEmit('%%sidepanel/close', null);
    },
  );
}

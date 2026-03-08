import { useEffect } from 'react';

import { useFormContext, useFormState } from 'react-hook-form';

import { useSidepanelEmit } from '@/services/sidepanel/model/event';

import useHandler from '@/shared/libs/react-hooks/useHandler';
import buildDialog from '@/widgets/dialog-builder';

import type { SignUpForm } from '../rules/login';

const useConfirmExitDialog = buildDialog({
  variant: 'warning',
  action: 'yes-no',
  title: '@dialog.confirmExit.title',
  content: '@dialog.confirmExit.message',
});

export default function useContextualBehavior() {
  const form = useFormContext<SignUpForm>();

  const [openDialogConfirmExit] = useConfirmExitDialog();

  const sidepanelEmit = useSidepanelEmit();

  const { isDirty } = useFormState({ control: form.control });

  useEffect(() => {
    sidepanelEmit('%%sidepanel/allow-trivial-close', !isDirty);
  }, [isDirty, sidepanelEmit]);

  const handleCloseSidepanel = useHandler(async () => {
    if (isDirty) {
      const [dialogResponse] = await openDialogConfirmExit();

      if (dialogResponse !== 'yes') return;
    }

    sidepanelEmit('%%sidepanel/close', null);
  });

  return {
    handleCloseSidepanel,
    onlyStrictClosing: isDirty,
  };
}

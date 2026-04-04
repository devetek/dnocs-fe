import { useEffect } from 'react';

import { useFormState } from 'react-hook-form';

import { useSidepanelEmit } from '@/services/sidepanel/model/event';

import useHandler from '@/shared/libs/react-hooks/useHandler';
import buildDialog from '@/widgets/dialog-builder';

import { useSubscribe } from '../-model/events';
import { useDomainRegistrationModel } from '../-model/general';

const useConfirmExitDialog = buildDialog({
  variant: 'warning',
  action: 'yesNo',
  title: '@dialog.confirmExit.title',
  content: '@dialog.confirmExit.message',
});

export default function useContextualBehavior() {
  const { form } = useDomainRegistrationModel();
  const [openDialogConfirmExit] = useConfirmExitDialog();
  const sidepanelEmit = useSidepanelEmit();

  const { isDirty } = useFormState({ control: form.control });

  useEffect(() => {
    sidepanelEmit('%%sidepanel/allow-trivial-close', !isDirty);
  }, [isDirty, sidepanelEmit]);

  const handleClose = useHandler(async () => {
    if (isDirty) {
      const dialog = await openDialogConfirmExit();
      if (dialog.response !== 'yes') return;
    }

    sidepanelEmit('%%sidepanel/close', null);
  });

  useSubscribe('#domain-registration-sidepanel/sidepanel-close', () =>
    handleClose(),
  );
}

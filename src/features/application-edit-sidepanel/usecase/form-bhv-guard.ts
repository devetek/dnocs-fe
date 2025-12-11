import { useEffect } from 'react';

import { useDialog } from '@/services/dialog';
import { useDevetekTranslations } from '@/services/i18n';
import { useSidepanelEmit } from '@/services/sidepanel/model/event';

import { useApplicationEditModel } from '../model';
import { useSubscribe } from '../model/events';

export default function useFormBhvGuardUsecase() {
  const { hasChanges } = useApplicationEditModel();

  const sidepanelEmit = useSidepanelEmit();

  const t = useDevetekTranslations('dialog.genericUnsavedChanges');

  const [openDialog] = useDialog();

  useEffect(() => {
    sidepanelEmit('%%sidepanel/allow-trivial-close', !hasChanges);
  }, [sidepanelEmit, hasChanges]);

  useSubscribe('#application-edit-sidepanel/sidepanel-close', (payload) => {
    if (hasChanges && !payload?.bypass) {
      openDialog({
        title: t('title'),
        content: t('message'),
        variant: 'warning',
        actions: {
          variant: 'YesNo',
          yes: () => sidepanelEmit('%%sidepanel/close', null),
        },
      });

      return;
    }

    sidepanelEmit('%%sidepanel/close', null);
  });
}

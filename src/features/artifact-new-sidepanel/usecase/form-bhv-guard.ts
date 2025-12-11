import { useEffect } from 'react';

import { useDialog } from '@/services/dialog';
import { useDevetekTranslations } from '@/services/i18n';
import { useSidepanelEmit } from '@/services/sidepanel/model/event';

import { useSubscribe } from '../model/events';
import { useArtifactNewGeneralModel } from '../model/general';

export default function useFormBhvGuardUsecase() {
  const { hasChanges } = useArtifactNewGeneralModel();

  const sidepanelEmit = useSidepanelEmit();

  const t = useDevetekTranslations('dialog.genericUnsavedChanges');

  const [openDialog] = useDialog();

  useEffect(() => {
    sidepanelEmit('%%sidepanel/allow-trivial-close', !hasChanges);
  }, [sidepanelEmit, hasChanges]);

  useSubscribe('#artifact-new-sidepanel/sidepanel-close', (payload) => {
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

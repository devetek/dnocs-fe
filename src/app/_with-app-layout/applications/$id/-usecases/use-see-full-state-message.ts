import { useDialog } from '@/services/dialog';
import { useDevetekTranslations } from '@/services/i18n';

import type { ResState } from '@/entities/res-state/rules/schema';
import { RES_STATE_METADATA } from '@/entities/res-state/ui/constants/config';

import { noop } from '@/shared/libs/browser/fn';
import useHandler from '@/shared/libs/react-hooks/useHandler';

export default function useSeeFullStateMessage() {
  const [openDialog] = useDialog();

  const t = useDevetekTranslations();

  const handleSeeFulLStateMessage = useHandler((state: ResState) => {
    const meta = RES_STATE_METADATA[state.status];

    openDialog({
      variant: state.status === 'failed' ? 'error' : 'info',
      title: t(meta.i18n.statusLabel),
      content: state.message,
      actions: {
        variant: 'Ok',
        ok: noop,
      },
    });
  });

  return { handleSeeFulLStateMessage };
}

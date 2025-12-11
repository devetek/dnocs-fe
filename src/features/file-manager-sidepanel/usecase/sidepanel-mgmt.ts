import { useEffect } from 'react';

import { useSidepanelEmit } from '@/services/sidepanel/model/event';

export default function useSidepanelMgmtUsecase() {
  const emit = useSidepanelEmit();

  useEffect(() => {
    emit('%%sidepanel/allow-trivial-close', false);

    return () => {
      emit('%%sidepanel/allow-trivial-close', true);
    };
  }, [emit]);
}

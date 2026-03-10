import { SettingsIcon } from 'lucide-react';

import { useDevetekTranslations } from '@/services/i18n';

import {
  couple,
  guardedSelects,
} from '@/shared/libs/react-factories/guardedSelect';
import CardSectionTitled from '@/shared/presentation/molecules/CardSectionTitled';

// import { useEmit } from '../../-model/events';
import { useServerDataModel } from '../../-model/server-data';

import { MainServicesStates as UIStates } from './_States';

const [guard, useServerPortInUseds] = guardedSelects({
  initialIsLoading: true,
  fallbackLoading: UIStates.Loading,
  fallbackError: UIStates.Failed,
})(couple(useServerDataModel, (s) => s.portInUseds));

const PortInUseds = guard(() => {
  const portInUseds = useServerPortInUseds((s) => s);
  // const emit = useEmit();

  // const handleRefreshPortInUsed = () => {
  //   emit('@servers::detail/server-port-in-used-refresh', null);
  // }

  if (portInUseds.length === 0) {
    return <UIStates.Empty />;
  }

  return <div style={{ maxWidth: '100px' }}>{JSON.stringify(portInUseds)}</div>;
});

export default function MainPortInUsed() {
  const t = useDevetekTranslations();

  return (
    <CardSectionTitled
      icon={SettingsIcon}
      placement="main"
      title={t('common.terms.portInUsed')}
    >
      <PortInUseds />
    </CardSectionTitled>
  );
}

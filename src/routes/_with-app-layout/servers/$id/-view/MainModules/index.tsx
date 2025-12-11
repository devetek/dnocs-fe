import { PuzzleIcon } from 'lucide-react';

import { useDevetekTranslations } from '@/services/i18n';

import { excludeNully } from '@/shared/libs/browser/typeguards';
import {
  couple,
  guardedSelects,
} from '@/shared/libs/react-factories/guardedSelect';
import CardSectionTitled from '@/shared/presentation/molecules/CardSectionTitled';

import { useEmit } from '../../-model/events';
import { useServerDataModel } from '../../-model/server-data';

import { MainModulesStates as UIStates } from './_States';
import ModulesList from './ModulesList';

const [guard, useServerModules] = guardedSelects({
  initialIsLoading: true,
  fallbackLoading: UIStates.Loading,
  fallbackError: UIStates.Failed,
})(couple(useServerDataModel, (s) => s.modules));

export default guard(function MainModules() {
  const emit = useEmit();
  const [modules] = useServerModules((s) => [s.modules]);

  const t = useDevetekTranslations();

  const mappedModuleIdentifiers = (modules ?? [])
    .map((service) => {
      if (!service.installer_name || !service.installer_type) return null;

      return [
        service.id ?? -1,
        service.installer_name,
        service.installer_type,
      ] as const;
    })
    .filter(excludeNully);

  if (mappedModuleIdentifiers.length < 1) {
    return <UIStates.Empty />;
  }

  const handleClickDiscover = () => {
    emit('@servers::detail/favorite-navigation', {
      to: 'modules-discover',
    });
  };

  return (
    <CardSectionTitled
      placement="main"
      title={t('common.terms.installedModules')}
      icon={PuzzleIcon}
      toolbarActions={{
        label: t('common.actions.discover'),
        onClick: handleClickDiscover,
      }}
    >
      <ModulesList modules={mappedModuleIdentifiers} />
    </CardSectionTitled>
  );
});

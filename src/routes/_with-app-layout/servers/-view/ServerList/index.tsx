import { useNavigate } from '@tanstack/react-router';

import { useDevetekTranslations } from '@/services/i18n';

import {
  couple,
  guardedSelects,
} from '@/shared/libs/react-factories/guardedSelect';
import { useBreakpoint } from '@/shared/libs/react-hooks/useBreakpoint';
import LayoutAutoGridList from '@/shared/presentation/atoms/LayoutAutoGridList';
import { EmptyState } from '@/shared/presentation/organisms/EmptyState';

import { useEmit } from '../../-model/events';
import { useFilterModel } from '../../-model/filters';
import { useServersModel } from '../../-model/servers';
import { ServerListState } from '../_presentation/ServerListState';

import ServerCard from './ServerCard';

const [guard, useServers] = guardedSelects({
  fallbackLoading: ServerListState.Loading,
  fallbackError: ServerListState.Error,
})(couple(useServersModel, (s) => s));

export default guard(function ServerList() {
  const navigate = useNavigate();
  const emit = useEmit();
  const t = useDevetekTranslations();

  const isDesktop = useBreakpoint('lg');

  const [servers] = useServers((s) => [s.servers]);
  const { viewMode } = useFilterModel();

  const derivedViewMode: 'grid' | 'list' =
    viewMode === 'auto' ? (isDesktop ? 'list' : 'grid') : viewMode;

  if (servers.length < 1) {
    return (
      <EmptyState
        title={t('page.servers.emptyState.title')}
        message={t('page.servers.emptyState.message')}
        ctaText={t('page.servers.emptyState.cta')}
        ctaOnClick={() =>
          navigate({
            to: '/servers/create',
          })
        }
      />
    );
  }

  return (
    <LayoutAutoGridList viewMode={viewMode}>
      {servers.map((server: any) => {
        const handleClickEdit = () => {
          emit('@resources::servers/server-edit-sidepanel', server);
        };

        const handleClickReinstall = () => {
          emit('@resources::servers/machine-reinstall', {
            serverId: server.id,
          });
        };

        const handleClickMigrateOwnership = () => {
          return () => {
            if (!server.host.name) return undefined;

            emit('@resources::servers/server-migrate-ownership', {
              serverId: server.id,
              serverName: server.host.name,
              serverTeam: server.ownership?.team,
            });
          };
        };

        const handleClickDelete = () => {
          emit('@resources::servers/machine-delete', {
            serverId: server.id,
            serverName: server.host.name,
          });
        };

        const handleClickStatus = () => {
          emit('@resources::servers/server-status-info-dialog', server);
        };

        return (
          <ServerCard
            key={server.id}
            variant={derivedViewMode === 'list' ? 'full' : 'compact'}
            data={server}
            onClickEdit={handleClickEdit}
            onClickReinstall={handleClickReinstall}
            onClickMigrateOwnership={handleClickMigrateOwnership()}
            onClickDelete={handleClickDelete}
            onClickStatus={handleClickStatus}
          />
        );
      })}
    </LayoutAutoGridList>
  );
});

import { useNavigate } from '@tanstack/react-router';

import { useDevetekTranslations } from '@/services/i18n';

import {
  couple,
  guardedSelects,
} from '@/shared/libs/react-factories/guardedSelect';
import { useBreakpoint } from '@/shared/libs/react-hooks/useBreakpoint';
import { Pagination } from '@/shared/presentation/atoms/Pagination';
import SpinnerOverlay from '@/shared/presentation/atoms/SpinnerOverlay';
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

  const [refetching, servers, pagination] = useServers((s, isRefetching) => [
    isRefetching,
    s.servers,
    s.pagination,
  ]);
  const { pagination: currentPage, setPagination } = useFilterModel();

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
    <SpinnerOverlay
      classNameWrapper="flex flex-col overflow-hidden"
      loading={refetching}
    >
      <div className="pb-2 grid grid-cols-2 sm:grid-cols-3 lg:flex lg:flex-col gap-1 sm:gap-2 overflow-x-auto">
        {servers.map((server: any) => {
          const handleClickDetails = () => {
            if (!server.host.name) return undefined;

            return () => window.open(`/servers/${server.id}`, '_blank');
          };

          const handleClickEdit = () => {
            emit('@resources::servers/server-edit-sidepanel', server);
          };

          const handleClickReinstall = () => {
            emit('@resources::servers/machine-reinstall', {
              serverId: server.id,
            });
          };

          const handleClickClaim = () => {
            return () => {
              if (!server.host.name) return undefined;

              emit('@resources::servers/server-claim-to-org', {
                serverId: server.id,
                serverName: server.host.name,
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
              variant={isDesktop ? 'full' : 'compact'}
              data={server}
              onClickEdit={handleClickEdit}
              onClickDetails={handleClickDetails()}
              onClickReinstall={handleClickReinstall}
              onClickClaimToOrganization={handleClickClaim()}
              onClickDelete={handleClickDelete}
              onClickStatus={handleClickStatus}
            />
          );
        })}
      </div>

      <div className="pt-2 flex items-center justify-end">
        <Pagination
          maxPage={pagination.total_page}
          currentPage={currentPage}
          onPageChange={setPagination}
        />
      </div>
    </SpinnerOverlay>
  );
});

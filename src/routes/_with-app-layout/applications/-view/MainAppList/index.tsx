import { useNavigate } from '@tanstack/react-router';


import { useDevetekTranslations } from '@/services/i18n';

import type { ApplicationCard } from '@/entities/application/rules/schema';

import {
  couple,
  guardedSelects,
} from '@/shared/libs/react-factories/guardedSelect';
import { useBreakpoint } from '@/shared/libs/react-hooks/useBreakpoint';
import { Pagination } from '@/shared/presentation/atoms/Pagination';
import SpinnerOverlay from '@/shared/presentation/atoms/SpinnerOverlay';
import { EmptyState } from '@/shared/presentation/organisms/EmptyState';


import { useAppsDataModel } from '../../-model/apps-data';
import { useEmit } from '../../-model/events';
import { useFilterModel } from '../../-model/filters';
import { AppListState } from '../_presentation/AppListState';

import AppCard from './AppCard';

const [guard, useApplications] = guardedSelects({
  fallbackError: AppListState.Error,
  fallbackLoading: AppListState.Loading,
})(couple(useAppsDataModel, (s: any) => s.applications));

export default guard(function MainAppList() {
  const navigate = useNavigate();

  const t = useDevetekTranslations();

  const isDesktop = useBreakpoint('lg');

  const { pagination, setPagination } = useFilterModel();

  const emit = useEmit();

  const [refetching, applications, paginationData] = useApplications(
    (s, isRefetching) => [isRefetching, s.list, s.pagination],
  );

  if (applications.length < 1) {
    return (
      <SpinnerOverlay loading={refetching}>
        <EmptyState
          title={t('page.applications.emptyState.title')}
          message={t('page.applications.emptyState.message')}
          ctaText={t('page.applications.emptyState.cta')}
          ctaOnClick={() =>
            navigate({
              to: '/applications/create',
            })
          }
        />
      </SpinnerOverlay>
    );
  }

  return (
    <SpinnerOverlay classNameWrapper="flex flex-col gap-4" loading={refetching}>
      <div className="pb-2 grid grid-cols-2 sm:grid-cols-3 lg:flex lg:flex-col gap-1 sm:gap-2 overflow-x-auto">
        {applications.map((application: ApplicationCard) => {
          const handleClickDetails = () => {
            const { id } = application;

            window.open(`${import.meta.env.VITE_FRONTEND}${`/applications/${id}`}`, '_blank');
          };

          const handleClickEdit = () => {
            emit('@applications/application-edit', application);
          };

          const handleClickClaim = () => {
            emit('@applications/application-claim', {
              appName: application.identity.name,
              id: application.id,
            });
          };

          const handleClickDelete = () => {
            emit('@applications/application-delete', {
              appName: application.identity.name,
              id: application.id,
            });
          };

          return (
            <AppCard
              key={application.id}
              variant={isDesktop ? 'full' : 'compact'}
              data={application}
              onClickEdit={handleClickEdit}
              onClickDetails={handleClickDetails}
              onClickClaimToOrganization={handleClickClaim}
              onClickDelete={handleClickDelete}
            />
          );
        })}
      </div>

      <div className="flex flex-row-reverse">
        <Pagination
          maxPage={paginationData.total_page}
          currentPage={pagination}
          onPageChange={setPagination}
        />
      </div>
    </SpinnerOverlay>
  );
});

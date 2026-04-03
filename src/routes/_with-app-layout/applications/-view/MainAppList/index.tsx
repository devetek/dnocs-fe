import { useNavigate } from '@tanstack/react-router';

import { useDevetekTranslations } from '@/services/i18n';

import type { ApplicationCard } from '@/entities/application/rules/schema';

import { useBreakpoint } from '@/shared/libs/react-hooks/useBreakpoint';
import LayoutAutoGridList from '@/shared/presentation/atoms/LayoutAutoGridList';
import { EmptyState } from '@/shared/presentation/organisms/EmptyState';
import { buildResponseView } from '@/widgets/response-view-builder';

import { useAppsDataModel } from '../../-model/apps-data';
import { useEmit } from '../../-model/events';
import { useFilterModel } from '../../-model/filters';
import { AppListState } from '../-presentation/AppListState';

import AppCard from './AppCard';

export default buildResponseView({
  useResponse: () => useAppsDataModel((s) => s.applications),
  fallbackError: AppListState.Error,
  fallbackLoading: AppListState.Loading,
  render: function Render(props) {
    const { list } = props;

    const navigate = useNavigate();
    const t = useDevetekTranslations();
    const emit = useEmit();

    const isDesktop = useBreakpoint('lg');
    const { viewMode } = useFilterModel();

    const derivedViewMode = viewMode !== 'auto' ? viewMode : isDesktop ? 'list' : 'grid';

    if (list.length < 1) {
      return (
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
      );
    }

    return (
      <LayoutAutoGridList viewMode={viewMode}>
        {list.map((application: ApplicationCard) => {
          const handleClickDetails = () => {
            const { id } = application;
            window.open(
              `${import.meta.env.VITE_FRONTEND}${`/applications/${id}`}`,
              '_blank',
            );
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
              variant={derivedViewMode === 'grid' ? 'compact' : 'full'}
              data={application}
              onClickEdit={handleClickEdit}
              onClickDetails={handleClickDetails}
              onClickClaimToOrganization={handleClickClaim}
              onClickDelete={handleClickDelete}
            />
          );
        })}
      </LayoutAutoGridList>
    );
  },
});


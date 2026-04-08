import { useDevetekTranslations } from '@/services/i18n';

import LayoutAutoGridList from '@/shared/presentation/atoms/LayoutAutoGridList';
import { EmptyState } from '@/shared/presentation/organisms/EmptyState';
import { buildResponseView } from '@/widgets/response-view-builder';

import { LbListState } from '../-presentation/LbListState';
import { useEmit } from '../../-models/events';
import { useFilterModel } from '../../-models/filters';
import { useLbDataModel } from '../../-models/lb-data';

import LbCard from './LbCard';

export default buildResponseView({
  useResponse: () => useLbDataModel((s) => s.loadBalancers),
  fallbackError: LbListState.Error,
  fallbackLoading: LbListState.Loading,
  render: function Render(props) {
    const { list } = props;

    const t = useDevetekTranslations();

    const emit = useEmit();

    const [viewMode, derivedViewMode] = useFilterModel((s) => [
      s.viewMode,
      s.derivedViewMode,
    ]);

    if (list.length < 1) {
      return (
        <EmptyState
          title={t('page.loadBalancers.emptyState.title')}
          message={t('page.loadBalancers.emptyState.message')}
          ctaText={t('page.loadBalancers.emptyState.cta')}
          ctaOnClick={() => emit('@load-balancers/open--create', null)}
        />
      );
    }

    return (
      <LayoutAutoGridList viewMode={viewMode}>
        {list.map((loadBalancer) => (
          <LbCard
            data={loadBalancer}
            variant={derivedViewMode === 'grid' ? 'compact' : 'full'}
            onClickDetails={() =>
              emit('@load-balancers/open--details', loadBalancer)
            }
            onClickMigrateOwnership={() =>
              emit('@load-balancers/open--migrate-ownership', loadBalancer)
            }
            onClickDelete={() => {
              emit('@load-balancers/lb--delete', loadBalancer);
            }}
          />
        ))}
      </LayoutAutoGridList>
    );
  },
});

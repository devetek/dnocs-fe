import { useDevetekTranslations } from '@/services/i18n';

import { EmptyState } from '@/shared/presentation/organisms/EmptyState';
import { buildResponseView } from '@/widgets/response-view-builder';

import { DomainListState } from '../-presentation/DdnsListState';
import { useDomainDataModel } from '../../-models/domain-data';
import { useFilterModel } from '../../-models/filters';

import DomainCompactCards from './DomainCompactCards';
import DomainTable from './DomainTable';

export default buildResponseView({
  useResponse: () => useDomainDataModel((s) => s.domains),
  fallbackError: DomainListState.Error,
  fallbackLoading: DomainListState.Loading,
  render: function Render(props) {
    const { list } = props;

    const t = useDevetekTranslations();

    const [derivedViewMode] = useFilterModel((s) => [s.derivedViewMode]);

    if (list.length < 1) {
      return (
        <EmptyState
          title={t('page.domain.emptyState.title')}
          message={t('page.domain.emptyState.message')}
          ctaText={t('page.domain.emptyState.cta')}
        />
      );
    }

    if (derivedViewMode === 'table') {
      return <DomainTable data={list} />;
    }

    return <DomainCompactCards list={list} />;
  },
});

import LayoutAutoGridList from '@/shared/presentation/atoms/LayoutAutoGridList';
import { EmptyState } from '@/shared/presentation/organisms/EmptyState';
import { buildResponseView } from '@/widgets/response-view-builder';

import { useOrgDataModel } from '../../-model/org-data';
import { useFilterModel } from '../../-model/filters';
import { OrgListState } from '../-presentation/OrgListState';

import OrgCard from './OrgCard';
import OrgTable from './OrgTable';
import type { OrgTableData } from './OrgTable';

export default buildResponseView({
  useResponse: () => useOrgDataModel((s) => s.organizations),
  fallbackError: OrgListState.Error,
  fallbackLoading: OrgListState.Loading,
  render: function Render(props) {
    const { list } = props;

    const [derivedViewMode] = useFilterModel((s) => [s.derivedViewMode]);

    if (list.length < 1) {
      return (
        <EmptyState
          title="No teams found"
          message="Create a team to organize resources and applications."
          ctaText="Add Team"
        />
      );
    }

    const tableData: OrgTableData[] = list.flatMap((org) => {
      const { id, name, description, status, created_at, updated_at } = org;
      if (!id) return [];

      return [
        {
          id,
          name: name ?? null,
          description: description ?? null,
          status: status ?? null,
          createdAt: created_at ?? null,
          updatedAt: updated_at ?? null,
        },
      ];
    });

    if (derivedViewMode === 'table') {
      return <OrgTable data={tableData} />;
    }

    return (
      <LayoutAutoGridList viewMode={derivedViewMode as 'grid' | 'list'}>
        {tableData.map((org) => (
          <OrgCard key={org.id} data={org} />
        ))}
      </LayoutAutoGridList>
    );
  },
});

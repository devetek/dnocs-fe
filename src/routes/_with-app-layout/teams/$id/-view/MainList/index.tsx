import LayoutAutoGridList from '@/shared/presentation/atoms/LayoutAutoGridList';
import { EmptyState } from '@/shared/presentation/organisms/EmptyState';
import { buildResponseView } from '@/widgets/response-view-builder';

import { useMembersDataModel } from '../../-model/members-data';
import { useFilterModel } from '../../-model/filters';
import { MemberListState } from '../-presentation/MemberListState';

import MemberCard from './MemberCard';
import MemberTable from './MemberTable';
import type { MemberTableData } from './MemberTable';

export default buildResponseView({
  useResponse: () => useMembersDataModel((s) => s.members),
  fallbackError: MemberListState.Error,
  fallbackLoading: MemberListState.Loading,
  render: function Render(props) {
    const { list } = props;

    const [derivedViewMode] = useFilterModel((s) => [s.derivedViewMode]);

    if (list.length < 1) {
      return (
        <EmptyState
          title="No members yet"
          message="Add members to this team to get started."
          ctaText="Add Member"
        />
      );
    }

    const tableData: MemberTableData[] = list.flatMap((member) => {
      const { id, user, created_at } = member;
      if (!id) return [];

      return [
        {
          id,
          userId: user?.id ?? null,
          fullname: user?.fullname ?? null,
          username: user?.username ?? null,
          email: user?.email ?? null,
          avatarUrl: user?.avatar_url ?? null,
          joinedAt: created_at ?? null,
        },
      ];
    });

    if (derivedViewMode === 'table') {
      return <MemberTable data={tableData} />;
    }

    return (
      <LayoutAutoGridList viewMode={derivedViewMode as 'grid' | 'list'}>
        {tableData.map((member) => (
          <MemberCard key={member.id} data={member} />
        ))}
      </LayoutAutoGridList>
    );
  },
});

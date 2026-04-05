import { PencilIcon, PlusCircleIcon, UsersIcon } from 'lucide-react';

import { Button } from '@/shared/presentation/atoms/ButtonV2';
import { Breadcrumb } from '@/shared/presentation/molecules/Breadcrumb';
import { PageHeader } from '@/shared/presentation/organisms/PageHeader';

import { useEmit } from '../../-model/events';
import { useMembersDataModel } from '../../-model/members-data';

const Headnote = () => {
  return (
    <span className="flex items-center justify-between">
      <Breadcrumb
        items={[
          { text: 'Dashboard', url: '/dashboard' },
          { text: 'Teams', url: '/teams' },
        ]}
      />
    </span>
  );
};

export default function Header() {
  const emit = useEmit();
  const { members, orgId } = useMembersDataModel();

  const orgName =
    members.$status === 'success' ? (members.orgName ?? orgId) : orgId;

  const orgDescription =
    members.$status === 'success' ? (members.orgDescription ?? null) : null;

  const memberCount =
    members.$status === 'success'
      ? `${members.list.length} member${members.list.length !== 1 ? 's' : ''} in this team`
      : 'Loading team data…';

  const description = orgDescription
    ? `${orgDescription} · ${memberCount}`
    : memberCount;

  return (
    <PageHeader
      heroIcon={UsersIcon}
      headnote={<Headnote />}
      title={orgName}
      description={description}
      rightAppend={
        <div className="flex items-center gap-2">
          <Button
            buttonStyle="ghost"
            buttonColor="secondary"
            onClick={() => emit('@team-members/edit-team', undefined)}
          >
            <PencilIcon /> Edit
          </Button>
          <Button
            buttonStyle="outline"
            buttonColor="secondary"
            onClick={() => emit('@team-members/add-member', undefined)}
          >
            <PlusCircleIcon /> Add Member
          </Button>
        </div>
      }
    />
  );
}

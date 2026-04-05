import { PencilIcon, PlusCircleIcon, UsersIcon } from 'lucide-react';

import { useDevetekTranslations } from '@/services/i18n';
import { Button } from '@/shared/presentation/atoms/ButtonV2';
import { Breadcrumb } from '@/shared/presentation/molecules/Breadcrumb';
import { PageHeader } from '@/shared/presentation/organisms/PageHeader';

import { useEmit } from '../../-model/events';
import { useMembersDataModel } from '../../-model/members-data';

const Headnote = () => {
  const t = useDevetekTranslations();

  return (
    <span className="flex items-center justify-between">
      <Breadcrumb
        items={[
          { text: t('sidebar.dashboard'), url: '/dashboard' },
          { text: t('common.terms.teams'), url: '/teams' },
        ]}
      />
    </span>
  );
};

export default function Header() {
  const emit = useEmit();
  const t = useDevetekTranslations();
  const { members, orgId } = useMembersDataModel();

  const orgName =
    members.$status === 'success' ? (members.orgName ?? orgId) : orgId;

  const orgDescription =
    members.$status === 'success' ? (members.orgDescription ?? null) : null;

  const memberCount =
    members.$status === 'success'
      ? t('page.teamDetail.memberCount', { count: members.list.length })
      : t('page.teamDetail.loadingData');

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
            <PencilIcon /> {t('common.actions.edit')}
          </Button>
          <Button
            buttonStyle="outline"
            buttonColor="secondary"
            onClick={() => emit('@team-members/add-member', undefined)}
          >
            <PlusCircleIcon /> {t('page.teamDetail.addMember')}
          </Button>
        </div>
      }
    />
  );
}

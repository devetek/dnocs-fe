import { useNavigate } from '@tanstack/react-router';

import { useAuthLoggedIn } from '@/services/auth/usecase';

import type { TeamPopupItem } from '@/features/app-shell/rules/types';

import { ApiOrganizationPeople } from '@/shared/api';
import { iife } from '@/shared/libs/browser/iife';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/shared/presentation/atoms/Popover';

import TeamsDropdown from '../../presentation/TeamsDropdown';
import TeamsPopup from '../../presentation/TeamsPopup';

interface TeamsProps {
  collapsed?: boolean;
}

export default function Teams(props: TeamsProps) {
  const { collapsed } = props;

  const navigate = useNavigate();

  const { userProfile } = useAuthLoggedIn();
  const [resOrganizationPeople] = ApiOrganizationPeople.Find.useGet({
    page: 1,
    pageSize: 100,
    userId: userProfile.id,
  });

  const selectedTeamId = localStorage.getItem('organization_id') || null;

  const handleClickSelectTeam = (teamId: string) => {
    if (selectedTeamId === teamId) {
      localStorage.removeItem('organization_id');
    } else {
      localStorage.setItem('organization_id', teamId);
    }

    window.location.reload();
  };

  const handleClickPersonal = () => {
    localStorage.removeItem('organization_id');
    window.location.reload();
  };

  const handleClickAddNewTeams = () => {
    navigate({ to: '/teams' });
    return;
  };

  const teams: TeamPopupItem[] = iife(() => {
    if (resOrganizationPeople.$status !== 'success') return [];

    return (resOrganizationPeople.org_peoples ?? []).map((org) => {
      const { organization, organization_id } = org;

      return {
        name: organization!.name!,
        id: organization_id!,
      };
    });
  });

  const teamName = iife(() => {
    if (resOrganizationPeople.$status !== 'success') return undefined;

    const { organization } =
      resOrganizationPeople.org_peoples?.find(
        (org) => org.organization_id === selectedTeamId,
      ) ?? {};
    if (!organization) return undefined;

    return organization.name!;
  });

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div>
          <TeamsDropdown collapsed={collapsed} teamName={teamName} />
        </div>
      </PopoverTrigger>
      <PopoverContent
        className="ml-2 data-[collapsed=true]:ml-5 p-0 overflow-hidden"
        data-collapsed={collapsed}
      >
        <TeamsPopup
          teams={teams}
          onClickAddNewTeams={handleClickAddNewTeams}
          selectedTeamId={selectedTeamId}
          onClickTeam={handleClickSelectTeam}
          onClickPersonal={handleClickPersonal}
        />
      </PopoverContent>
    </Popover>
  );
}

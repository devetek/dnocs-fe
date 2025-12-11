import { useNavigate } from '@tanstack/react-router';
import { CheckIcon, PlusIcon } from 'lucide-react';

import { useAuthLoggedIn } from '@/services/auth/usecase';

import { ApiOrganizationPeople } from '@/shared/api';
import { iife } from '@/shared/libs/browser/iife';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/shared/presentation/atoms/Popover';
import { SearchInput } from '@/shared/presentation/atoms/SearchInput';

import TeamsDropdown from '../../presentation/TeamsDropdown';

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

  const selectedTeam = localStorage.getItem('organization_id') || '';

  const handleClickSelectTeam = (teamID: string) => {
    return () => {
      if (selectedTeam === teamID) {
        localStorage.removeItem('organization_id');
      } else {
        localStorage.setItem('organization_id', teamID);
      }

      navigate({
        to: '/dashboard',
        reloadDocument: true,
      });
    };
  };

  const handleClickAddNewTeams = () => {
    navigate({
      to: '/teams',
    });
    return;
  };

  const teams: Array<{ name: string; id: string }> = iife(() => {
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
        (org) => org.organization_id === selectedTeam,
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
        <div className="p-2">
          <SearchInput />
        </div>

        <div className="flex flex-col">
          {teams.map((team) => {
            return (
              <button
                key={team.id}
                className="p-3 cursor-pointer hover:bg-primary/10 transition-all flex items-center justify-between w-full text-left"
                onClick={handleClickSelectTeam(team.id)}
              >
                <div className="flex flex-col">
                  <p className="text-sm text-primary font-semibold">
                    {team.name}
                  </p>
                  <p className="text-xs italic text-primary/70">
                    Team ID: {team.id}
                  </p>
                </div>

                {team.id === selectedTeam && <CheckIcon className="size-4" />}
              </button>
            );
          })}
        </div>

        <div className="border-t">
          <button
            className="cursor-pointer p-3 w-full flex items-center gap-1 hover:bg-primary/10 transition-all"
            onClick={handleClickAddNewTeams}
          >
            <PlusIcon className="size-4" />
            <p className="text-sm text-primary">Add new teams...</p>
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
}

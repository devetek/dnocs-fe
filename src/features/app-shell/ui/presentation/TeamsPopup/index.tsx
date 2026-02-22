import { useMemo, useState } from 'react';

import { CheckIcon, CircleUserRoundIcon, PlusIcon } from 'lucide-react';

import { useDevetekTranslations } from '@/services/i18n';

import { matchWithFuzzyBitap } from '@/shared/libs/browser/algorithms';
import { cn } from '@/shared/libs/tailwind/cn';
import { SearchInput } from '@/shared/presentation/atoms/SearchInput';

import type {
  RegisteredAction,
  TeamAction,
  TeamActionsOptionsProps,
  TeamsListProps,
  TeamsPopupProps,
} from './types';

const TeamsList = (props: TeamsListProps) => {
  const { teams, selectedTeamId, onClickTeam } = props;

  return (
    <div className="flex flex-col max-h-[40svh] overflow-hidden overflow-y-auto pb-2">
      {teams.map((team) => {
        const { id, name } = team;

        const handleClick = () => {
          onClickTeam(team.id);
        };

        return (
          <button
            key={id}
            className="p-3 cursor-pointer hover:bg-primary/10 transition-all flex items-center justify-between w-full text-left"
            onClick={handleClick}
          >
            <div className="flex flex-col">
              <p className="text-sm text-primary font-semibold">{name}</p>
              <p className="text-xs italic text-primary/70">Team ID: {id}</p>
            </div>

            {id === selectedTeamId && <CheckIcon className="size-4" />}
          </button>
        );
      })}
    </div>
  );
};

const TeamActionsOptions = (props: TeamActionsOptionsProps) => {
  const { actions, onClickAction } = props;

  const t = useDevetekTranslations();

  return (
    <div className="border-t p-1.5 flex flex-col gap-y-0.5">
      {actions.map((action) => {
        const { id, icon: Icon, i18nKey, isDisabled } = action;

        const cnButtonRoot = cn(
          'rounded p-2 w-full transition-all',
          !isDisabled && 'cursor-pointer hover:bg-primary/10',
          isDisabled && 'cursor-no-drop',
        );

        const handleClick = () => {
          onClickAction?.(id);
        };

        return (
          <button
            key={id}
            className={cnButtonRoot}
            disabled={isDisabled}
            onClick={handleClick}
          >
            <div
              className="flex items-center gap-1.5 data-[disabled=true]:opacity-50"
              data-disabled={isDisabled}
            >
              <Icon className="size-4" />
              <p
                className="text-sm text-primary data-[disabled=true]:italic"
                data-disabled={isDisabled}
              >
                {t(i18nKey)}
              </p>
            </div>
          </button>
        );
      })}
    </div>
  );
};

export default function TeamsPopup(props: TeamsPopupProps) {
  const {
    teams,
    selectedTeamId,
    onClickAddNewTeams,
    onClickPersonal,
    onClickTeam,
  } = props;

  const [searchQuery, setSearchQuery] = useState('');

  const filteredTeams = useMemo(
    () =>
      teams.filter((team) =>
        matchWithFuzzyBitap({
          query: searchQuery,
          sourceText: team.name,
        }).unwrap(),
      ),
    [searchQuery, teams],
  );

  const actions: TeamAction[] = [
    {
      id: 'use-personal-mode',
      i18nKey: selectedTeamId
        ? 'sidebar.teamsWidget.usePersonalMode'
        : 'sidebar.teamsWidget.usingPersonalMode',
      icon: CircleUserRoundIcon,
      isDisabled: !selectedTeamId,
    },
    {
      id: 'add-new-teams',
      i18nKey: 'sidebar.teamsWidget.addNewTeams',
      icon: PlusIcon,
    },
  ];

  const handleClickAction = (id: RegisteredAction) => {
    switch (id) {
      case 'add-new-teams':
        onClickAddNewTeams();
        break;

      case 'use-personal-mode':
        onClickPersonal();
        break;
    }
  };

  return (
    <>
      <div className="p-2">
        <SearchInput
          onChange={setSearchQuery}
          value={searchQuery}
          maxLength={15}
        />
      </div>

      <TeamsList
        teams={filteredTeams}
        selectedTeamId={selectedTeamId}
        onClickTeam={onClickTeam}
      />

      <TeamActionsOptions actions={actions} onClickAction={handleClickAction} />
    </>
  );
}

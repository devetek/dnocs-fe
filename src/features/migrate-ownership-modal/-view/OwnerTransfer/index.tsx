import { useMemo } from 'react';

import { ArrowRightIcon, BuildingIcon, UserIcon } from 'lucide-react';
import { useController } from 'react-hook-form';

import { excludeFalsy } from '@/shared/libs/browser/typeguards';
import useHandler from '@/shared/libs/react-hooks/useHandler';
import { Spinner } from '@/shared/presentation/atoms/Spinner';
import { Tooltip } from '@/shared/presentation/atoms/Tooltip';
import { Combobox } from '@/shared/presentation/molecules/Combobox';

import { usePropsModel } from '../../-models';
import { useEmit } from '../../-models/events';
import { useMigrateOwnershipForm } from '../../-models/form';
import { useResourcesModel } from '../../-models/resources';

export default function OwnerTransfer() {
  const { mod } = usePropsModel();

  const emit = useEmit();

  const form = useMigrateOwnershipForm();
  const newTeamId = useController({
    control: form.control,
    name: 'newTeamId',
  });

  const [teams] = useResourcesModel((s) => [s.teams]);

  const handleClickTryAgain = useHandler(() => {
    emit('#migrate-ownership-modal/resources/teams-refresh');
  });

  const currentOwner = mod.moduleTeam?.name || 'Personal';

  const renderedTeamsPicker = useMemo(() => {
    if (teams.$status === 'failed') {
      return (
        <div className="w-full h-8 border rounded flex items-center px-2">
          <p className="text-xs">
            <em className="text-red-500/70">Failed to load teams.&nbsp;</em>
            <a
              className="text-primary/70 underline font-medium cursor-pointer"
              onClick={handleClickTryAgain}
            >
              Try Again?
            </a>
          </p>
        </div>
      );
    }

    if (teams.$status !== 'success') {
      return (
        <div className="w-full h-8 border rounded flex items-center px-2">
          <Spinner className="size-4" />
        </div>
      );
    }

    const currentTeam = mod.moduleTeam?.name;

    const selections = [
      ...teams
        .filter((team) => team.name !== currentTeam)
        .map((team) => {
          return {
            label: (
              <span className="flex items-center gap-x-1">
                <BuildingIcon className="size-4" /> {team.name}
              </span>
            ),
            value: team.id,
          };
        }),
      Boolean(currentTeam) && {
        label: (
          <span className="flex items-center gap-x-1">
            <UserIcon className="size-4" />
            <em>Me</em>
          </span>
        ),
        value: '0',
      },
    ].filter(excludeFalsy);

    return (
      <Combobox
        classNameButton="w-full"
        size="sm"
        placeholder="Select a new owner"
        items={selections}
        onChange={newTeamId.field.onChange}
        value={newTeamId.field.value}
      />
    );
  }, [teams, newTeamId, mod.moduleTeam?.name, handleClickTryAgain]);

  const CurrentOwnerIcon = mod.moduleTeam ? BuildingIcon : UserIcon;

  return (
    <div className="flex flex-col">
      <div className="mt-4 grid grid-cols-[1fr_32px_1.5fr]">
        <p className="font-bold text-xs text-primary/70">Current Owner</p>

        <div />

        <p className="font-bold text-xs text-primary/70">New Owner</p>
      </div>

      <div className="mt-1 grid grid-cols-[1fr_32px_1.5fr]">
        <div className="flex items-center gap-x-1 px-2 border rounded bg-background">
          <CurrentOwnerIcon className="size-4 text-primary" />

          <Tooltip
            as="p"
            message={currentOwner}
            className="text-primary text-xs font-medium line-clamp-1"
            classNameTooltip="z-50"
          >
            {currentOwner}
          </Tooltip>
        </div>

        <div className="flex items-center justify-center">
          <ArrowRightIcon className="size-5 text-primary/70" />
        </div>

        <div className="flex flex-col gap-y-1">{renderedTeamsPicker}</div>
      </div>
    </div>
  );
}

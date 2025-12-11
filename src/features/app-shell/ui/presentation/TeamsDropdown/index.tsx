import { Building2Icon, ChevronDownIcon } from 'lucide-react';

import { Card } from '@/shared/presentation/atoms/Card';
import { Tooltip } from '@/shared/presentation/atoms/Tooltip';

interface TeamsDropdownProps {
  teamName?: string;
  collapsed?: boolean;
  onClick?: () => void;
}

export default function TeamsDropdown(props: TeamsDropdownProps) {
  const { collapsed, teamName, onClick } = props;

  const teamSelected = !!teamName;

  if (collapsed) {
    return (
      <Tooltip
        message={`Team: ${teamName}`}
        position="right"
        delayMs={0}
        gap={4}
      >
        <Card
          className="p-1 cursor-pointer shadow-none overflow-hidden transition-all group hover:bg-accent"
          onClick={onClick}
        >
          <div className="p-1.5 rounded bg-background group-hover:bg-accent transition-all h-max flex justify-center">
            <Building2Icon
              className="size-4 data-[collapsed=true]:size-4 text-primary data-[active=true]:text-accent group-hover:text-white! transition-all"
              data-active={teamSelected}
            />
          </div>
        </Card>
      </Tooltip>
    );
  }

  return (
    <Card
      className="p-1 pr-0 cursor-pointer shadow-none overflow-hidden grid grid-cols-[auto_1fr_auto] gap-2 transition-all group hover:bg-accent"
      onClick={onClick}
    >
      <div className="p-2.5 rounded-l bg-background group-hover:bg-accent transition-all w-max h-max">
        <Building2Icon className="size-6 text-primary group-hover:text-white transition-all" />
      </div>

      <div className="group-hover:text-white flex flex-col justify-center">
        {teamName ? (
          <>
            <Tooltip message={teamName}>
              <p className="text-sm text-primary group-hover:text-white font-semibold line-clamp-1">
                {teamName}
              </p>
            </Tooltip>
            <p className="text-xs opacity-70">Teams</p>
          </>
        ) : (
          <p className="text-sm opacity-70 text-primary group-hover:text-white">
            Select a team
          </p>
        )}
      </div>

      <div className="px-3 flex items-center justify-center">
        <ChevronDownIcon className="size-4 group-hover:text-white" />
      </div>
    </Card>
  );
}

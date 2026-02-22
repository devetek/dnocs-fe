import {
  Building2Icon,
  ChevronDownIcon,
  CircleUserRoundIcon,
} from 'lucide-react';

import { useDevetekTranslations } from '@/services/i18n';

import { Card } from '@/shared/presentation/atoms/Card';
import { Tooltip } from '@/shared/presentation/atoms/Tooltip';

interface TeamsDropdownProps {
  teamName?: string;
  collapsed?: boolean;
  onClick?: () => void;
}

export default function TeamsDropdown(props: TeamsDropdownProps) {
  const { collapsed, teamName, onClick } = props;

  const t = useDevetekTranslations();

  const teamSelected = !!teamName;

  const Icon = teamSelected ? Building2Icon : CircleUserRoundIcon;

  if (collapsed) {
    const tooltipMessage = teamSelected
      ? t('sidebar.teamsWidget.tooltipTeamX', { teamName })
      : t('sidebar.teamsWidget.selectATeamHere');

    return (
      <Tooltip message={tooltipMessage} position="right" delayMs={0} gap={4}>
        <Card
          className="p-1 cursor-default shadow-none overflow-hidden transition-all group hover:bg-accent"
          onClick={onClick}
        >
          <div className="p-1.5 rounded bg-background group-hover:bg-accent transition-all h-max flex justify-center">
            <Icon
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
      className="p-1 pr-0 cursor-default shadow-none overflow-hidden grid grid-cols-[auto_1fr_auto] gap-2 transition-all group hover:bg-accent"
      onClick={onClick}
    >
      <div className="p-2.5 rounded-l bg-background group-hover:bg-accent transition-all w-max h-max">
        <Icon className="size-6 text-primary group-hover:text-white transition-all" />
      </div>

      <div className="group-hover:text-white flex flex-col justify-center">
        {teamName ? (
          <>
            <Tooltip message={teamName}>
              <p className="text-sm text-primary group-hover:text-white font-semibold line-clamp-1">
                {teamName}
              </p>
            </Tooltip>
            <p className="text-xs opacity-70">{t('common.terms.teams')}</p>
          </>
        ) : (
          <>
            <p className="text-sm text-primary group-hover:text-white font-semibold line-clamp-1">
              {t('sidebar.teamsWidget.personalMode')}
            </p>
            <p className="text-xs opacity-50 italic">
              {t('sidebar.teamsWidget.selectATeamHere')}
            </p>
          </>
        )}
      </div>

      <div className="px-3 flex items-center justify-center">
        <ChevronDownIcon className="size-4 group-hover:text-white" />
      </div>
    </Card>
  );
}

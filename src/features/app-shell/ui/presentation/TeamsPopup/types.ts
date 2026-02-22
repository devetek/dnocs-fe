import type { LucideIcon } from 'lucide-react';

import type { TeamPopupItem } from '@/features/app-shell/rules/types';

export interface TeamsPopupProps {
  selectedTeamId?: string | null;
  teams: TeamPopupItem[];

  onClickAddNewTeams: () => void;
  onClickTeam: (teamId: string) => void;
  onClickPersonal: () => void;
}

export interface TeamsListProps {
  teams: TeamPopupItem[];
  selectedTeamId?: string | null;
  onClickTeam: (teamId: string) => void;
}

export interface TeamActionsOptionsProps {
  actions: TeamAction[];
  onClickAction?: (id: RegisteredAction) => void;
}

export interface TeamAction {
  id: RegisteredAction;
  i18nKey: string;
  icon: LucideIcon;
  isDisabled?: boolean;
}

export type RegisteredAction =
  | 'use-personal-mode' //
  | 'add-new-teams';

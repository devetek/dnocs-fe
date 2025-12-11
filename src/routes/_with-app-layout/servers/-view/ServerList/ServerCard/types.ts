import type { ServerCard } from '@/entities/server/rules/schema';

export interface ServerCardProps {
  variant: 'full' | 'compact';
  data: ServerCard;

  onClickEdit?: () => void;
  onClickStatus?: () => void;
  onClickDetails?: () => void;
  onClickReinstall?: () => void;
  onClickClaimToOrganization?: () => void;
  onClickDelete?: () => void;
}

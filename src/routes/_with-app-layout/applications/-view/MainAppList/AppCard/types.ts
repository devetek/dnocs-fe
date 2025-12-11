import type { ApplicationCard } from '@/entities/application/rules/schema';

export interface AppCardProps {
  variant: 'full' | 'compact';
  data: ApplicationCard;

  onClickEdit?: () => void;
  onClickDetails?: () => void;
  onClickClaimToOrganization?: () => void;
  onClickDelete?: () => void;
}

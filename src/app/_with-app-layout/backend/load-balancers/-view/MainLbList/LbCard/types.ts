import type { LoadBalancerCard } from '@/entities/load-balancer/rules/schema';

export interface LbCardProps {
  variant: 'full' | 'compact';
  data: LoadBalancerCard;

  onClickEdit?: () => void;
  onClickDetails?: () => void;
  onClickMigrateOwnership?: () => void;
  onClickDelete?: () => void;
  onClickRestore?: () => void;
}

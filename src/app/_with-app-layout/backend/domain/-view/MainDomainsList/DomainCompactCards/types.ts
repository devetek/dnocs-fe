import type { DomainCard } from '@/entities/domain/rules/schema';

import type { Action } from '@/widgets/resource-card/rules/types/shared';

export interface DomainCompactCardsProps {
  list: DomainCard[];
}

export interface CardProps {
  data: DomainCard;
  actions: Array<false | Action>;
}

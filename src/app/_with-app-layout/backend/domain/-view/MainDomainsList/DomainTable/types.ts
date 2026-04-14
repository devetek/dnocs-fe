import type { DomainCard } from '@/entities/domain/rules/schema';

export interface DomainTableProps {
  data: DomainTableData[];
}

export type DomainTableData = DomainCard;

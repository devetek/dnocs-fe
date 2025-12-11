import type { SchemaOsServiceParts } from '@/entities/os-service/rules/schema';

export interface ServiceStateBadgeProps {
  className?: string;
  serviceState: SchemaOsServiceParts.State;
  colorless?: boolean;
}

export interface ServiceStateLabelProps {
  as?: 'div' | 'p' | 'span' | `h${1 | 2 | 3 | 4 | 5 | 6}`;
  className?: string;
  serviceState: SchemaOsServiceParts.State;
  colorless?: boolean;
}

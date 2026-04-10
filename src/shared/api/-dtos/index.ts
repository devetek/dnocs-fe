export * from './organization';
export * from './application';
export * from './database';
export * from './domain';
export * from './artifact';
export * from './deploy';
export * from './machine';
export * from './service';
export * from './folder';
export * from './git';
export * from './pricepackage';
export * from './pricename';
export * from './pricepackageitem';
export * from './pricepackageconsumer';
export * from './load-balancer';
export * from './router';
export * from './user';
export * from './cloud';
export * from './secret';

export interface Pagination {
  page: number;
  size: number;
  total_item: number;
  total_page: number;
}

export type PayloadUpdateOwnership =
  | { into: 'personal' } //
  | { into: 'team'; teamId: string };

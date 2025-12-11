import type { OrganizationV1 } from './organization';
import type { PricePackageV1 } from './pricepackage';
import type { User } from './user';

// enum payment status
export enum PaymentStatus {
  Pending = 'pending',
  Progress = 'progress',
  Canceled = 'cancelled',
  Paid = 'paid',
  Failed = 'failed',
  Expired = 'expired',
  Refunded = 'refunded',
}

export interface PricePackageConsumerV1 {
  id: string;
  price_package: PricePackageV1;
  user_id: string;
  user: User;
  organization_id?: string;
  organization?: OrganizationV1;
  payment_data?: Record<string, string>;
  payment_provider?: string;
  payment_status?: string;
  payment_token?: Record<string, string>;
  subscribe_at?: string;
  expired_at?: string;
  created_at: string;
  updated_at: string;
}

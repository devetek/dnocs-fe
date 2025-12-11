import type { PriceNameV1 } from './pricename';
import type { PricePackageV1 } from './pricepackage';

export interface PricePackageItemV1 {
  id: string;
  limit: number;
  price_name_id: string;
  price_name: PriceNameV1;
  price_package_id: string;
  price_package: PricePackageV1;
  created_at: string;
  updated_at: string;
}

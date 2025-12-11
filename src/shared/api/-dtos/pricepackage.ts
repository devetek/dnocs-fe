export interface PricePackageV1 {
  id?: string;
  name?: string;
  price?: number;
  period?: number;
  currency?: string;
  is_public: boolean;
  created_at?: string;
  updated_at?: string;
}

import type { OrganizationV1 } from './organization';
import type { User } from './user';

export interface DomainV1 {
  id?: number;
  provider?: string;
  name?: string;
  domain?: string;
  is_public?: boolean;
  origin_dns_id?: string;
  credential?: Record<string, any>;
  created_at?: Date;
  updated_at?: Date;
  installer_status?: string;
  error?: string;
  organization?: OrganizationV1;
  user?: User;
}

export interface CloudFlarePagination {
  page: number;
  per_page: number;
  count: number;
  total_count: number;
  total_pages: number;
}

export interface CloudFlareMetaItem {
  auto_added: boolean;
  managed_by_apps: boolean;
  managed_by_argo_tunnel: boolean;
}

export interface CloudFlareItem {
  comment?: string;
  name?: string;
  proxied?: boolean;
  settings?: {};
  tags?: any[];
  ttl?: number;
  content?: string;
  type?: string;
  comment_modified_on?: string;
  created_on?: string;
  id?: string;
  meta?: CloudFlareMetaItem;
  modified_on?: string;
  proxiable?: boolean;
  tags_modified_on?: string;
}

export interface CloudFlareListResponse {
  result: CloudFlareItem[];
  success: boolean;
  errors: any[];
  messages: any[];
  result_info: CloudFlarePagination;
}

export interface CloudFlareDetailResponse {
  result: CloudFlareItem;
  success: boolean;
  errors: CloudFlareErrorResponse[];
  messages: any[];
}

export interface CloudFlareErrorResponse {
  code: number;
  message: string;
}

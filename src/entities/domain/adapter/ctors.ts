import type { DTOs } from '@/shared/api';

import type { DnsRecord, ProviderDetails } from '../rules/schema/parts';
import { ProviderIdent } from '../rules/schema/parts';

export function ctorProvider({ provider }: DTOs.DomainV1) {
  switch (provider) {
    case 'CloudFlare':
      return ProviderIdent.cloudflare;

    case 'DigitalOcean':
      return ProviderIdent.digitalOcean;

    default:
      return ProviderIdent.unknown;
  }
}

export function ctorProviderDetails(raw: DTOs.DomainV1): ProviderDetails {
  switch (raw.provider) {
    case 'CloudFlare':
      return {
        ident: ProviderIdent.cloudflare,
        params: {
          apiToken: '***',
          zoneId: '***',
        },
      };

    case 'DigitalOcean':
      return {
        ident: ProviderIdent.digitalOcean,
        params: {
          apiToken: '***',
          zoneId: '***',
        },
      };

    default:
      return {
        ident: ProviderIdent.unknown,
        rawParams: '{}',
      };
  }
}

export function ctorDnsRecord(raw: DTOs.CloudFlareItem): Partial<DnsRecord> {
  return {
    id: raw.id,
    type: raw.type,
    content: raw.content,
    name: raw.name,
    ttl: raw.ttl,
    comment: raw.comment,
  };
}

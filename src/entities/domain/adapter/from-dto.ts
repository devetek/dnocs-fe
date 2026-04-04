import type { z } from 'zod';

import { createAdapter } from '@/entities/shared/lib/createAdapter';

import type { DTOs } from '@/shared/api';
import type { KeysOnlyDeep } from '@/shared/libs/types/keys-only';

import { schemaDomainCard, schemaDomainDetails } from '../rules/schema';
import type { DomainCard, DomainDetails } from '../rules/schema';

import { ctorDnsRecord, ctorProvider, ctorProviderDetails } from './ctors';

export const toDomainCard = createAdapter<DTOs.DomainV1, DomainCard>((raw) => {
  return schemaDomainCard.parse({
    id: String(raw.id),
    ownership: {
      owner: raw.user?.fullname || raw.user?.username || raw.user?.email,
      team: raw.organization?.name,
    },
    timestamp: {
      created: raw.created_at,
      updated: raw.updated_at,
    },
    domain: raw.domain,
    description: raw.name,
    provider: ctorProvider(raw),
  } as KeysOnlyDeep<z.input<typeof schemaDomainCard>>);
});

export const toDomainDetails = createAdapter<
  [DTOs.DomainV1, DTOs.CloudFlareListResponse],
  DomainDetails
>(([rawDomain, rawRecords]) => {
  return schemaDomainDetails.parse({
    id: String(rawDomain.id),
    ownership: {
      owner:
        rawDomain.user?.fullname ||
        rawDomain.user?.username ||
        rawDomain.user?.email,
      team: rawDomain.organization?.name,
    },
    timestamp: {
      created: rawDomain.created_at,
      updated: rawDomain.updated_at,
    },
    domain: rawDomain.domain,
    description: rawDomain.name,
    providerDetails: ctorProviderDetails(rawDomain),
    dnsRecords: rawRecords.result.map(ctorDnsRecord),
  } as KeysOnlyDeep<z.input<typeof schemaDomainDetails>>);
});

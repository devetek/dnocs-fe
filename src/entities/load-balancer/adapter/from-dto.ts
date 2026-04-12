import type { z } from 'zod';

import { createAdapter } from '@/entities/shared/lib/createAdapter';

import type { DTOs } from '@/shared/api';
import type { KeysOnlyDeep } from '@/shared/libs/types/keys-only';

import {
  schemaLoadBalancerCard,
  schemaLoadBalancerDetails,
} from '../rules/schema';
import type { LoadBalancerCard, LoadBalancerDetails } from '../rules/schema';

import {
  ctorConfiguration,
  ctorFeatures,
  ctorGateway,
  ctorState,
  ctorWebserver,
} from './ctors';

export const toLoadBalancerCard = createAdapter<
  DTOs.RouterV1,
  LoadBalancerCard
>((raw) => {
  return schemaLoadBalancerCard.parse({
    id: String(raw.id),
    state: ctorState(raw),
    domain: raw.domain,
    description: raw.name,
    ownership: {
      owner: raw.user?.fullname || raw.user?.username,
      team: raw.organization?.name,
    },
    timestamp: {
      created: raw.created_at,
      updated: raw.updated_at,
    },
    gateway: ctorGateway(raw),
    webserver: ctorWebserver(raw),
    features: ctorFeatures(raw),
    configuration: ctorConfiguration(raw),
  } as KeysOnlyDeep<z.input<typeof schemaLoadBalancerCard>>);
});

export const toLoadBalancerDetails = createAdapter<
  DTOs.RouterV1,
  LoadBalancerDetails
>((raw) => {
  return schemaLoadBalancerDetails.parse({
    id: String(raw.id),
    state: ctorState(raw),
    domain: raw.domain,
    ownership: {
      owner: raw.user?.fullname || raw.user?.username,
      team: raw.organization?.name,
    },
    timestamp: {
      created: raw.created_at,
      updated: raw.updated_at,
    },
    gateway: ctorGateway(raw),
    webserver: ctorWebserver(raw),
    features: ctorFeatures(raw),
    configuration: ctorConfiguration(raw),
  } as KeysOnlyDeep<z.input<typeof schemaLoadBalancerDetails>>);
});

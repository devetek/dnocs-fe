import { z } from 'zod';

import { SchemaCommon } from '@/entities/shared/rules/schema';

import {
  configuration,
  domain,
  feature,
  gateway,
  state,
  webserver,
} from './parts';

export * as SchemaLoadBalancerParts from './parts';

export type LoadBalancerEssentials = z.output<
  typeof schemaLoadBalancerEssentials
>;
export const schemaLoadBalancerEssentials = z.object({
  id: SchemaCommon.unitId,
  ownership: SchemaCommon.ownership,
  timestamp: SchemaCommon.timestamp,
  domain,
});

export type LoadBalancerCard = z.output<typeof schemaLoadBalancerCard>;
export const schemaLoadBalancerCard = z.intersection(
  schemaLoadBalancerEssentials,
  z.object({
    description: z.string().optional(),
    features: z.set(feature),
    state,
    configuration,
    gateway: gateway.optional(),
    webserver,
  }),
);

export type LoadBalancerDetails = z.output<typeof schemaLoadBalancerDetails>;
export const schemaLoadBalancerDetails = z.intersection(
  schemaLoadBalancerEssentials,
  z.object({
    description: z.string().optional(),
    features: z.set(feature),
    state,
    configuration,
    gateway: gateway.optional(),
    webserver,
  }),
);

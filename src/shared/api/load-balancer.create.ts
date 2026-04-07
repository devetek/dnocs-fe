import type { DoRequestRecipe } from '@/shared/libs/api-client/rules/types';

import { apiDoPost } from '../libs/api-client';

// =============================================================================
//   Recipe
// =============================================================================

export interface RecipeUpstream {
  address: string;
  port: string;
}

export interface RecipeInternalDomainMetadata {
  cloudflare?: {
    proxied?: boolean;
  };
  id: string;
  subdomain: string;
}

export interface RecipeRule {
  pathMatch: string;
  type: string;
  wildcard?: boolean;
  upstreams?: RecipeUpstream[];
  applicationId?: string;
}

export interface RecipeParams {
  name: string;
  domain: string;
  internalDomainMetadata?: RecipeInternalDomainMetadata;
  engine: string;
  defaultUpstream: string;
  serverId: string;
  lbKind: string;
  protocol: string;
  sslEnabled: boolean;
  rules?: RecipeRule[];
  port?: string;
}

export function recipe(params: RecipeParams): DoRequestRecipe {
  const {
    name,
    domain,
    engine,
    defaultUpstream,
    serverId,
    internalDomainMetadata,
    lbKind,
    protocol,
    sslEnabled,
    rules,
  } = params;

  return {
    method: 'POST',
    url: `/v2/load-balancer/create`,
    data: {
      name,
      domain,
      engine,
      type: 'proxy_pass',
      upstream: defaultUpstream,
      machine_id: serverId,
      advance_mode: true,
      config: {
        dommain: {
          cloudflare: internalDomainMetadata?.cloudflare
            ? {
                proxied: internalDomainMetadata.cloudflare.proxied,
              }
            : undefined,
          id: internalDomainMetadata?.id,
          subdomain: internalDomainMetadata?.subdomain,
        },
        lb_kind: lbKind,
        protocol,
        ssl_enabled: sslEnabled,
      },
      rules: rules?.map((rule) => ({
        path_match: rule.pathMatch,
        type: rule.type,
        wildcard: rule.wildcard,
        target: {
          application_id: rule.applicationId,
          upstreams: rule.upstreams,
        },
      })),
    },
  };
}

// =============================================================================
//   Method
// =============================================================================

export interface Dto {
  id: string;
}

export function doPost(params: RecipeParams) {
  return apiDoPost<Dto>({
    ...recipe(params),
  });
}

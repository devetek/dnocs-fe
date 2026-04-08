import { CircleQuestionMarkIcon } from 'lucide-react';

import {
  IconBrandCaddy,
  IconBrandEnvoy,
  IconBrandHAProxy,
  IconBrandNginx,
  IconBrandTraefik,
} from '@/shared/presentation/icons';

import type { SchemaLoadBalancerParts } from '../../rules/schema';
import type { LoadBalancerWebserver } from '../../rules/types';

export const LOAD_BALANCER_WEBSERVER_ENGINE: Record<
  SchemaLoadBalancerParts.Webserver['engine'],
  LoadBalancerWebserver
> = {
  caddy: {
    icon: IconBrandCaddy,
    i18n: {
      brandName: 'common.brands.caddy',
    },
  },
  nginx: {
    icon: IconBrandNginx,
    i18n: {
      brandName: 'common.brands.nginx',
    },
  },
  traefik: {
    icon: IconBrandTraefik,
    i18n: {
      brandName: 'common.brands.traefik',
    },
  },
  haproxy: {
    icon: IconBrandHAProxy,
    i18n: {
      brandName: 'common.brands.haproxy',
    },
  },
  envoy: {
    icon: IconBrandEnvoy,
    i18n: {
      brandName: 'common.brands.envoy',
    },
  },
  unknown: {
    icon: CircleQuestionMarkIcon,
    i18n: {
      brandName: 'common.terms.unknown',
    },
  },
};

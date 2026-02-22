import { CircleQuestionMarkIcon } from 'lucide-react';

import ICO_CADDY from '@/shared/assets/ico-caddy.svg';

import type { SchemaLoadBalancerParts } from '../../rules/schema';
import type { LoadBalancerWebserver } from '../../rules/types';

export const LOAD_BALANCER_WEBSERVER_ENGINE: Record<
  SchemaLoadBalancerParts.Webserver['engine'],
  LoadBalancerWebserver
> = {
  caddy: {
    icon: ICO_CADDY,
    i18n: {
      brandName: 'common.brands.caddy',
    },
  },
  unknown: {
    icon: CircleQuestionMarkIcon,
    i18n: {
      brandName: 'common.terms.unknown',
    },
  },
};

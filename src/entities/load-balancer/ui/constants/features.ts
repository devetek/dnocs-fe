import ICO_BROTLI from '@/shared/assets/ico-brotli.svg';
import ICO_HTTP_2 from '@/shared/assets/ico-http-2.svg';
import ICO_HTTP from '@/shared/assets/ico-http.svg';
import ICO_LOCK_GREEN from '@/shared/assets/ico-lock-green.png';
import ICO_QUIC from '@/shared/assets/ico-quic.png';

import type { Feature } from '../../rules/schema/parts';
import type { LoadBalancerFeature } from '../../rules/types';

export const LOAD_BALANCER_FEATURES: Record<Feature, LoadBalancerFeature> = {
  http: {
    i18n: {
      label: 'common.brands.http',
    },
    logoSrc: ICO_HTTP,
  },
  'http/2': {
    i18n: {
      label: 'common.brands.http2',
    },
    logoSrc: ICO_HTTP_2,
  },
  quic: {
    i18n: {
      label: 'common.brands.quic',
    },
    logoSrc: ICO_QUIC,
  },
  'ssl/tls': {
    i18n: {
      label: 'common.brands.ssltls',
    },
    logoSrc: ICO_LOCK_GREEN,
  },
  brotli: {
    i18n: {
      label: 'common.brands.brotli',
    },
    logoSrc: ICO_BROTLI,
  },
};

import IconLaravel from '@/shared/assets/ico-laravel.svg';
import IconWordpress from '@/shared/assets/ico-wordpress.svg';

import type { AppBundle } from '../model/types';

export const PREDEFINED_BUNDLES: AppBundle[] = [
  {
    id: 'wordpress',
    name: 'Wordpress',
    description: 'Popular CMS for blogs and websites.',
    iconURL: IconWordpress,
  },
  {
    id: 'laravel',
    name: 'Laravel',
    description: 'PHP framework for web applications.',
    iconURL: IconLaravel,
  },
];
